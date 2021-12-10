import {
  Button, Input, Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text
} from "@chakra-ui/react";

const Administrator = () => {
  return (
    <Stack bg={"white"} w={"full"} borderRadius={20} px={5} py={2} alignItems={"center"} direction={"row"}>
      <Text fontWeight={600} mr={24}>Administrator</Text>
      <Stack direction={"row"} spacing={12}>
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
        <Button variant={"outline"}>Deposit</Button>
      </PopoverTrigger>
      <PopoverContent p={2} borderRadius={"20px"}>
        <PopoverBody>
          <Stack alignItems={"center"} spacing={4}>
            <Text fontWeight={"bold"}>Deposit</Text>
            <Input variant={"filled"} placeholder={"Input Quantity"}/>
            <Text fontWeight={"bold"} fontSize={"sm"} color={"secondary"}>Balance (myself): 80</Text>
            <Button variant={"outline"} isFullWidth>Deposit</Button>
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
        <Button variant={"outline"}>Withdraw</Button>
      </PopoverTrigger>
      <PopoverContent p={2} borderRadius={"20px"}>
        <PopoverBody>
          <Stack alignItems={"center"} spacing={4}>
            <Text fontWeight={"bold"}>Withdraw</Text>
            <Input variant={"filled"} placeholder={"Input Quantity"}/>
            <Text fontWeight={"bold"} fontSize={"sm"} color={"secondary"}>Balance (myself): 80</Text>
            <Button variant={"outline"} isFullWidth>Withdraw</Button>
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
        <Button variant={"outline"}>Withdraw Fee</Button>
      </PopoverTrigger>
      <PopoverContent p={2} borderRadius={"20px"}>
        <PopoverBody>
          <Stack alignItems={"center"} spacing={4}>
            <Text fontWeight={"bold"}>Withdraw Fee</Text>
            <Input variant={"filled"} placeholder={"Input Quantity"}/>
            <Text fontWeight={"bold"} fontSize={"sm"} color={"secondary"}>Balance (myself): 80</Text>
            <Button variant={"outline"} isFullWidth>Withdraw</Button>
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default Administrator