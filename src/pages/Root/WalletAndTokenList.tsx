import {Stack, Button, Spacer, Input, Text, Divider} from "@chakra-ui/react";
import {FC} from "react";
import {useNavigate} from "react-router-dom";

const WalletAndTokenList = () => {
  const navigate = useNavigate()

  return (
    <Stack bg={"white"} minW={"3xs"} h={"auto"} borderRadius={"2xl"} p={5} spacing={6}>
      <Button>
        Connect
      </Button>

      <Input variant='filled' placeholder='Token Address'/>

      <Stack>
        <TokenListItem id={1} token1={"NEST"} token2={"USDT"} count={8}/>
        <TokenListItem id={2} token1={"NEST"} token2={"USDT"} count={8}/>
        <TokenListItem id={3} token1={"NEST"} token2={"USDT"} count={8}/>
      </Stack>

      <Spacer/>
      <Button variant={"outline"} onClick={() => {
        navigate("/create")
      }}>
        Create
      </Button>
    </Stack>
  )
}

type TokenListItemProps = {
  id: number
  token1: string
  token2: string
  count: number
}

const TokenListItem: FC<TokenListItemProps> = ({...props}) => {
  return (
    <Stack>
      <Stack direction={"row"}>
        <Text color={"secondary"} fontWeight={"bold"}>
          {props.id} : {props.token1} {props.token2}
        </Text>
        <Spacer/>
        <Text color={"secondary"} fontWeight={"bold"}>
          {props.count}
        </Text>
      </Stack>
      <Divider color={"divider"}/>
    </Stack>
  )
}


export default WalletAndTokenList