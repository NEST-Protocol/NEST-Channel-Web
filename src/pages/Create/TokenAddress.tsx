import {FormControl, Input, InputGroup, InputRightElement, Stack, Text, useMediaQuery} from '@chakra-ui/react'
import { isAddress } from '../../utils'
import InputWithSelect from '../../components/InputWithSelect'
import { useRecoilState, useRecoilValue } from 'recoil'
import { miningTokenAddressAtom, priceTokenNameAtom, quotationTokenListAtom } from '../../state/Create/form'
import Divider from '../../components/Divider'
import InputWithTokenName, { TokenName } from '../../components/InputWithTokenName'

const TokenAddress = () => {
  const quotationTokenList = useRecoilValue(quotationTokenListAtom)
  const [priceTokenName, setPriceTokenName] = useRecoilState(priceTokenNameAtom)
  const [miningTokenAddress, setMiningTokenAddress] = useRecoilState(miningTokenAddressAtom)
  const [isLargerThan1024] = useMediaQuery('(min-width: 1024px)')

  return (
    <Stack pt={isLargerThan1024 ? '60px' : '30px'} pb={isLargerThan1024 ? '36px' : '24px'} spacing={'20px'} w={isLargerThan1024 ? 800 : 'full'}>
      <Stack id="quotation token address" spacing={isLargerThan1024 ? '16px' : '10px'} w={'full'}>
        <Text fontWeight={'600'} ml={isLargerThan1024 ? '116px' : '16px'} fontSize={isLargerThan1024 ? 'md' : 'xs'} color={'secondary.500'}>
          Quotation Token:
        </Text>
        {quotationTokenList.map((address: string) => (
          <InputWithTokenName key={address} address={address} isReadOnly={true} />
        ))}
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
        ]}
      />

      <Divider dashed={true} />

      <Stack spacing={isLargerThan1024 ? '16px' : '10px'}>
        <Text fontWeight={'600'} ml={isLargerThan1024 ? '116px' : '16px'} fontSize={isLargerThan1024 ? 'md' : 'xs'} color={'secondary.500'}>
          Mining Token:
        </Text>
        <Stack direction={'row'} spacing={0}>
          <FormControl w={isLargerThan1024 ? 600 : 'full'} mx={isLargerThan1024 ? 100 : 0}>
            <InputGroup>
              <Input
                variant={'filled'}
                minH={isLargerThan1024 ? '40px' : '44px'}
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
              <InputRightElement pr={'36px'} children={<TokenName address={miningTokenAddress} />} />
            </InputGroup>
          </FormControl>
        </Stack>
      </Stack>
    </Stack>
  )
}

export const TokenAddressTip = () => {
  const [isLargerThan1024] = useMediaQuery('(min-width: 1024px)')

  return (
    <Stack w={isLargerThan1024 ? '764px' : 'full'} spacing={'12px'}>
      <Text fontWeight={isLargerThan1024 ? 'bold' : 'semibold'} fontSize={isLargerThan1024 ? 'md' : 'xl'}>Instructions</Text>
      <p />
      <Text fontSize={isLargerThan1024 ? 'sm' : 'md'} fontWeight={'600'}>
        Price Token Address
      </Text>
      <Text fontSize={'sm'} color={'secondary.500'} fontWeight={'600'}>
        The quoted pair is denominated in that Token, as: 1PUSD = XXX Token, 1 PETH = 0.5 USDT, where PUSD and PETH are
        the denominated tokens.
      </Text>
      <p />
      <Text fontSize={isLargerThan1024 ? 'sm' : 'md'} fontWeight={'600'}>
        Quotation Token Address
      </Text>
      <Text fontSize={'sm'} color={'secondary.500'} fontWeight={'600'}>
        The address of the quoted assets in the quotation pair, such as: 1PUSD = XXX Token, 1 PETH = 0.5 USDT, where
        Token and USDT are quoted tokens.
      </Text>
      <p />
      <Text fontSize={isLargerThan1024 ? 'sm' : 'md'} fontWeight={'600'}>
        Mining Token Address
      </Text>
      <Text fontSize={'sm'} color={'secondary.500'} fontWeight={'600'}>
        Set the offer incentive tokens for the offer will mine a change of tokens according to the mining rules.
      </Text>
    </Stack>
  )
}

export default TokenAddress
