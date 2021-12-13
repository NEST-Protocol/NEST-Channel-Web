import { Button, Input, Popover, PopoverBody, PopoverContent, PopoverTrigger, Stack, Text } from '@chakra-ui/react'

const Administrator = () => {
  return (
    <Stack bg={'white'} w={'full'} borderRadius={'20px'} px={'20px'} py={'8px'} alignItems={'center'} direction={'row'}>
      <Text fontWeight={'bold'} mr={'88px'}>
        Administrator
      </Text>
      <Stack direction={'row'} spacing={'44px'}>
        <DepositPopover />
        <WithdrawPopover />
        <WithdrawFeePopover />
      </Stack>
    </Stack>
  )
}

const DepositPopover = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant={'outline'}>Deposit</Button>
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

const WithdrawPopover = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant={'outline'}>Withdraw</Button>
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

const WithdrawFeePopover = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant={'outline'}>Withdraw Fee</Button>
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
