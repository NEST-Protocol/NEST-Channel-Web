import {
  Button,
  NumberInput,
  NumberInputField,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useRecoilValue } from 'recoil'
import { activeChannelIdAtom } from '../../state/Summary'
import { useChannelInfo } from '../../hooks/useChannelInfo'
import { FC, useCallback, useEffect, useState } from 'react'
import { ERROR, IDLE, IDLE_DELAY, PROCESSING, SUCCESS, ZERO_ADDRESS } from '../../constants/misc'
import { useNestOpenPlatformContract } from '../../hooks/useContract'
import {NEST_ADDRESS, NEST_OPEN_PLATFORM_ADDRESS} from '../../constants/addresses'
import { formatNumber, parseToBigNumber } from '../../utils/bignumberUtil'
import { formatWithUnit, parseToNumber } from '../../utils/unit'
import { useBalance } from '../../hooks/useBalance'
import { CHAIN_INFO } from '../../constants/chains'
import { useToken } from '../../hooks/Tokens'
import BigNumber from 'bignumber.js'
import useActiveWeb3React from "../../hooks/useActiveWeb3React";

const Administrator = () => {
  const channelId = useRecoilValue(activeChannelIdAtom)
  const { info, status } = useChannelInfo(channelId)
  const { account } = useActiveWeb3React()

  if (info.opener !== account) {
    return <></>
  }

  return (
    <Stack bg={'white'} w={'full'} borderRadius={'12px'} px={'20px'} py={'8px'} alignItems={'center'} direction={'row'} border={"1px solid"} borderColor={"secondary.300"}>
      <Text fontWeight={'semibold'} mr={'88px'}>
        Administrator
      </Text>
      <Stack direction={'row'} spacing={'44px'}>
        <DepositPopover isLoading={status === PROCESSING} tokenAddress={info.reward} />
        <WithdrawPopover isLoading={status === PROCESSING} tokenAddress={info.reward} />
        <WithdrawFeePopover isLoading={status === PROCESSING} />
      </Stack>
    </Stack>
  )
}

type PopoverProps = {
  isLoading: boolean
  tokenAddress?: string
}

