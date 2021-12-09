import {Button, Stack, Text} from "@chakra-ui/react";

const Administrator = () => {
  return (
    <Stack bg={"white"} w={"100%"} h={"60px"} borderRadius={20} p={"22px"} alignItems={"center"} direction={"row"} spacing={"88px"}>
      <Text fontWeight={600} fontSize={"17px"}>Administrator</Text>
      <Stack direction={"row"} spacing={"44px"}>
        <Button variant={"outline"}>Deposit</Button>
        <Button variant={"outline"}>Withdraw</Button>
        <Button variant={"outline"}>Withdraw Fee</Button>
      </Stack>
    </Stack>
  )
}

export default Administrator