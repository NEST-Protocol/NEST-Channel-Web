import {
  Button,
  FormControl,
  HStack,
  Input,
  InputGroup,
  InputRightElement, Link, NumberInput, NumberInputField,
  Stack,
  Text,
  useMediaQuery
} from '@chakra-ui/react'
import InputWithTokenName, {TokenName} from "../../components/InputWithTokenName";
import {isAddress, shortenAddress} from "../../utils";
import {FC, useState} from "react";
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import {ExplorerDataType, getExplorerLink} from "../../utils/getExplorerLink";
import {CHAIN_INFO} from "../../constants/chains";
import {PUSD_ADDRESS} from "../../constants/addresses";
import Divider from "../../components/Divider";
import {ERROR, IDLE, IDLE_DELAY, PROCESSING, SUCCESS} from "../../constants/misc";
import {useNestOpenPlatformContract} from "../../hooks/useContract";
import {parseToBigNumber} from "../../utils/bignumberUtil";
import TokenIcon from "../../components/TokenIcon";

const OpenChanel = () => {
  const [quotationTokenList, setQuotationTokenList] = useState<string[]>([])
  const [miningTokenAddress, setMiningTokenAddress] = useState<string>('')
  const [standardOutput, setStandardOutput] = useState(0)
  const [isLargerThan1024] = useMediaQuery('(min-width: 1024px)')
  const [status, setStatus] = useState(IDLE)
  const nestOpenPlatform = useNestOpenPlatformContract(true)
  const { chainId } = useActiveWeb3React()

  const create = async (quotationTokenList: string[], miningTokenAddress: string, standardOutput: number) => {
    setStatus(PROCESSING)
    const config = {
      // 标准出矿量 uint96
      rewardPerBlock: parseToBigNumber(standardOutput).shiftedBy(18).toFixed(0),
      // postFee uint16
      postFeeUnit: parseToBigNumber(0).shiftedBy(4).toFixed(0),
      // singleFee uint16
      singleFee: parseToBigNumber(0).shiftedBy(4).toFixed(0),
      // 衰减系数 uint16，万分制
      reductionRate: parseToBigNumber(80).shiftedBy(2).toFixed(0),
    }

    const args = {
      // 计价代币地址 address
      token0: PUSD_ADDRESS[chainId ?? 1],
      // 计价单位 uint96
      unit: parseToBigNumber(2000).shiftedBy(18).toFixed(0),
      // 出矿代币地址 address
      reward: miningTokenAddress,
      // 报价代币地址 address
      tokens: quotationTokenList,
    }

    try {
      if (nestOpenPlatform) {
        const tx = await nestOpenPlatform.open(args.token0, args.unit, args.reward, args.tokens, config)
        const res = await tx.wait()
        switch (res.status) {
          case 0:
            setStatus(ERROR)
            setTimeout(() => {
              setStatus(IDLE)
            }, IDLE_DELAY)
            break
          case 1:
            setStatus(SUCCESS)
            setTimeout(() => {
              setStatus(IDLE)
            }, IDLE_DELAY)
            break
        }
      }
    } catch (e) {
      setStatus(ERROR)
      setTimeout(() => {
        setStatus(IDLE)
      }, IDLE_DELAY)
    }
  }

  return (
    <Stack px={'20px'} py={'20px'} spacing={'20px'}>
      <Stack
        bg={'white'}
        py={'60px'}
        borderRadius={'12px'}
        alignItems={'center'}
        spacing={'22px'}
        border={"1px solid"} borderColor={"secondary.300"}
      >
        <Stack id="quotation token address" spacing={isLargerThan1024 ? '16px' : '10px'}>
          <HStack>
            <Text fontWeight={'600'} fontSize={isLargerThan1024 ? 'md' : 'xs'} color={'secondary.500'} pl={quotationTokenList.length > 0 ? (isLargerThan1024 ? '116px' : '30px') : 4}>
              Quotation Token:
            </Text>
          </HStack>

          {quotationTokenList.map((address: string) => (
            <InputWithTokenName key={address} address={address} isReadOnly={true} tokenList={quotationTokenList} setTokenList={setQuotationTokenList}/>
          ))}
          <Stack alignItems={"center"}>
            <InputWithTokenName tokenList={quotationTokenList} setTokenList={setQuotationTokenList}/>
          </Stack>
        </Stack>

        <Stack spacing={isLargerThan1024 ? '16px' : '10px'} w={isLargerThan1024 ? 600 : 'full'}>
          <Text fontWeight={'600'} fontSize={isLargerThan1024 ? 'md' : 'xs'} color={'secondary.500'} pl={4}>
            Quotation Pair:
          </Text>
          <Stack spacing={4} w={'full'} alignItems={"center"}>
            {quotationTokenList.map((address: string) => (
              <HStack key={address} minW={'200px'}>
                <Text fontWeight={'bold'} fontSize={'md'}>2000 PUSD = x </Text>
                <TokenName address={address} fontSize={'md'} color={'black'} fontWeight={'bold'}/>
              </HStack>
            ))}
          </Stack>
        </Stack>

        <Stack spacing={isLargerThan1024 ? '16px' : '10px'} w={isLargerThan1024 ? 600 : 'full'}>
          <Text fontWeight={'600'} fontSize={isLargerThan1024 ? 'md' : 'xs'} color={'secondary.500'} pl={4}>
            Mining Token:
          </Text>
          <Stack direction={'row'} spacing={0}>
            <FormControl>
              <InputGroup>
                <Input
                  variant={'filled'}
                  pr={'80px'}
                  minH={isLargerThan1024 ? '40px' : '44px'}
                  fontWeight={'bold'}
                  fontSize={miningTokenAddress === '' ? 'sm' : 'md'}
                  isInvalid={miningTokenAddress !== '' && !isAddress(miningTokenAddress)}
                  errorBorderColor={'primary.500'}
                  placeholder={'Input Token Address'}
                  onChange={(event) => setMiningTokenAddress(event.target.value)}
                  defaultValue={miningTokenAddress}
                  onFocus={(e) => {
                    e.target.setSelectionRange(0, miningTokenAddress.length)
                  }}
                />
                <InputRightElement pr={'16px'} h={'full'} children={<TokenIcon address={miningTokenAddress} />} />
              </InputGroup>
            </FormControl>
          </Stack>
        </Stack>

        <Stack id="quotation token address" spacing={isLargerThan1024 ? '16px' : '10px'} w={isLargerThan1024 ? 600 : 'full'}>
          <Text fontWeight={'600'} fontSize={isLargerThan1024 ? 'md' : 'xs'} color={'secondary.500'} pl={4}>
            Mining Standard Output:
          </Text>
          <FormControl>
            <NumberInput
              min={0}
              value={standardOutput}
              minH={isLargerThan1024 ? '40px' : '44px'}
              errorBorderColor={'primary.500'}
              variant={"filled"}
            >
              <NumberInputField id='amount' onChange={(e) => setStandardOutput(Number(e.target.value))}/>
              <InputRightElement h={'full'} w={'120px'} justifyContent={"end"} pr={4} children={<Text fontWeight={'bold'} fontSize={'md'}>NEST/Block</Text>} />
            </NumberInput>
          </FormControl>
        </Stack>

        <Stack py={'16px'}>
          <Button
            w={'180px'}
            isLoading={status === PROCESSING}
            disabled={quotationTokenList.length === 0 || miningTokenAddress === ''}
            onClick={() => create(quotationTokenList, miningTokenAddress, standardOutput)}
          >
            { status === IDLE && ('Confirm') }
            { status === SUCCESS && ('Success') }
            { status === ERROR && ('Error') }
          </Button>
        </Stack>

        <HStack pt={'22px'} w={'700px'} spacing={4}>
          <Divider />
          <Text fontWeight={'semibold'} fontSize={'md'} whiteSpace={"nowrap"}>Summary of parameter list</Text>
          <Divider />
        </HStack>

        <Stack pt={isLargerThan1024 ? '60px' : '30px'} pb={'30px'} px={4} w={isLargerThan1024 ? '600px' : 'full'} spacing={isLargerThan1024 ? '20px' : '10px'}>
          <ConfirmDetail
            title={`Quotation Token`}
            tokens={quotationTokenList.length === 0 ? ['NaN'] : quotationTokenList}
            invalid={quotationTokenList.length === 0}
          />
          <ConfirmDetail title={`Price Token`} token={PUSD_ADDRESS[chainId ?? 1]} />
          <ConfirmDetail
            title={`Mining Token`}
            token={miningTokenAddress === '' ? 'NaN' : miningTokenAddress}
            invalid={miningTokenAddress === ''}
          />
          <ConfirmDetail
            title={'Price Token Unit'}
            value={'2000'}
            unit={'PUSD'}
          />
          <ConfirmDetail title={'Mining Standard Output'} value={standardOutput} unit={'NEST/Block'} />
          <ConfirmDetail title={'Quotation Fee'} value={'0'} unit={CHAIN_INFO[chainId ?? 1].nativeSymbol} />
          <ConfirmDetail title={'Price Calling Fee'} value={'0'} unit={CHAIN_INFO[chainId ?? 1].nativeSymbol} />
          <ConfirmDetail
            title={'Attenuation Factor'}
            value={'80'}
            unit={'%'}
          />
        </Stack>
      </Stack>
    </Stack>
  )
}

