import {
  Button,
  FormControl,
  FormLabel,
  Input, Popover, PopoverArrow, PopoverBody,
  PopoverCloseButton,
  PopoverContent, PopoverFooter,
  PopoverHeader, PopoverTrigger,
  Select,
  Stack,
  Text
} from '@chakra-ui/react'
import { ImCircleDown } from 'react-icons/all'
import useCreateChannel from "../../hooks/useCreateChannel";
import {useState} from "react";

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
  const [priceTokenUnitSelectValid, setPriceTokenUnitSelectValid] = useState(false)
  const [standardOutputValid, setStandardOutputValid] = useState(false)
  const [quotationFeeValid, setQuotationFeeValid] = useState(false)
  const [priceCallingFeeValid, setPriceCallingFeeValid] = useState(false)
  const [attenuationFactorValid, setAttenuationFactorValid] = useState(false)

  return (
    <Stack pt={'60px'} pb={'30px'} w={'600px'} spacing={'20px'}>
      <FormControl id="price token uint">
        <FormLabel fontWeight={'600'}>Price Token Unit:</FormLabel>
        <Input variant={'filled'} placeholder={'Input Price Token Unit'} isInvalid={priceTokenUnitSelectValid}
               defaultValue={priceTokenUnit} list={"priceTokenUint"}/>
        <datalist id="priceTokenUint">
          <option value="中国 北京" />
          <option value="中国 上海" />
          <option value="中国 广州" />
          <option value="中国 深圳" />
          <option value="中国 东莞" />
        </datalist>
      </FormControl>

      <FormControl id="standard output">
        <FormLabel fontWeight={'600'}>Standard Output:</FormLabel>
        <Input variant={'filled'} placeholder={'Input Standard Output'} isInvalid={priceTokenUnitSelectValid}
               defaultValue={priceTokenUnit} list={"standardOutput"}/>
        <datalist id="standardOutput">
          <option value="中国 北京" />
          <option value="中国 上海" />
          <option value="中国 广州" />
          <option value="中国 深圳" />
          <option value="中国 东莞" />
        </datalist>
      </FormControl>

      <FormControl id="quotation fee">
        <FormLabel fontWeight={'600'}>Quotation Fee:</FormLabel>
        <Input variant={'filled'} placeholder={'Input Quotation Fee'} isInvalid={priceTokenUnitSelectValid}
               defaultValue={priceTokenUnit} list={"quotationFee"}/>
        <datalist id="quotationFee">
          <option value="中国 北京" />
          <option value="中国 上海" />
          <option value="中国 广州" />
          <option value="中国 深圳" />
          <option value="中国 东莞" />
        </datalist>
      </FormControl>

      <FormControl id="price calling fee">
        <FormLabel fontWeight={'600'}>Price Calling Fee:</FormLabel>
        <Input variant={'filled'} placeholder={'Input Calling Fee'} isInvalid={priceTokenUnitSelectValid}
               defaultValue={priceTokenUnit} list={"callingFee"}/>
        <datalist id="callingFee">
          <option value="中国 北京" />
          <option value="中国 上海" />
          <option value="中国 广州" />
          <option value="中国 深圳" />
          <option value="中国 东莞" />
        </datalist>
      </FormControl>

      <FormControl id="attenuation factor">
        <FormLabel fontWeight={'600'}>Attenuation Factor:</FormLabel>
        <Input variant={'filled'} placeholder={'Input Attenuation Factor'} isInvalid={priceTokenUnitSelectValid}
               defaultValue={priceTokenUnit} list={"attenuationFactor"}/>
        <datalist id="attenuationFactor">
          <option value="中国 北京" />
          <option value="中国 上海" />
          <option value="中国 广州" />
          <option value="中国 深圳" />
          <option value="中国 东莞" />
        </datalist>
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
