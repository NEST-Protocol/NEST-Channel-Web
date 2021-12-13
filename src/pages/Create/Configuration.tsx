import { FormControl, FormLabel, Select, Stack, Text } from '@chakra-ui/react'
import { ImCircleDown } from 'react-icons/all'

const Configuration = () => {
  return (
    <Stack pt={'60px'} pb={'30px'} w={'600px'} spacing={'20px'}>
      <FormControl id="price token uint">
        <FormLabel fontWeight={'600'}>Price Token Unit:</FormLabel>
        <Select placeholder="Select price token" variant={'filled'} icon={<ImCircleDown />} iconColor={'secondary'}>
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </Select>
      </FormControl>

      <FormControl id="standard output">
        <FormLabel fontWeight={'600'}>Standard Output:</FormLabel>
        <Select placeholder="Select price token" variant={'filled'} icon={<ImCircleDown />} iconColor={'secondary'}>
          <option>1 /Block</option>
          <option>5 /Block</option>
          <option>10 /Block</option>
        </Select>
      </FormControl>

      <FormControl id="quotation fee">
        <FormLabel fontWeight={'600'}>Quotation Fee:</FormLabel>
        <Select placeholder="Select price token" variant={'filled'} icon={<ImCircleDown />} iconColor={'secondary'}>
          <option>1</option>
          <option>2</option>
        </Select>
      </FormControl>

      <FormControl id="price calling fee">
        <FormLabel fontWeight={'600'}>Price Calling Fee:</FormLabel>
        <Select placeholder="Select price token" variant={'filled'} icon={<ImCircleDown />} iconColor={'secondary'}>
          <option>1</option>
          <option>2</option>
        </Select>
      </FormControl>

      <FormControl id="attenuation factor">
        <FormLabel fontWeight={'600'}>Attenuation Factor:</FormLabel>
        <Select placeholder="Select price token" variant={'filled'} icon={<ImCircleDown />} iconColor={'secondary'}>
          <option>1</option>
          <option>2</option>
        </Select>
      </FormControl>
    </Stack>
  )
}

export const ConfigurationTip = () => {
  return (
    <Stack w={'764px'} spacing={'12px'}>
      <Text fontWeight={'bold'}>Instructions</Text>
      <p />
      <Text fontSize={'sm'} fontWeight={'600'}>
        Price Token Uint
      </Text>
      <Text fontSize={'sm'} color={'secondary.500'} fontWeight={'600'}>
        The number of pricing token when quoting.
      </Text>
      <p />
      <Text fontSize={'sm'} fontWeight={'600'}>
        Standard Output
      </Text>
      <Text fontSize={'sm'} color={'secondary.500'} fontWeight={'600'}>
        The offer incentives in the protocol are issued at quotation block intervals. This parameter sets the amount
        of offer per block in the absence of decay.
      </Text>
      <p />
      <Text fontSize={'sm'} fontWeight={'600'}>
        Quotation Fee
      </Text>
      <Text fontSize={'sm'} color={'secondary.500'} fontWeight={'600'}>
        The commission to be paid for each quote, the quote commission is at the disposal of the quote channel manager.
        If there are multiple offers within the same block, the incentive Token mined is distributed in proportion to
        the fee.
      </Text>
      <p />
      <Text fontSize={'sm'} fontWeight={'600'}>
        Price Calling Fee
      </Text>
      <Text fontSize={'sm'} color={'secondary.500'} fontWeight={'600'}>
        The price call fee for other products to call the price of this quote channel is at the disposal of the quote
        channel manager.
      </Text>
      <p />
      <Text fontSize={'sm'} fontWeight={'600'}>
        Attenuation Factor
      </Text>
      <Text fontSize={'sm'} color={'secondary.500'} fontWeight={'600'}>
        This parameter sets the amount of decay for each block after one year. Example: Set to 80%, the second year
        block output is 80% of the first year.
      </Text>
    </Stack>
  )
}

export default Configuration
