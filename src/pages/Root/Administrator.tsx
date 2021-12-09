import {
  Button, Input, Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader, PopoverTrigger,
  Stack,
  Text
} from "@chakra-ui/react";

const Administrator = () => {
  return (
    <Stack bg={"white"} w={"100%"} h={"60px"} borderRadius={20} p={"22px"} alignItems={"center"} direction={"row"}>
      <Text fontWeight={600} fontSize={"17px"} mr={"88px"}>Administrator</Text>
      <Stack direction={"row"} spacing={"44px"}>
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
      <PopoverContent p={"20px"} borderRadius={"20px"}>
        <PopoverBody>
          <Stack alignItems={"center"} spacing={"22px"}>
            <Text fontWeight={"bold"} fontSize={"17px"}>Deposit</Text>
            <Input variant={"filled"} placeholder={"Input Quantity"}/>
            <Text fontWeight={"bold"} fontSize={"15px"} color={"secondary"}>Balance (myself): 80</Text>
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
      <PopoverContent p={"20px"} borderRadius={"20px"}>
        <PopoverBody>
          <Stack alignItems={"center"} spacing={"22px"}>
            <Text fontWeight={"bold"} fontSize={"17px"}>Withdraw</Text>
            <Input variant={"filled"} placeholder={"Input Quantity"}/>
            <Text fontWeight={"bold"} fontSize={"15px"} color={"secondary"}>Balance (myself): 80</Text>
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
      <PopoverContent p={"20px"} borderRadius={"20px"}>
        <PopoverBody>
          <Stack alignItems={"center"} spacing={"22px"}>
            <Text fontWeight={"bold"} fontSize={"17px"}>Withdraw Fee</Text>
            <Input variant={"filled"} placeholder={"Input Quantity"}/>
            <Text fontWeight={"bold"} fontSize={"15px"} color={"secondary"}>Balance (myself): 80</Text>
            <Button variant={"outline"} isFullWidth>Withdraw</Button>
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default Administrator