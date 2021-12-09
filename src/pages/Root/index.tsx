import WalletAndTokenList from "./WalletAndTokenList";
import Information from "./Information";
import Administrator from "./Administrator";
import QuotationFrequency from "./QuotationFrequency";
import {Stack} from "@chakra-ui/react";

const Root = () => {
  return (
    <Stack h={"100%"} w={"100%"} p={"22px"} spacing={"22px"} direction={"row"}>
      <WalletAndTokenList />
      <Stack h={"100%"} w={"100%"} spacing={"22px"}>
        <Information />
        <Administrator />
        <QuotationFrequency />
      </Stack>
    </Stack>
  )
}

export default Root