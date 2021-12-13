import { FormControl, FormLabel, Input, Select, Stack, Text } from '@chakra-ui/react'
import { ImCircleDown } from 'react-icons/all'
import useCreateChannel from "../../hooks/useCreateChannel";
import {isAddress} from "../../utils";
import {useState} from "react";

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

  const handlePriceTokenChange = (event: any) => {
    const address = event.target.value
    setPriceToken(address)
    if (address === "") {
      // 地址不合法，返回true
      setPriceTokenSelectValid(true)
    } else {
      setPriceTokenSelectValid(false)
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
      <FormControl id="quotation token address">
        <FormLabel fontWeight={'600'}>Quotation Token:</FormLabel>
        <Input variant={'filled'} placeholder={'Input Token Address'} isInvalid={quotationTokenInputValid}
               onChange={handleQuotationTokenChange} defaultValue={quotationToken}/>
      </FormControl>

      <FormControl id="price token">
        <FormLabel fontWeight={'600'}>Price Token:</FormLabel>
        <Select placeholder="Select price token" variant={'filled'} icon={<ImCircleDown />} iconColor={'secondary'}
                onChange={handlePriceTokenChange} isInvalid={priceTokenSelectValid}
                defaultValue={priceToken}>
          // Todo: edit as Token.PETH, Token.PUSD
          <option value={"0xPETH"}>PETH</option>
          <option value={"0xPUSD"}>PUSD</option>
        </Select>
      </FormControl>

      <FormControl id="mining token">
        <FormLabel fontWeight={'600'}>Mining Token:</FormLabel>
        <Input variant={'filled'} placeholder={'Input Token Address'} onChange={handleMiningTokenChange}
               defaultValue={miningToken} isInvalid={miningTokenInputValid}
        />
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
