import {
  Button,
  Input,
  NumberInput, NumberInputField,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text
} from '@chakra-ui/react'
import {useRecoilValue} from "recoil";
import {activeChannelIdAtom} from "../../state/Root";
import useChannelInfo from "../../hooks/useChannelInfo";
import {useActiveWeb3React} from "../../hooks/web3";
import {FC, useEffect, useState} from "react";
import {ERROR, IDLE, IDLE_DELAY, PROCESSING, SUCCESS} from "../../constants/misc";
import {useNestOpenPlatformContract, useTokenContract} from "../../hooks/useContract";
import {NEST_OPEN_PLATFORM_ADDRESS} from "../../constants/addresses";
import {formatNumber, parseToBigNumber} from "../../utils/bignumberUtil";
import {useTokenSymbol} from "../../hooks/Tokens";
import {formatWithUnit, parseToNumber} from "../../utils/unit";

const Administrator = () => {
  const activeChannelId = useRecoilValue(activeChannelIdAtom)
  const {info, status} = useChannelInfo(activeChannelId)
  const {account} = useActiveWeb3React()

  return (
    <Stack bg={'white'} w={'full'} borderRadius={'20px'} px={'20px'} py={'8px'} alignItems={'center'} direction={'row'}>
      <Text fontWeight={'bold'} mr={'88px'}>
        Administrator
      </Text>
      <Stack direction={'row'} spacing={'44px'}>
        <DepositPopover isLoading={status === PROCESSING} disabled={info?.governance !== account}
                        tokenAddress={info?.reward}/>
        <WithdrawPopover isLoading={status === PROCESSING} disabled={info?.governance !== account}/>
        <WithdrawFeePopover isLoading={status === PROCESSING} disabled={info?.governance !== account}/>
      </Stack>
    </Stack>
  )
}

type PopverProps = {
  disabled: boolean
  isLoading: boolean
  tokenAddress?: string
}

const DepositPopover: FC<PopverProps> = ({...props}) => {
  const {chainId} = useActiveWeb3React()
  const activeChannelId = useRecoilValue(activeChannelIdAtom)
  const nestOpenPlatform = useNestOpenPlatformContract(NEST_OPEN_PLATFORM_ADDRESS[chainId ?? 1], true)
  //  function increase(uint channelId, uint96 vault) external payable;
  const token = useTokenContract(props.tokenAddress)
  const {account} = useActiveWeb3React()
  const [balance, setBalance] = useState('0')
  const [amount, setAmount] = useState('0')
  const tokenSymbol = useTokenSymbol(props.tokenAddress ?? "")
  const [depositStatus, setDepositStatus] = useState(IDLE)
  const [approveStatus, setApproveStatus] = useState(IDLE)

  const fetch = async () => {
    if (!token) return
    const res = await token.balanceOf(account ?? "")
    setBalance(parseToBigNumber(res).shiftedBy(-18).toFixed(0))
  }

  const handleDeposit = async () => {
    if (!nestOpenPlatform) return
    setDepositStatus(PROCESSING)
    const tx = await nestOpenPlatform.increase(activeChannelId, parseToBigNumber(amount).shiftedBy(18).toFixed(0))
    const res = await tx.wait()
    switch (res.status) {
      case 0:
        setDepositStatus(ERROR)
        setTimeout(() => {
          setDepositStatus(IDLE)
        }, IDLE_DELAY)
        break
      case 1:
        setDepositStatus(SUCCESS)
        setTimeout(() => {
          setDepositStatus(IDLE)
        }, IDLE_DELAY)
        break
    }
  }

  const handleApprove = async () => {
    if (!token) return
    const tx = await token.approve(NEST_OPEN_PLATFORM_ADDRESS[chainId ?? 1], parseToBigNumber(amount).shiftedBy(18).toFixed(0))
    const res = await tx.wait()
    switch (res.status) {
      case 0:
        setApproveStatus(ERROR)
        setTimeout(() => {
          setApproveStatus(IDLE)
        }, IDLE_DELAY)
        break
      case 1:
        setApproveStatus(SUCCESS)
        setTimeout(() => {
          setApproveStatus(IDLE)
        }, IDLE_DELAY)
        break
    }
  }

  useEffect(() => {
    fetch()
  }, [chainId, account, props.tokenAddress])
  setImmediate(fetch, 3000)

  return (
    <Popover>
      <PopoverTrigger>
        <Button variant={'outline'} disabled={props.disabled} isLoading={props.isLoading}>Deposit</Button>
      </PopoverTrigger>
      <PopoverContent borderRadius={'20px'} border={'none'}>
        <PopoverBody boxShadow={'0px 0px 60px 0px #BFBFBF'} borderRadius={'20px'}>
          <Stack alignItems={'center'} spacing={'20px'} p={'20px'}>
            <Text fontWeight={'bold'}>Deposit</Text>
            <NumberInput
              variant={'filled'}
              onChange={(valueString) => {
                setAmount(parseToNumber(valueString, tokenSymbol))
              }}
              value={formatWithUnit(amount, tokenSymbol)}
              max={Number(balance)}
              min={0}
              onFocus={(e) => {
                e.target.setSelectionRange(0, amount.length)
              }}
            >
              <NumberInputField/>
            </NumberInput>
            <Text fontWeight={'bold'} fontSize={'sm'} color={'secondary'} textAlign={"center"}>
              Balance (myself): {formatNumber(balance)} {tokenSymbol}
            </Text>
            <Button variant={'outline'} isFullWidth onClick={handleApprove} isLoading={approveStatus === PROCESSING}
                    disabled={amount === '0'}
                    loadingText={"Approving"}>
              Approve
            </Button>
            <Button variant={'outline'} isFullWidth onClick={handleDeposit} isLoading={depositStatus === PROCESSING}
                    disabled={amount === '0'}
                    loadingText={"Depositing"}>
              Deposit
            </Button>
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

const WithdrawPopover: FC<PopverProps> = ({...props}) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant={'outline'} disabled={props.disabled} isLoading={props.isLoading}>Withdraw</Button>
      </PopoverTrigger>
      <PopoverContent borderRadius={'20px'} border={'none'}>
        <PopoverBody boxShadow={'0px 0px 60px 0px #BFBFBF'} borderRadius={'20px'}>
          <Stack alignItems={'center'} spacing={'20px'} p={'20px'}>
            <Text fontWeight={'bold'}>Withdraw</Text>
            <Input variant={'filled'} placeholder={'Input Quantity'}/>
            <Text fontWeight={'bold'} fontSize={'sm'} color={'secondary'}>
              Balance (myself): 80
            </Text>
            <Button variant={'outline'} isFullWidth>
              Withdraw
            </Button>
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

const WithdrawFeePopover: FC<PopverProps> = ({...props}) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant={'outline'} disabled={props.disabled} isLoading={props.isLoading}>Withdraw Fee</Button>
      </PopoverTrigger>
      <PopoverContent borderRadius={'20px'} border={'none'}>
        <PopoverBody boxShadow={'0px 0px 60px 0px #BFBFBF'} borderRadius={'20px'}>
          <Stack alignItems={'center'} spacing={'20px'} p={'20px'}>
            <Text fontWeight={'bold'}>Withdraw Fee</Text>
            <Input variant={'filled'} placeholder={'Input Quantity'}/>
            <Text fontWeight={'bold'} fontSize={'sm'} color={'secondary'}>
              Balance (myself): 80
            </Text>
            <Button variant={'outline'} isFullWidth>
              Withdraw
            </Button>
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default Administrator
