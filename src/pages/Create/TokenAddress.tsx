import { Input, Select, Stack, Text } from '@chakra-ui/react'
import { ImCircleDown } from 'react-icons/all'
import useCreateChannel from "../../hooks/useCreateChannel";
import {isAddress} from "../../utils";
import {useState} from "react";
import InputWithSelect from "../../components/InputWithSelect";

const TokenAddress = () => {
  const { quotationToken, setQuotationToken, priceToken, setPriceToken, miningToken, setMiningToken } = useCreateChannel()
  const [quotationTokenInputValid, setQuotationTokenInputValid] = useState(false)
  const [priceTokenSelectValid, setPriceTokenSelectValid] = useState(false)
  const [miningTokenInputValid, setMiningTokenInputValid] = useState(false)
  const handleQuotationTokenChange = (event: any) => {
    const address = isAddress(event.target.value)
    if (address){
      // 地址合法，返回false
      setQuotationTokenInputValid(false)
      setQuotationToken(address)
    } else {
      // 地址不合法，返回true
      setQuotationTokenInputValid(true)
    }
  }

  const handleMiningTokenChange = (event: any) => {
    const address = isAddress(event.target.value)
    if (address){
      // 地址合法，返回false
      setMiningTokenInputValid(false)
      setMiningToken(address)
    } else {
      // 地址不合法，返回true
      setMiningTokenInputValid(true)
    }
  }

  return (
    <Stack pt={'60px'} pb={'30px'} w={'600px'} spacing={'20px'}>
      <Stack id="quotation token address" spacing={"16px"}>
        <Text fontWeight={'600'} mx={"16px"}>Quotation Token:</Text>
        <Input variant={'filled'} placeholder={'Input Token Address'} isInvalid={quotationTokenInputValid}
               onChange={handleQuotationTokenChange} defaultValue={quotationToken}/>
      </Stack>

      <InputWithSelect title={"Price Token Unit:"} defaultValue={priceToken}
                       onChange={setPriceToken} datalist={[{title: "PETH", data: "1"}, {title: "PUSD", data: "2"}]} />

      <Stack spacing={"16px"}>
        <Text fontWeight={'600'} mx={"16px"}>Mining Token:</Text>
        <Input variant={'filled'} placeholder={'Input Token Address'} onChange={handleMiningTokenChange}
               defaultValue={miningToken} isInvalid={miningTokenInputValid}
        />
      </Stack>
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
