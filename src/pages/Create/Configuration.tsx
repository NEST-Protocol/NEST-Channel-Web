import { Stack, Text } from '@chakra-ui/react'
import useCreateChannel from '../../hooks/useCreateChannel'
import InputWithSelect from '../../components/InputWithSelect'

const Configuration = () => {
  const {
    priceTokenUnit,
    setPriceTokenUnit,
    standardOutput,
    setStandardOutput,
    quotationFee,
    setQuotationFee,
    priceCallingFee,
    setPriceCallingFee,
    attenuationFactor,
    setAttenuationFactor,
  } = useCreateChannel()

  const handleIsValid = (value: string) => {
    return value === ''
  }

  return (
    <Stack pt={'60px'} pb={'30px'} w={'600px'} spacing={'20px'}>
      <InputWithSelect
        title={'Price Token Unit:'}
        defaultValue={priceTokenUnit}
        onCheck={handleIsValid}
        onChange={setPriceTokenUnit}
        datalist={[
          { title: '1 ETH', data: '1' },
          { title: '2 ETH', data: '2' },
        ]}
      />

      <InputWithSelect
        title={'Standard Output:'}
        defaultValue={standardOutput}
        onCheck={handleIsValid}
        onChange={setStandardOutput}
        datalist={[
          { title: '1 NEST/Block', data: '1' },
          { title: '5 NEST/Block', data: '2' },
          { title: '10 NEST/Block', data: '10' },
        ]}
      />

      <InputWithSelect
        title={'Quotation Fee:'}
        defaultValue={quotationFee}
        onCheck={handleIsValid}
        onChange={setQuotationFee}
        datalist={[
          { title: '0.01 ETH', data: '0.01' },
          { title: '0.02 ETH', data: '0.02' },
          { title: '0.03 ETH', data: '0.03' },
        ]}
      />

      <InputWithSelect
        title={'Price Calling Fee:'}
        defaultValue={priceCallingFee}
        onCheck={handleIsValid}
        onChange={setPriceCallingFee}
        datalist={[
          { title: '0.01 ETH', data: '0.01' },
          { title: '0.02 ETH', data: '0.02' },
          { title: '0.03 ETH', data: '0.03' },
        ]}
      />

      <InputWithSelect
        title={'Attenuation Factor:'}
        defaultValue={attenuationFactor}
        onCheck={handleIsValid}
        onChange={setAttenuationFactor}
        datalist={[
          { title: '80 %', data: '80' },
          { title: '50 %', data: '50' },
        ]}
      />
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
        The offer incentives in the protocol are issued at quotation block intervals. This parameter sets the amount of
        offer per block in the absence of decay.
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
