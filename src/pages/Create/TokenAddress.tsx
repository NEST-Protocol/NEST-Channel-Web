import { Input, Stack, Text } from '@chakra-ui/react'
import useCreateChannel from "../../hooks/useCreateChannel";
import {isAddress} from "../../utils";
import InputWithSelect from "../../components/InputWithSelect";

const TokenAddress = () => {
  const { quotationToken, setQuotationToken, priceToken, setPriceToken, miningToken, setMiningToken } = useCreateChannel()

  const checkAddress = (value: string) => {
    const address = isAddress(value)
    return !address;
  }

  const handleIsValid = (value: string) => {
    return value !== "PETH" && value !== "PUSD";
  }

  return (
    <Stack pt={'60px'} pb={'30px'} w={'600px'} spacing={'20px'}>
      <Stack id="quotation token address" spacing={"16px"}>
        <Text fontWeight={'600'} mx={"16px"}>Quotation Token:</Text>
        <Input variant={'filled'} placeholder={'Input Token Address'} isInvalid={checkAddress(quotationToken)}
               onChange={(event)=>setQuotationToken(event.target.value)} defaultValue={quotationToken}/>
      </Stack>

      <InputWithSelect title={"Price Token Unit:"} defaultValue={priceToken} onCheck={handleIsValid}
                       onChange={setPriceToken} datalist=
                         {[
                           {title: "PETH", data: "PETH"},
                           {title: "PUSD", data: "PUSD"},
                         ]} />

      <Stack spacing={"16px"}>
        <Text fontWeight={'600'} mx={"16px"}>Mining Token:</Text>
        <Input variant={'filled'} placeholder={'Input Token Address'}
               onChange={(event)=>setMiningToken(event.target.value)}
               defaultValue={miningToken} isInvalid={checkAddress(miningToken)}
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
