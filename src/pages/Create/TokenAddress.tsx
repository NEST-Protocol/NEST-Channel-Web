import {Input, Stack, Text} from '@chakra-ui/react'
import {isAddress} from '../../utils'
import InputWithSelect from '../../components/InputWithSelect'
import {PETH_ADDRESS, PUSD_ADDRESS} from "../../constants/addresses";
import {useActiveWeb3React} from "../../hooks/web3";
import {useRecoilState} from "recoil";
import {
  miningTokenAtom,
  priceTokenAtom,
  quotationTokenAtom,
} from "../../state/Create/form";

const TokenAddress = () => {
  const {chainId} = useActiveWeb3React()
  const [quotationToken, setQuotationToken] = useRecoilState(quotationTokenAtom)
  const [priceToken, setPriceToken] = useRecoilState(priceTokenAtom)
  const [miningToken, setMiningToken] = useRecoilState(miningTokenAtom)

  const checkAddress = (value: string) => {
    const address = isAddress(value)
    return !address
  }

  return (
    <Stack pt={'60px'} pb={'30px'} w={'600px'} spacing={'20px'}>
      <Stack id="quotation token address" spacing={'16px'}>
        <Text fontWeight={'600'} mx={'16px'}>
          Quotation Token:
        </Text>
        <Input
          variant={'filled'}
          placeholder={'Input Token Address'}
          isInvalid={checkAddress(quotationToken)}
          onChange={(event) => setQuotationToken(event.target.value)}
          defaultValue={quotationToken}
          onFocus={(e) => {
            e.target.setSelectionRange(0, quotationToken.length)
          }}
        />
      </Stack>

      <InputWithSelect
        title={'Price Token Unit'}
        defaultValue={priceToken}
        onCheck={() => checkAddress(priceToken)}
        onChange={setPriceToken}
        datalist={[
          {title: 'PETH - ' + PETH_ADDRESS[chainId ?? 1], data: PETH_ADDRESS[chainId ?? 1]},
          {title: 'PUSD - ' + PUSD_ADDRESS[chainId ?? 1], data: PUSD_ADDRESS[chainId ?? 1]},
        ]}
      />

      <Stack spacing={'16px'}>
        <Text fontWeight={'600'} mx={'16px'}>
          Mining Token:
        </Text>
        <Input
          variant={'filled'}
          placeholder={'Input Token Address'}
          onChange={(event) => setMiningToken(event.target.value)}
          defaultValue={miningToken}
          isInvalid={checkAddress(miningToken)}
          onFocus={(e) => {
            e.target.setSelectionRange(0, miningToken.length)
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
