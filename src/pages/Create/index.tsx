import {
  Button, Divider,
  FormControl,
  HStack,
  Input,
  InputGroup,
  InputRightElement, Link,
  Stack,
  Text,
  useMediaQuery
} from '@chakra-ui/react'
import {useCreateChannel} from '../../hooks/useCreateChannel'
import InputWithTokenName, {TokenName} from "../../components/InputWithTokenName";
import {isAddress, shortenAddress} from "../../utils";
import {FC, useState} from "react";
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import {ExplorerDataType, getExplorerLink} from "../../utils/getExplorerLink";
import {CHAIN_INFO} from "../../constants/chains";
import {PUSD_ADDRESS} from "../../constants/addresses";

const OpenChanel = () => {
  const [quotationTokenList, setQuotationTokenList] = useState<string[]>([])
  const [miningTokenAddress, setMiningTokenAddress] = useState<string>('')
  const [standardOutput, setStandardOutput] = useState('0')
  const {create, status} = useCreateChannel()
  const [isLargerThan1024] = useMediaQuery('(min-width: 1024px)')
  const { chainId } = useActiveWeb3React()

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
          <Text fontWeight={'600'} fontSize={isLargerThan1024 ? 'lg' : 'xs'} color={'secondary.500'} pl={quotationTokenList.length > 0 ? (isLargerThan1024 ? '116px' : '30px') : 4}>
            Quotation Token:
          </Text>
          {quotationTokenList.map((address: string) => (
            <InputWithTokenName key={address} address={address} isReadOnly={true} tokenList={quotationTokenList} setTokenList={setQuotationTokenList}/>
          ))}
          <Stack alignItems={"center"}>
            <InputWithTokenName tokenList={quotationTokenList} setTokenList={setQuotationTokenList}/>
          </Stack>
        </Stack>


        <Stack spacing={isLargerThan1024 ? '16px' : '10px'} w={isLargerThan1024 ? 600 : 'full'}>
          <Text fontWeight={'600'} fontSize={isLargerThan1024 ? 'lg' : 'xs'} color={'secondary.500'} pl={4}>
            Quotation Pair:
          </Text>
          <Stack direction={'row'} spacing={0} w={'full'} justifyContent={"center"}>
            {quotationTokenList.map((address: string) => (
              <HStack>
                <Text fontWeight={'bold'} fontSize={'lg'}>2000 PUSD = x </Text>
                <TokenName address={address} fontSize={'lg'} color={'black'}/>
              </HStack>
            ))}
          </Stack>
        </Stack>

        <Stack spacing={isLargerThan1024 ? '16px' : '10px'} w={isLargerThan1024 ? 600 : 'full'}>
          <Text fontWeight={'600'} fontSize={isLargerThan1024 ? 'lg' : 'xs'} color={'secondary.500'} pl={4}>
            Mining Token:
          </Text>
          <Stack direction={'row'} spacing={0}>
            <FormControl>
              <InputGroup>
                <Input
                  variant={'filled'}
                  pr={'80px'}
                  minH={isLargerThan1024 ? '40px' : '44px'}
                  fontSize={miningTokenAddress === '' ? 'md' : 'lg'}
                  isInvalid={miningTokenAddress !== '' && !isAddress(miningTokenAddress)}
                  errorBorderColor={'primary.500'}
                  placeholder={'Input Token Address'}
                  onChange={(event) => setMiningTokenAddress(event.target.value)}
                  defaultValue={miningTokenAddress}
                  onFocus={(e) => {
                    e.target.setSelectionRange(0, miningTokenAddress.length)
                  }}
                />
                <InputRightElement pr={'36px'} h={'full'} children={<TokenName address={miningTokenAddress} />} />
              </InputGroup>
            </FormControl>
          </Stack>
        </Stack>

        <Stack id="quotation token address" spacing={isLargerThan1024 ? '16px' : '10px'} w={isLargerThan1024 ? 600 : 'full'}>
          <Text fontWeight={'600'} fontSize={isLargerThan1024 ? 'lg' : 'xs'} color={'secondary.500'} pl={4}>
            Mining Standard Output:
          </Text>
          <FormControl>
            <InputGroup>
              <Input
                variant={'filled'}
                minH={isLargerThan1024 ? '40px' : '44px'}
                fontSize={standardOutput === '' ? 'md' : 'lg'}
                errorBorderColor={'primary.500'}
                placeholder={'Input Output Quantity'}
                onChange={(event) => setStandardOutput(event.target.value)}
                defaultValue={standardOutput}
                onFocus={(e) => {
                  e.target.setSelectionRange(0, miningTokenAddress.length)
                }}
              />
              <InputRightElement h={'full'} w={'120px'} justifyContent={"end"} pr={'16px'} children={<Text fontWeight={'bold'} fontSize={'lg'}>NEST/Block</Text>} />
            </InputGroup>
          </FormControl>
        </Stack>

        <Stack py={'16px'}>
          <Button w={'180px'}>
            Confirm
          </Button>
        </Stack>

        <HStack pt={'22px'}>
          <Text fontWeight={'semibold'} fontSize={'lg'}>Summary of parameter list</Text>
        </HStack>

        <Stack pt={isLargerThan1024 ? '60px' : '30px'} pb={'30px'} w={isLargerThan1024 ? '600px' : 'full'} spacing={isLargerThan1024 ? '20px' : '10px'}>
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
  value?: string
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
      <Stack direction={'row'} w={'full'} justifyContent={'space-between'} fontSize={'lg'}>
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

        {props.value && (
          <Text fontWeight={'bold'} color={props.value === 'NaN' || props.invalid ? 'primary.500' : 'black'}>
            {props.value} {props.unit}
          </Text>
        )}

      </Stack>
      { !isLargerThan1024 && (
        <Divider orientation={"horizontal"} />
      ) }
    </>
  )
}

export default OpenChanel
