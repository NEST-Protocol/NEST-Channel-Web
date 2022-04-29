import WalletAndTokenList from './WalletAndTokenList'
import Information from './Information'
import Administrator from './Administrator'
import QuotationFrequency from './QuotationFrequency'
import {Stack, useMediaQuery, Text} from '@chakra-ui/react'

const Root = () => {
  const [isLargerThan1024] = useMediaQuery('(min-width: 1024px)')

  return (
    <>
      {
        isLargerThan1024 ? (
          <Stack p={'20px'} spacing={'20px'} direction={'row'}>
            <WalletAndTokenList />
            <Stack spacing={'20px'} maxW={'996px'}>
              <Information />
              <Administrator />
              <QuotationFrequency />
            </Stack>
          </Stack>
        ) : (
          <Stack px={"24px"} spacing={'24px'}>
            <WalletAndTokenList />
            <Text fontWeight={'semibold'}>Information</Text>
            <Information />
            {/*<Text fontWeight={'semibold'}>Administrator</Text>*/}
            {/*<Administrator />*/}
            <Text fontWeight={'semibold'}>Quotation Frequency</Text>
            <QuotationFrequency />
          </Stack>
        )
      }
    </>
  )
}

export default Root
