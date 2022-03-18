import {FormControl, Input, InputGroup, InputRightElement, Stack, Text} from '@chakra-ui/react'
import { isAddress } from '../../utils'
import InputWithSelect from '../../components/InputWithSelect'
import {useRecoilState, useRecoilValue} from 'recoil'
import {
  miningTokenAddressAtom,
  priceTokenNameAtom,
  quotationTokenListAtom,
} from '../../state/Create/form'
import { useToken } from '../../hooks/Tokens'
import Divider from '../../components/Divider'
import InputWithTokenName from "../../components/InputWithTokenName";

const TokenAddress = () => {
  const quotationTokenList = useRecoilValue(quotationTokenListAtom)
  const [priceTokenName, setPriceTokenName] = useRecoilState(priceTokenNameAtom)
  const [miningTokenAddress, setMiningTokenAddress] = useRecoilState(miningTokenAddressAtom)
  const { symbol: miningTokenSymbol } = useToken(miningTokenAddress)

  return (
    <Stack pt={'60px'} pb={'36px'} spacing={'20px'} w={800}>
      <Stack id="quotation token address" spacing={'16px'}>
        <Text fontWeight={'600'} ml={'116px'} color={'secondary.500'}>
          Quotation Token:
        </Text>
        { quotationTokenList.map((address: string) => (
          <InputWithTokenName key={address} address={address} isReadOnly={true}/>
        )) }
        <InputWithTokenName />
      </Stack>

      <InputWithSelect
        title={'Price Token'}
        defaultValue={priceTokenName}
        onCheck={() => false}
        readonly={true}
        onChange={setPriceTokenName}
        datalist={[
          { title: 'PETH', data: 'PETH' },
          { title: 'PUSD', data: 'PUSD' },
          { title: 'PBTC', data: 'PBTC' },
        ]}
      />

      <Divider dashed={true} />

      <Stack spacing={'16px'}>
        <Text fontWeight={'600'} ml={116} color={'secondary.500'}>
          Mining Token:
        </Text>
        <Stack direction={"row"} spacing={0}>
          <FormControl
            w={600}
            mx={100}
          >
            <InputGroup>
              <Input
                variant={'filled'}
                fontSize={miningTokenAddress === '' ? '15px' : '17px'}
                isInvalid={miningTokenAddress !== '' && !isAddress(miningTokenAddress)}
                errorBorderColor={'primary.500'}
                placeholder={'Input Token Address'}
                onChange={(event) => setMiningTokenAddress(event.target.value)}
                defaultValue={miningTokenAddress}
                onFocus={(e) => {
                  e.target.setSelectionRange(0, miningTokenAddress.length)
                }}
              />
              <InputRightElement pr={'36px'} children={<Text fontWeight={'bold'} color={'primary.500'}>{miningTokenSymbol}</Text>} />
            </InputGroup>
          </FormControl>
        </Stack>
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
