import {
  Button,
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
import {ERROR, IDLE, IDLE_DELAY, PROCESSING, SUCCESS, ZERO_ADDRESS} from "../../constants/misc";
import {useNestOpenPlatformContract, useTokenContract} from "../../hooks/useContract";
import {NEST_OPEN_PLATFORM_ADDRESS} from "../../constants/addresses";
import {formatNumber, parseToBigNumber} from "../../utils/bignumberUtil";
import {useTokenSymbol} from "../../hooks/Tokens";
import {formatWithUnit, parseToNumber} from "../../utils/unit";
import {useETHBalance} from "../../hooks/useETHBalance";
import {CHAIN_INFO} from "../../constants/chains";

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
        <WithdrawPopover isLoading={status === PROCESSING} disabled={info?.governance !== account}
                         tokenAddress={info?.reward}/>
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
  const token = useTokenContract(props.tokenAddress)
  const {account} = useActiveWeb3React()
  const [balance, setBalance] = useState('0')
  const [amount, setAmount] = useState('0')
  const tokenSymbol = useTokenSymbol(props.tokenAddress ?? "")
  const [depositStatus, setDepositStatus] = useState(IDLE)
  const [approveStatus, setApproveStatus] = useState(IDLE)
  const {fetch: fetchChannelInfo} = useChannelInfo(activeChannelId)

  const fetch = async () => {
    if (!token) return
    try {
      const res = await token.balanceOf(account ?? ZERO_ADDRESS)
      setBalance(formatNumber(parseToBigNumber(res).shiftedBy(-18)))
    }catch (e){
      setBalance('NaN')
    }
  }

  const handleDeposit = async () => {
    if (!nestOpenPlatform) return
    setDepositStatus(PROCESSING)
    try {
      //  function increase(uint channelId, uint96 vault) external payable;
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
          await fetchChannelInfo()
          setTimeout(() => {
            setDepositStatus(IDLE)
          }, IDLE_DELAY)
          break
      }
    } catch (e) {
      setDepositStatus(ERROR)
      setTimeout(() => {
        setDepositStatus(IDLE)
      }, IDLE_DELAY)
    }
  }

  const handleApprove = async () => {
    if (!token) return
    try {
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
    } catch (e) {
      setApproveStatus(ERROR)
      setTimeout(() => {
        setApproveStatus(IDLE)
      }, IDLE_DELAY)
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
              Balance (myself): {balance} {tokenSymbol}
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
  const {chainId, account} = useActiveWeb3React()
  const activeChannelId = useRecoilValue(activeChannelIdAtom)
  const nestOpenPlatform = useNestOpenPlatformContract(NEST_OPEN_PLATFORM_ADDRESS[chainId ?? 1], true)
  const [amount, setAmount] = useState('0')
  const token = useTokenContract(props.tokenAddress)
  const [balance, setBalance] = useState('0')
  const tokenSymbol = useTokenSymbol(props.tokenAddress ?? "")
  const [withdrawStatus, setWithdrawStatus] = useState(IDLE)
  const {info, fetch: fetchChannelInfo} = useChannelInfo(activeChannelId)

  const fetch = async () => {
    if (!token) return
    try {
      const res = await token.balanceOf(account ?? ZERO_ADDRESS)
      setBalance(formatNumber(parseToBigNumber(res).shiftedBy(-18)))
    }catch (e){
      setBalance('NaN')
    }
  }

  useEffect(()=>{
    fetch()
  }, [token, account, chainId])
  setImmediate(fetch, 3000)

  const handleWithdraw = async () => {
    if (!nestOpenPlatform) return
    setWithdrawStatus(PROCESSING)
    // try {
      const tx = await nestOpenPlatform.decrease(activeChannelId, parseToBigNumber(amount).shiftedBy(18).toFixed(0))
      console.log(tx)
      const res = await tx.wait()
      console.log(res)
      switch (res.status) {
        case 0:
          setWithdrawStatus(ERROR)
          setTimeout(()=>{
            setWithdrawStatus(IDLE)
          }, IDLE_DELAY)
          break
        case 1:
          setWithdrawStatus(SUCCESS)
          await fetchChannelInfo()
          setTimeout(()=>{
            setWithdrawStatus(IDLE)
          }, IDLE_DELAY)
          break
      }
    // } catch (e) {
    //   setWithdrawStatus(ERROR)
    //   setTimeout(()=>{
    //     setWithdrawStatus(IDLE)
    //   }, IDLE_DELAY)
    // }
  }

  return (
    <Popover>
      <PopoverTrigger>
        <Button variant={'outline'} disabled={props.disabled} isLoading={props.isLoading}>Withdraw</Button>
      </PopoverTrigger>
      <PopoverContent borderRadius={'20px'} border={'none'}>
        <PopoverBody boxShadow={'0px 0px 60px 0px #BFBFBF'} borderRadius={'20px'}>
          <Stack alignItems={'center'} spacing={'20px'} p={'20px'}>
            <Text fontWeight={'bold'}>Withdraw</Text>
            <NumberInput
              variant={'filled'}
              onChange={(valueString) => {
                setAmount(parseToNumber(valueString, tokenSymbol))
              }}
              value={formatWithUnit(amount, tokenSymbol)}
              max={Number(info?.vault)}
              min={0}
              onFocus={(e) => {
                e.target.setSelectionRange(0, amount.length)
              }}
            >
              <NumberInputField/>
            </NumberInput>
            <Text fontWeight={'bold'} fontSize={'sm'} color={'secondary'} textAlign={"center"}>
              Balance (myself): {balance} {tokenSymbol}
            </Text>
            <Button variant={'outline'} isFullWidth onClick={handleWithdraw} loadingText={"Withdrawing"}
                    disabled={amount === '0'}
                    isLoading={withdrawStatus === PROCESSING}>
              Withdraw
            </Button>
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

const WithdrawFeePopover: FC<PopverProps> = ({...props}) => {
  const {chainId, account} = useActiveWeb3React()
  const activeChannelId = useRecoilValue(activeChannelIdAtom)
  const nestOpenPlatform = useNestOpenPlatformContract(NEST_OPEN_PLATFORM_ADDRESS[chainId ?? 1], true)
  const {info, fetch: fetchChannelInfo} = useChannelInfo(activeChannelId)
  const [amount, setAmount] = useState('0')
  const {balance} = useETHBalance(account)
  const [withdrawFeeStatus, setWithdrawFeeStatus] = useState(IDLE)

  const handleWithdrawFee = async () => {
    if (!nestOpenPlatform) return
    setWithdrawFeeStatus(PROCESSING)
    try {
      const tx = await nestOpenPlatform.pay(activeChannelId, 0, account, parseToBigNumber(amount).shiftedBy(18).toFixed(0))
      const res = await tx.wait()
      switch (res.status) {
        case 0:
          setWithdrawFeeStatus(ERROR)
          setTimeout(()=>{
            setWithdrawFeeStatus(IDLE)
          }, IDLE_DELAY)
          break
        case 1:
          setWithdrawFeeStatus(SUCCESS)
          await fetchChannelInfo()
          setTimeout(()=>{
            setWithdrawFeeStatus(IDLE)
          }, IDLE_DELAY)
          break
      }
    }catch (e){
      setWithdrawFeeStatus(ERROR)
      setTimeout(()=>{
        setWithdrawFeeStatus(IDLE)
      }, IDLE_DELAY)
    }
  }

  return (
    <Popover>
      <PopoverTrigger>
        <Button variant={'outline'} disabled={props.disabled} isLoading={props.isLoading}>Withdraw Fee</Button>
      </PopoverTrigger>
      <PopoverContent borderRadius={'20px'} border={'none'}>
        <PopoverBody boxShadow={'0px 0px 60px 0px #BFBFBF'} borderRadius={'20px'}>
          <Stack alignItems={'center'} spacing={'20px'} p={'20px'}>
            <Text fontWeight={'bold'}>Withdraw Fee</Text>
            <NumberInput
              variant={'filled'}
              onChange={(valueString) => {
                setAmount(parseToNumber(valueString, CHAIN_INFO[chainId ?? 1].nativeSymbol))
              }}
              value={formatWithUnit(amount, CHAIN_INFO[chainId ?? 1].nativeSymbol)}
              max={Number(info?.feeInfo)}
              min={0}
              onFocus={(e) => {
                e.target.setSelectionRange(0, amount.length)
              }}
            >
              <NumberInputField/>
            </NumberInput>
            <Text fontWeight={'bold'} fontSize={'sm'} color={'secondary'}>
              Balance (myself): {balance} {CHAIN_INFO[chainId ?? 1].nativeSymbol}
            </Text>
            <Button variant={'outline'} isFullWidth onClick={handleWithdrawFee} isLoading={withdrawFeeStatus === PROCESSING}
                    loadingText={"Withdrawing"} disabled={amount === '0'}>
              Withdraw
            </Button>
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default Administrator