type ConfirmDetailProps = {
  title: string
  value?: string | number
  token?: string
  tokens?: string[]
  unit?: string
  invalid?: boolean
}

const ConfirmDetail: FC<ConfirmDetailProps> = ({ ...props }) => {
  const { chainId } = useActiveWeb3React()
  const [isLargerThan1024] = useMediaQuery('(min-width: 1024px)')

  return (
    <>
      <Stack direction={'row'} w={'full'} justifyContent={'space-between'} fontSize={'md'}>
        <Text color={'secondary.500'} fontWeight={'semibold'} whiteSpace={"nowrap"}>
          {props.title}:
        </Text>

        {props.token && (
          <Stack direction={'row'} w={isLargerThan1024 ? '240px' : 'full'} justifyContent={'end'}>
            <Link
              href={getExplorerLink(chainId || 1, props.token, ExplorerDataType.TOKEN)}
              isExternal
              color={!isAddress(props.token) || props.invalid ? 'primary.500' : 'link.500'}
              fontWeight={'semibold'}
              textAlign={"end"}
              minW={'100px'}
              whiteSpace={"nowrap"}
            >
              {shortenAddress(props.token, isLargerThan1024 ? 6 : 3)}
            </Link>
          </Stack>
        )}

        {props.tokens && (
          <Stack spacing={isLargerThan1024 ? '20px' : '10px'} w={isLargerThan1024 ? '240px' : 'full'} justifyContent={"end"}>
            {props.tokens.map((address, index) => (
              <Stack key={index} direction={'row'} w={'full'} justifyContent={'end'}>
                <Link
                  href={getExplorerLink(chainId || 1, address, ExplorerDataType.TOKEN)}
                  isExternal
                  color={!isAddress(address) || props.invalid ? 'primary.500' : 'link.500'}
                  fontWeight={'semibold'}
                  minW={'100px'}
                  textAlign={"end"}
                  whiteSpace={"nowrap"}
                >
                  {shortenAddress(address, isLargerThan1024 ? 6 : 3)}
                </Link>
              </Stack>
            ))}
          </Stack>
        )}

        {(props.value || props.value === 0) && (
          <Text fontWeight={'bold'} color={props.value === 'NaN' || props.invalid ? 'primary.500' : 'black'}>
            {props.value} {props.unit}
          </Text>
        )}

      </Stack>
      { !isLargerThan1024 && (
        <Divider />
      ) }
    </>
  )
}

export default OpenChanel
