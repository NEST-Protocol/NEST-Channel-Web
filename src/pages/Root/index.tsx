import WalletAndTokenList from "./WalletAndTokenList";
import Information from "./Information";
import Administrator from "./Administrator";
import QuotationFrequency from "./QuotationFrequency";
import {Stack} from "@chakra-ui/react";

const Root = () => {
  return (
    <Stack p={5} spacing={5} direction={"row"}>
      <WalletAndTokenList />
      <Stack spacing={5}>
        <Information />
        <Administrator />
        <QuotationFrequency />
      </Stack>
    </Stack>
  )
}

export default Root