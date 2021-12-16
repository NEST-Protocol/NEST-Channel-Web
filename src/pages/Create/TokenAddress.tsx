import {Input, Stack, Text} from '@chakra-ui/react'
import {isAddress} from '../../utils'
import InputWithSelect from '../../components/InputWithSelect'
import {useRecoilState} from "recoil";
import { useTokenName } from "../../hooks/Tokens";
import {
  miningTokenAddressAtom,
  priceTokenNameAtom, priceTokenUnitAtom,
  quotationTokenAddressAtom,
} from "../../state/Create/form";
import {useEffect} from "react";

const TokenAddress = () => {
  const [quotationTokenAddress, setQuotationTokenAddress] = useRecoilState(quotationTokenAddressAtom)
  const [priceTokenName, setPriceTokenName] = useRecoilState(priceTokenNameAtom)
  const [miningTokenAddress, setMiningTokenAddress] = useRecoilState(miningTokenAddressAtom)
  const [priceTokenUnit, setPriceTokenUnit] = useRecoilState(priceTokenUnitAtom)
  const quotationTokenName = useTokenName(quotationTokenAddress)
  const miningTokenName = useTokenName(miningTokenAddress)

  const checkAddress = (value: string) => {
    const address = isAddress(value)
    return !address
  }

  const checkPriceToken = (value: string) => {
    return !(value === "PETH" || value === "PUSD")
  }

  useEffect(()=>{
    setPriceTokenUnit("")
  }, [priceTokenName, setPriceTokenUnit])

  return (
    <Stack pt={'60px'} pb={'30px'} w={'600px'} spacing={'20px'}>
      <Stack id="quotation token address" spacing={'16px'}>
        <Text fontWeight={'600'} mx={'16px'}>
          Quotation Token ({quotationTokenName}):
        </Text>
        <Input
          variant={'filled'}
          placeholder={'Input Token Address'}
          isInvalid={checkAddress(quotationTokenAddress)}
          onChange={(event) => setQuotationTokenAddress(event.target.value)}
          defaultValue={quotationTokenAddress}
          onFocus={(e) => {
            e.target.setSelectionRange(0, quotationTokenAddress.length)
          }}
        />
      </Stack>

      <InputWithSelect
        title={'Price Token'}
        defaultValue={priceTokenName}
        onCheck={() => checkPriceToken(priceTokenName)}
        onChange={setPriceTokenName}
        datalist={[
          {title: 'PETH', data: 'PETH'},
          {title: 'PUSD', data: 'PUSD'},
        ]}
      />

      <Stack spacing={'16px'}>
        <Text fontWeight={'600'} mx={'16px'}>
          Mining Token ({miningTokenName}):
        </Text>
        <Input
          variant={'filled'}
          placeholder={'Input Token Address'}
          onChange={(event) => setMiningTokenAddress(event.target.value)}
          defaultValue={miningTokenAddress}
          isInvalid={checkAddress(miningTokenAddress)}
          onFocus={(e) => {
            e.target.setSelectionRange(0, miningTokenAddress.length)
          }}
        />
      </Stack>
    </Stack>
  )
}

export const TokenAddressTip = () => {
  return (
    <Stack w={'764px'} spacing={'12px'}>
      <Text fontWeight={'bold'}>Instructions</Text>
      <p/>
      <Text fontSize={'sm'} fontWeight={'600'}>
        Price Token Address
      </Text>
      <Text fontSize={'sm'} color={'secondary.500'} fontWeight={'600'}>
        The quoted pair is denominated in that Token, as: 1PUSD = XXX Token, 1 PETH = 0.5 USDT, where PUSD and PETH are
        the denominated tokens.
      </Text>
      <p/>
      <Text fontSize={'sm'} fontWeight={'600'}>
        Quotation Token Address
      </Text>
      <Text fontSize={'sm'} color={'secondary.500'} fontWeight={'600'}>
        The address of the quoted assets in the quotation pair, such as: 1PUSD = XXX Token, 1 PETH = 0.5 USDT, where
        Token and USDT are quoted tokens.
      </Text>
      <p/>
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
