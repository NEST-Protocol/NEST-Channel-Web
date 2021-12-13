import { FormControl, FormErrorMessage, FormLabel, Input, Select, Stack, Text } from '@chakra-ui/react'
import { ImCircleDown } from 'react-icons/all'

const TokenAddress = () => {
  return (
    <Stack pt={'60px'} pb={'30px'} w={'600px'} spacing={'20px'}>
      <FormControl id="quotation token address">
        <FormLabel fontWeight={'600'}>Quotation Token:</FormLabel>
        <Input variant={'filled'} placeholder={'Input Token Address'} />
        <FormErrorMessage>The quotation token address is void!</FormErrorMessage>
      </FormControl>

      <FormControl id="price token">
        <FormLabel fontWeight={'600'}>Price Token:</FormLabel>
        <Select placeholder="Select price token" variant={'filled'} icon={<ImCircleDown />} iconColor={'secondary'}>
          <option>PETH</option>
          <option>PUSD</option>
        </Select>
      </FormControl>

      <FormControl id="mining token">
        <FormLabel fontWeight={'600'}>Mining Token:</FormLabel>
        <Input variant={'filled'} placeholder={'Input Token Address'} />
        <FormErrorMessage>The mining token address is void!</FormErrorMessage>
      </FormControl>
    </Stack>
  )
}

export const TokenAddressTip = () => {
  return (
    <Stack w={'764px'} spacing={'12px'}>
      <Text fontWeight={'bold'}>Instructions</Text>
      <p />
      <Text fontSize={'sm'} fontWeight={'600'}>
        Price Token Address
      </Text>
      <Text fontSize={'sm'} color={'secondary.500'} fontWeight={'600'}>
        The quoted pair is denominated in that Token, as: 1PUSD = XXX Token, 1 PETH = 0.5 USDT, where PUSD and PETH are
        the denominated tokens.
      </Text>
      <p />
      <Text fontSize={'sm'} fontWeight={'600'}>
        Quotation Token Address
      </Text>
      <Text fontSize={'sm'} color={'secondary.500'} fontWeight={'600'}>
        The address of the quoted assets in the quotation pair, such as: 1PUSD = XXX Token, 1 PETH = 0.5 USDT, where
        Token and USDT are quoted tokens.
      </Text>
      <p />
      <Text fontSize={'sm'} fontWeight={'600'}>
        Mining Token Address
      </Text>
      <Text fontSize={'sm'} color={'secondary.500'} fontWeight={'600'}>
        Set the offer incentive tokens for the offer will mine a change of tokens according to the mining rules.
      </Text>
    </Stack>
  )
}

export default TokenAddress
