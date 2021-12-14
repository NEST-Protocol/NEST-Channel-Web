import {
  Stack,
  Text
} from '@chakra-ui/react'
import useCreateChannel from "../../hooks/useCreateChannel";
import InputWithSelect from "../../components/InputWithSelect";

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
    setAttenuationFactor
  } = useCreateChannel()

  return (
    <Stack pt={'60px'} pb={'30px'} w={'600px'} spacing={'20px'}>

      <InputWithSelect title={"Price Token Unit:"} defaultValue={priceTokenUnit}
                       onChange={setPriceTokenUnit} datalist={[{title: "1", data: "1"}]} />

      {/*<FormControl id="standard output">*/}
      {/*  <FormLabel fontWeight={'600'}>Standard Output:</FormLabel>*/}
      {/*  <Input variant={'filled'} placeholder={'Input Standard Output'} isInvalid={priceTokenUnitSelectValid}*/}
      {/*         defaultValue={priceTokenUnit}/>*/}
      {/*</FormControl>*/}

      {/*<FormControl id="quotation fee">*/}
      {/*  <FormLabel fontWeight={'600'}>Quotation Fee:</FormLabel>*/}
      {/*  <Input variant={'filled'} placeholder={'Input Quotation Fee'} isInvalid={priceTokenUnitSelectValid}*/}
      {/*         defaultValue={priceTokenUnit}/>*/}
      {/*</FormControl>*/}

      {/*<FormControl id="price calling fee">*/}
      {/*  <FormLabel fontWeight={'600'}>Price Calling Fee:</FormLabel>*/}
      {/*  <Input variant={'filled'} placeholder={'Input Calling Fee'} isInvalid={priceTokenUnitSelectValid}*/}
      {/*         defaultValue={priceTokenUnit}/>*/}
      {/*</FormControl>*/}

      {/*<FormControl id="attenuation factor">*/}
      {/*  <FormLabel fontWeight={'600'}>Attenuation Factor:</FormLabel>*/}
      {/*  <Input variant={'filled'} placeholder={'Input Attenuation Factor'} isInvalid={priceTokenUnitSelectValid}*/}
      {/*         defaultValue={priceTokenUnit}/>*/}
      {/*</FormControl>*/}
    </Stack>
  )
}

export const ConfigurationTip = () => {
  return (
    <Stack w={'764px'} spacing={'12px'}>
      <Text fontWeight={'bold'}>Instructions</Text>
      <p/>
      <Text fontSize={'sm'} fontWeight={'600'}>
        Price Token Uint
      </Text>
      <Text fontSize={'sm'} color={'secondary.500'} fontWeight={'600'}>
        The number of pricing token when quoting.
      </Text>
      <p/>
      <Text fontSize={'sm'} fontWeight={'600'}>
        Standard Output
      </Text>
      <Text fontSize={'sm'} color={'secondary.500'} fontWeight={'600'}>
        The offer incentives in the protocol are issued at quotation block intervals. This parameter sets the amount
        of offer per block in the absence of decay.
      </Text>
      <p/>
      <Text fontSize={'sm'} fontWeight={'600'}>
        Quotation Fee
      </Text>
      <Text fontSize={'sm'} color={'secondary.500'} fontWeight={'600'}>
        The commission to be paid for each quote, the quote commission is at the disposal of the quote channel manager.
        If there are multiple offers within the same block, the incentive Token mined is distributed in proportion to
        the fee.
      </Text>
      <p/>
      <Text fontSize={'sm'} fontWeight={'600'}>
        Price Calling Fee
      </Text>
      <Text fontSize={'sm'} color={'secondary.500'} fontWeight={'600'}>
        The price call fee for other products to call the price of this quote channel is at the disposal of the quote
        channel manager.
      </Text>
      <p/>
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
