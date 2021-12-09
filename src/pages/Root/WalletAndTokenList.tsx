import {Stack, Button, Spacer} from "@chakra-ui/react";

const WalletAndTokenList = () => {
  return (
    <Stack bg={"white"} minW={"204px"} h={"100%"} borderRadius={20} py={"22px"} px={"14px"}>
      <Button>
        Connect
      </Button>
      <Spacer/>
      <Button variant={"outline"}>
        Create
      </Button>
    </Stack>
  )
}

export default WalletAndTokenList