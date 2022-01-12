import { Input, Stack, Text } from '@chakra-ui/react'
import { isAddress } from '../../utils'
import InputWithSelect from '../../components/InputWithSelect'
import { useRecoilState } from 'recoil'
import {
  miningTokenAddressAtom,
  priceTokenNameAtom,
  priceTokenUnitAtom,
  quotationTokenAddressAtom,
} from '../../state/Create/form'
import { useToken } from '../../hooks/Tokens'
import { useEffect } from 'react'
import { useCreateChannel } from '../../hooks/useCreateChannel'
import Divider from '../../components/Divider'

const TokenAddress = () => {
  const [quotationTokenAddress, setQuotationTokenAddress] = useRecoilState(quotationTokenAddressAtom)
  const [priceTokenName, setPriceTokenName] = useRecoilState(priceTokenNameAtom)
  const [miningTokenAddress, setMiningTokenAddress] = useRecoilState(miningTokenAddressAtom)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [priceTokenUnit, setPriceTokenUnit] = useRecoilState(priceTokenUnitAtom)
  const { symbol: quotationTokenSymbol } = useToken(quotationTokenAddress)
  const { symbol: miningTokenSymbol } = useToken(miningTokenAddress)
  const { priceTokenAddress } = useCreateChannel()

  // @typescript-eslint/no-unused-vars
  console.log(priceTokenUnit)

  const checkAddress = (value: string) => {
    const address = isAddress(value)
    return !address
  }

  const checkPriceToken = (value: string) => {
    return !(value === 'PETH' || value === 'PUSD') || priceTokenAddress === quotationTokenAddress
  }

  useEffect(() => {
    setPriceTokenUnit('')
  }, [priceTokenName, setPriceTokenUnit])

  return (
    <Stack pt={'60px'} pb={'36px'} w={'600px'} spacing={'20px'}>
      <Stack id="quotation token address" spacing={'16px'}>
        <Text fontWeight={'600'} mx={'16px'} color={'secondary.500'}>
          Quotation Token ({quotationTokenSymbol}):
        </Text>
        <Input
          variant={'filled'}
          fontSize={quotationTokenAddress === '' ? '15px' : '17px'}
          placeholder={'Input Token Address'}
          isInvalid={checkAddress(quotationTokenAddress) || quotationTokenAddress === priceTokenAddress}
          errorBorderColor={'primary.500'}
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
          { title: 'PETH', data: 'PETH' },
          { title: 'PUSD', data: 'PUSD' },
        ]}
      />

      <Divider dashed={true} />

      <Stack spacing={'16px'}>
        <Text fontWeight={'600'} mx={'16px'} color={'secondary.500'}>
          Mining Token ({miningTokenSymbol}):
        </Text>
        <Input
          variant={'filled'}
          fontSize={miningTokenAddress === '' ? '15px' : '17px'}
          isInvalid={checkAddress(miningTokenAddress)}
          errorBorderColor={'primary.500'}
          placeholder={'Input Token Address'}
          onChange={(event) => setMiningTokenAddress(event.target.value)}
          defaultValue={miningTokenAddress}
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
