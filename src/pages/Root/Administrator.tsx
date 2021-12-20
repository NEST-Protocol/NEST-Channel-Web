import { Button, Input, Popover, PopoverBody, PopoverContent, PopoverTrigger, Stack, Text } from '@chakra-ui/react'
import {useRecoilValue} from "recoil";
import {activeChannelIdAtom} from "../../state/Root";
import useChannelInfo from "../../hooks/useChannelInfo";
import {useActiveWeb3React} from "../../hooks/web3";
import {FC} from "react";
import {PROCESSING} from "../../constants/misc";

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
        <DepositPopover isLoading={status === PROCESSING} disabled={info?.governance !== account}/>
        <WithdrawPopover isLoading={status === PROCESSING} disabled={info?.governance !== account}/>
        <WithdrawFeePopover isLoading={status === PROCESSING} disabled={info?.governance !== account}/>
      </Stack>
    </Stack>
  )
}

type PopverProps = {
  disabled: boolean
  isLoading: boolean
}

const DepositPopover: FC<PopverProps> = ({...props}) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant={'outline'} disabled={props.disabled} isLoading={props.isLoading}>Deposit</Button>
      </PopoverTrigger>
      <PopoverContent borderRadius={'20px'} border={'none'}>
        <PopoverBody boxShadow={'0px 0px 60px 0px #BFBFBF'} borderRadius={'20px'}>
          <Stack alignItems={'center'} spacing={'20px'} p={'20px'}>
            <Text fontWeight={'bold'}>Deposit</Text>
            <Input variant={'filled'} placeholder={'Input Quantity'} />
            <Text fontWeight={'bold'} fontSize={'sm'} color={'secondary'}>
              Balance (myself): 80
            </Text>
            <Button variant={'outline'} isFullWidth>
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
            <Input variant={'filled'} placeholder={'Input Quantity'} />
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
            <Input variant={'filled'} placeholder={'Input Quantity'} />
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
