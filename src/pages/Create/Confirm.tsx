import {Divider, Link, Stack, Text, useMediaQuery} from '@chakra-ui/react'
import { FC, useEffect, useState } from 'react'
import { isAddress, shortenAddress } from '../../utils'
import { ExplorerDataType, getExplorerLink } from '../../utils/getExplorerLink'
import { useActiveWeb3React } from '../../hooks/web3'
import { useRecoilValue } from 'recoil'
import {
  attenuationFactorAtom,
  miningTokenAddressAtom,
  priceCallingFeeAtom,
  priceTokenNameAtom,
  priceTokenUnitAtom,
  quotationFeeAtom,
  quotationTokenListAtom,
  standardOutputAtom,
} from '../../state/Create/form'
import { PETH_ADDRESS, PUSD_ADDRESS } from '../../constants/addresses'
import { CHAIN_INFO } from '../../constants/chains'
import { TokenName } from '../../components/InputWithTokenName'

const Confirm = () => {
  const quotationTokenList = useRecoilValue(quotationTokenListAtom)
  const priceTokenName = useRecoilValue(priceTokenNameAtom)
  const miningTokenAddress = useRecoilValue(miningTokenAddressAtom)
  const priceTokenUnit = useRecoilValue(priceTokenUnitAtom)
  const standardOutput = useRecoilValue(standardOutputAtom)
  const quotationFee = useRecoilValue(quotationFeeAtom)
  const priceCallingFee = useRecoilValue(priceCallingFeeAtom)
  const attenuationFactor = useRecoilValue(attenuationFactorAtom)
  const [priceTokenAddress, setPriceTokenAddress] = useState('')
  const { chainId } = useActiveWeb3React()
  const [isLargerThan1024] = useMediaQuery('(min-width: 1024px)')

  useEffect(() => {
    if (priceTokenName === 'PETH') {
      setPriceTokenAddress(PETH_ADDRESS[chainId ?? 1])
    } else if (priceTokenName === 'PUSD') {
      setPriceTokenAddress(PUSD_ADDRESS[chainId ?? 1])
    } else {
      setPriceTokenAddress('Error')
    }
  }, [chainId, priceTokenName])

  return (
    <Stack pt={isLargerThan1024 ? '60px' : '30px'} pb={'30px'} w={isLargerThan1024 ? '600px' : 'full'} spacing={isLargerThan1024 ? '20px' : '10px'}>
      <ConfirmDetail title={`Price Token`} token={priceTokenAddress} />
      <ConfirmDetail
        title={`Quotation Token`}
        tokens={quotationTokenList.length === 0 ? ['NaN'] : quotationTokenList}
        invalid={quotationTokenList.length === 0}
      />
      <ConfirmDetail
        title={`Mining Token`}
        token={miningTokenAddress === '' ? 'NaN' : miningTokenAddress}
        invalid={miningTokenAddress === ''}
      />
      <ConfirmDetail
        title={'Price Token Unit'}
        value={priceTokenUnit}
        unit={priceTokenName}
        invalid={
          priceTokenName === 'PETH'
            ? priceTokenUnit !== '1' && priceTokenUnit !== '2' && priceTokenUnit !== '3'
            : priceTokenUnit !== '1000' && priceTokenUnit !== '2000' && priceTokenUnit !== '3000'
        }
      />
      <ConfirmDetail title={'Standard Output'} value={standardOutput} unit={'NEST/Block'} />
      <ConfirmDetail title={'Quotation Fee'} value={quotationFee} unit={CHAIN_INFO[chainId ?? 1].nativeSymbol} />
      <ConfirmDetail title={'Price Calling Fee'} value={priceCallingFee} unit={CHAIN_INFO[chainId ?? 1].nativeSymbol} />
      <ConfirmDetail
        title={'Attenuation Factor'}
        value={attenuationFactor === '' ? 'NaN' : attenuationFactor}
        unit={'%'}
      />
    </Stack>
  )
}

type ConfirmDetailProps = {
  title: string
  value?: string
  token?: string
  tokens?: string[]
  unit?: string
  invalid?: boolean
}

const ConfirmDetail: FC<ConfirmDetailProps> = ({ ...props }) => {
  const { chainId } = useActiveWeb3React()
  const [isLargerThan1024] = useMediaQuery('(min-width: 1024px)')

  return (
    <>
      <Stack direction={'row'} w={'full'} justifyContent={'space-between'}>
        <Text color={'secondary.500'} fontWeight={'semibold'} whiteSpace={"nowrap"}>
          {props.title}:
        </Text>

        {props.token && (
          <Stack direction={'row'} w={isLargerThan1024 ? '220px' : 'full'} justifyContent={'end'}>
            <TokenName address={props.token} hasParentheses={props.token !== 'NaN'} color={'secondary.500'} />
            <Link
              href={getExplorerLink(chainId || 1, props.token, ExplorerDataType.TOKEN)}
              isExternal
              color={!isAddress(props.token) || props.invalid ? 'primary.500' : 'link.500'}
              fontWeight={'semibold'}
              textAlign={"end"}
              minW={'100px'}
              whiteSpace={"nowrap"}
            >
              {shortenAddress(props.token, isLargerThan1024 ? 6 : 3)}
            </Link>
          </Stack>
        )}

        {props.tokens && (
          <Stack spacing={isLargerThan1024 ? '20px' : '10px'} w={isLargerThan1024 ? '220px' : 'full'} justifyContent={"end"}>
            {props.tokens.map((address, index) => (
              <Stack key={index} direction={'row'} w={'full'} justifyContent={'end'}>
                <TokenName address={address} hasParentheses={address !== 'NaN'} color={'secondary.500'} />
                <Link
                  href={getExplorerLink(chainId || 1, address, ExplorerDataType.TOKEN)}
                  isExternal
                  color={!isAddress(address) || props.invalid ? 'primary.500' : 'link.500'}
                  fontWeight={'semibold'}
                  minW={'100px'}
                  textAlign={"end"}
                  whiteSpace={"nowrap"}
                >
                  {shortenAddress(address, isLargerThan1024 ? 6 : 3)}
                </Link>
              </Stack>
            ))}
          </Stack>
        )}

        {props.value && (
          <Text fontWeight={'semibold'} color={props.value === 'NaN' || props.invalid ? 'primary.500' : 'black'}>
            {props.value} {props.unit}
          </Text>
        )}
      </Stack>
      { !isLargerThan1024 && (
        <Divider orientation={"horizontal"} />
      ) }
    </>
  )
}

export const ConfirmTip = () => {
  return <></>
}

export default Confirm
