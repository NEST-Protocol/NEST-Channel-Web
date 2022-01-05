import { Stack, Text } from '@chakra-ui/react'
import InputWithSelect from '../../components/InputWithSelect'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  attenuationFactorAtom,
  priceCallingFeeAtom,
  priceTokenNameAtom,
  priceTokenUnitAtom,
  quotationFeeAtom,
  standardOutputAtom,
} from '../../state/Create/form'
import { CHAIN_INFO } from '../../constants/chains'
import { useActiveWeb3React } from '../../hooks/web3'

const Configuration = () => {
  const [priceTokenUnit, setPriceTokenUnit] = useRecoilState(priceTokenUnitAtom)
  const [standardOutput, setStandardOutput] = useRecoilState(standardOutputAtom)
  const [quotationFee, setQuotationFee] = useRecoilState(quotationFeeAtom)
  const [priceCallingFee, setPriceCallingFee] = useRecoilState(priceCallingFeeAtom)
  const [attenuationFactor, setAttenuationFactor] = useRecoilState(attenuationFactorAtom)
  const priceTokenName = useRecoilValue(priceTokenNameAtom)
  const { chainId } = useActiveWeb3React()

  // 若没有输入，则不合法，返回真
  const handleInvalidInput = (value: string) => {
    return value === ''
  }

  const handlePriceTokenUnitInvalidInput = (value: string) => {
    if (priceTokenName === 'PETH') {
      return value !== '1' && value !== '2' && value !== '3'
    } else {
      return value !== '1000' && value !== '2000' && value !== '3000'
    }
  }

  return (
    <Stack pt={'60px'} pb={'30px'} w={'680px'} spacing={'20px'}>
      {priceTokenName === 'PUSD' ? (
        <InputWithSelect
          title={'Price Token Unit'}
          defaultValue={priceTokenUnit}
          onCheck={handlePriceTokenUnitInvalidInput}
          onChange={setPriceTokenUnit}
          unit={'PUSD'}
          isNumber
          min={0}
          datalist={[
            { title: '1000 PUSD', data: '1000' },
            { title: '2000 PUSD', data: '2000' },
            { title: '3000 PUSD', data: '3000' },
          ]}
        />
      ) : (
        <InputWithSelect
          title={'Price Token Unit'}
          defaultValue={priceTokenUnit}
          onCheck={handlePriceTokenUnitInvalidInput}
          onChange={setPriceTokenUnit}
          unit={'PETH'}
          isNumber
          min={0}
          datalist={[
            { title: '1 PETH', data: '1' },
            { title: '2 PETH', data: '2' },
            { title: '3 PETH', data: '3' },
          ]}
        />
      )}

      <InputWithSelect
        title={'Standard Output'}
        defaultValue={standardOutput}
        onCheck={handleInvalidInput}
        onChange={setStandardOutput}
        isNumber
        min={0}
        unit={'NEST/Block'}
        datalist={[
          { title: '10 NEST/Block', data: '10' },
          { title: '5 NEST/Block', data: '5' },
          { title: '0 NEST/Block', data: '0' },
        ]}
      />

      <InputWithSelect
        title={'Quotation Fee'}
        defaultValue={quotationFee}
        onCheck={handleInvalidInput}
        onChange={setQuotationFee}
        isNumber
        min={0}
        max={1}
        unit={CHAIN_INFO[chainId ?? 1].nativeSymbol}
        datalist={[
          { title: '0.1 ' + CHAIN_INFO[chainId ?? 1].nativeSymbol, data: '0.01' },
          { title: '0.01 ' + CHAIN_INFO[chainId ?? 1].nativeSymbol, data: '0.01' },
          { title: '0.001 ' + CHAIN_INFO[chainId ?? 1].nativeSymbol, data: '0.001' },
          { title: '0 ' + CHAIN_INFO[chainId ?? 1].nativeSymbol, data: '0' },
        ]}
      />

      <InputWithSelect
        title={'Price Calling Fee'}
        defaultValue={priceCallingFee}
        onCheck={handleInvalidInput}
        onChange={setPriceCallingFee}
        isNumber
        min={0}
        max={1}
        unit={CHAIN_INFO[chainId ?? 1].nativeSymbol}
        datalist={[
          { title: '0.1 ' + CHAIN_INFO[chainId ?? 1].nativeSymbol, data: '0.1' },
          { title: '0.01 ' + CHAIN_INFO[chainId ?? 1].nativeSymbol, data: '0.01' },
          { title: '0.001 ' + CHAIN_INFO[chainId ?? 1].nativeSymbol, data: '0.001' },
          { title: '0 ' + CHAIN_INFO[chainId ?? 1].nativeSymbol, data: '0' },
        ]}
      />

      <InputWithSelect
        title={'Attenuation Factor'}
        defaultValue={attenuationFactor}
        onCheck={handleInvalidInput}
        onChange={setAttenuationFactor}
        isNumber
        min={0}
        max={100}
        unit={'%'}
        datalist={[
          { title: '80 %', data: '80' },
          { title: '70 %', data: '70' },
          { title: '60 %', data: '60' },
        ]}
      />
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
        The offer incentives in the protocol are issued at quotation block intervals. This parameter sets the amount of
        offer per block in the absence of decay.
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
