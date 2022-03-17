import WalletAndTokenList from './WalletAndTokenList'
import Information from './Information'
import Administrator from './Administrator'
import QuotationFrequency from './QuotationFrequency'
import { Stack } from '@chakra-ui/react'

const Root = () => {
  return (
    <Stack p={'20px'} spacing={'20px'} direction={'row'}>
      <WalletAndTokenList />
      <Stack spacing={'20px'} maxW={'996px'}>
        <Information />
        <Administrator />
        <QuotationFrequency />
      </Stack>
    </Stack>
  )
}

export default Root