const DepositPopover: FC<PopoverProps> = ({ ...props }) => {
  const { chainId, account } = useActiveWeb3React()
  const activeChannelId = useRecoilValue(activeChannelIdAtom)
  const nestOpenPlatform = useNestOpenPlatformContract(true)
  const [amount, setAmount] = useState('0')
  const [depositStatus, setDepositStatus] = useState(IDLE)
  const channelId = useRecoilValue(activeChannelIdAtom)
  const { refresh: refreshChannelInfo } = useChannelInfo(channelId)
  const {
    balanceOf,
    approve,
    approveStatus,
    symbol: tokenSymbol,
    allowance,
  } = useToken(props.tokenAddress ?? NEST_ADDRESS[1])
  const [balance, setBalance] = useState(0)
  const [allowanceAmount, setAllowanceAmount] = useState(0)

  const refresh = useCallback(async () => {
    if (!account) {
      setBalance(0)
      return
    }
    setAllowanceAmount(parseToBigNumber(await allowance(account, NEST_OPEN_PLATFORM_ADDRESS[chainId ?? 56])).toNumber())
    setBalance(parseToBigNumber(await balanceOf(account)).toNumber())
  }, [account, allowance, balanceOf, chainId])

  useEffect(() => {
    refresh()
  }, [refresh])

  const handleDeposit = async () => {
    if (!nestOpenPlatform) return
    setDepositStatus(PROCESSING)
    try {
      let value = new BigNumber(0)
      if (props.tokenAddress === ZERO_ADDRESS) {
        value = parseToBigNumber(amount).shiftedBy(18)
      }
      //  function increase(uint channelId, uint96 vault) external payable;
      const tx = await nestOpenPlatform.increase(activeChannelId, parseToBigNumber(amount).shiftedBy(18).toFixed(0), {
        value: value.toFixed(0),
      })
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
          await refreshChannelInfo()
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
    if (!chainId) {
      return
    }
    await approve(NEST_OPEN_PLATFORM_ADDRESS[chainId], parseToBigNumber(10).shiftedBy(36).toFixed(0))
  }

  return (
    <Popover>
      <PopoverTrigger>
        <Button variant={'outline'} isLoading={props.isLoading}>
          Deposit
        </Button>
      </PopoverTrigger>
      <PopoverContent borderRadius={'12px'} border={'none'}>
        <PopoverBody boxShadow={'0px 0px 60px 0px #BFBFBF'} borderRadius={'12px'}>
          <Stack alignItems={'center'} spacing={'20px'} p={'20px'}>
            <Text fontWeight={'bold'}>Deposit</Text>
            <NumberInput
              variant={'filled'}
              onChange={(valueString) => {
                setAmount(parseToNumber(valueString, tokenSymbol))
              }}
              value={formatWithUnit(amount, tokenSymbol)}
              max={balance}
              min={0}
              onFocus={(e) => {
                e.target.setSelectionRange(0, amount.length)
              }}
            >
              <NumberInputField />
            </NumberInput>
            <Text fontWeight={'bold'} fontSize={'sm'} color={'secondary'} textAlign={'center'}>
              Balance (myself): {formatNumber(balance)} {tokenSymbol}
            </Text>
            {props.tokenAddress !== ZERO_ADDRESS && (
              <Button
                variant={'outline'}
                isFullWidth
                onClick={handleApprove}
                hidden={allowanceAmount >= Number(amount)}
                isLoading={approveStatus === PROCESSING}
                loadingText={'Approving'}
              >
                Approve
                {approveStatus === SUCCESS && <> Success</>}
                {approveStatus === ERROR && <> Error</>}
              </Button>
            )}
            <Button
              variant={'outline'}
              isFullWidth
              onClick={handleDeposit}
              isLoading={depositStatus === PROCESSING}
              disabled={amount === '0' || allowanceAmount < Number(amount)}
              loadingText={'Depositing'}
            >
              Deposit
              {depositStatus === SUCCESS && <> Success</>}
              {depositStatus === ERROR && <> Error</>}
            </Button>
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

const WithdrawPopover: FC<PopoverProps> = ({ ...props }) => {
  const { account } = useActiveWeb3React()
  const activeChannelId = useRecoilValue(activeChannelIdAtom)
  const nestOpenPlatform = useNestOpenPlatformContract(true)
  const [amount, setAmount] = useState('0')
  const [withdrawStatus, setWithdrawStatus] = useState(IDLE)
  const channelId = useRecoilValue(activeChannelIdAtom)
  const { info, refresh: fetchChannelInfo } = useChannelInfo(channelId)
  const { balanceOf, symbol: tokenSymbol } = useToken(props.tokenAddress ?? NEST_ADDRESS[1])
  const [balance, setBalance] = useState('')

  const refresh = useCallback(async () => {
    setBalance(formatNumber(parseToBigNumber(await balanceOf(account ?? ZERO_ADDRESS))))
  }, [account, balanceOf])

  useEffect(() => {
    refresh()
  }, [refresh])

  const handleWithdraw = async () => {
    if (!nestOpenPlatform) return
    try {
      setWithdrawStatus(PROCESSING)
      const tx = await nestOpenPlatform.decrease(activeChannelId, parseToBigNumber(amount).shiftedBy(18).toFixed(0))
      const res = await tx.wait()
      switch (res.status) {
        case 0:
          setWithdrawStatus(ERROR)
          setTimeout(() => {
            setWithdrawStatus(IDLE)
          }, IDLE_DELAY)
          break
        case 1:
          setWithdrawStatus(SUCCESS)
          await fetchChannelInfo()
          setTimeout(() => {
            setWithdrawStatus(IDLE)
          }, IDLE_DELAY)
          break
      }
    } catch (e) {
      setWithdrawStatus(ERROR)
      setTimeout(() => {
        setWithdrawStatus(IDLE)
      }, IDLE_DELAY)
    }
  }

  return (
    <Popover>
      <PopoverTrigger>
        <Button variant={'outline'} isLoading={props.isLoading}>
          Withdraw
        </Button>
      </PopoverTrigger>
      <PopoverContent borderRadius={'12px'} border={'none'}>
        <PopoverBody boxShadow={'0px 0px 60px 0px #BFBFBF'} borderRadius={'12px'}>
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
              <NumberInputField />
            </NumberInput>
            <Text fontWeight={'bold'} fontSize={'sm'} color={'secondary'} textAlign={'center'}>
              Balance (myself): {balance} {tokenSymbol}
            </Text>
            <Button
              variant={'outline'}
              isFullWidth
              onClick={handleWithdraw}
              loadingText={'Withdrawing'}
              disabled={amount === '0'}
              isLoading={withdrawStatus === PROCESSING}
            >
              Withdraw
              {withdrawStatus === SUCCESS && <> Success</>}
              {withdrawStatus === ERROR && <> Error</>}
            </Button>
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

const WithdrawFeePopover: FC<PopoverProps> = ({ ...props }) => {
  const { chainId, account } = useActiveWeb3React()
  const activeChannelId = useRecoilValue(activeChannelIdAtom)
  const nestOpenPlatform = useNestOpenPlatformContract(true)
  const channelId = useRecoilValue(activeChannelIdAtom)
  const { info, refresh: fetchChannelInfo } = useChannelInfo(channelId)
  const [amount, setAmount] = useState('0')
  const { balance } = useBalance(account)
  const [withdrawFeeStatus, setWithdrawFeeStatus] = useState(IDLE)

  const handleWithdrawFee = async () => {
    if (!nestOpenPlatform) return
    try {
      setWithdrawFeeStatus(PROCESSING)
      const tx = await nestOpenPlatform.pay(activeChannelId, account, parseToBigNumber(amount).shiftedBy(18).toFixed(0))
      const res = await tx.wait()
      switch (res.status) {
        case 0:
          setWithdrawFeeStatus(ERROR)
          setTimeout(() => {
            setWithdrawFeeStatus(IDLE)
          }, IDLE_DELAY)
          break
        case 1:
          setWithdrawFeeStatus(SUCCESS)
          await fetchChannelInfo()
          setTimeout(() => {
            setWithdrawFeeStatus(IDLE)
          }, IDLE_DELAY)
          break
      }
    } catch (e) {
      setWithdrawFeeStatus(ERROR)
      setTimeout(() => {
        setWithdrawFeeStatus(IDLE)
      }, IDLE_DELAY)
    }
  }

  return (
    <Popover>
      <PopoverTrigger>
        <Button variant={'outline'} isLoading={props.isLoading}>
          Withdraw Fee
        </Button>
      </PopoverTrigger>
      <PopoverContent borderRadius={'12px'} border={'none'}>
        <PopoverBody boxShadow={'0px 0px 60px 0px #BFBFBF'} borderRadius={'12px'}>
          <Stack alignItems={'center'} spacing={'20px'} p={'20px'}>
            <Text fontWeight={'bold'}>Withdraw Fee</Text>
            <NumberInput
              variant={'filled'}
              onChange={(valueString) => {
                setAmount(parseToNumber(valueString, CHAIN_INFO[chainId ?? 1].nativeSymbol))
              }}
              value={formatWithUnit(amount, CHAIN_INFO[chainId ?? 1].nativeSymbol)}
              max={parseToBigNumber(info.rewards).toNumber()}
              min={0}
              onFocus={(e) => {
                e.target.setSelectionRange(0, amount.length)
              }}
            >
              <NumberInputField />
            </NumberInput>
            <Text fontWeight={'bold'} fontSize={'sm'} color={'secondary'}>
              Balance (myself): {formatNumber(balance)} {CHAIN_INFO[chainId ?? 1].nativeSymbol}
            </Text>
            <Button
              variant={'outline'}
              isFullWidth
              onClick={handleWithdrawFee}
              isLoading={withdrawFeeStatus === PROCESSING}
              loadingText={'Withdrawing'}
              disabled={amount === '0'}
            >
              Withdraw
              {withdrawFeeStatus === SUCCESS && <> Success</>}
              {withdrawFeeStatus === ERROR && <> Error</>}
            </Button>
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default Administrator
