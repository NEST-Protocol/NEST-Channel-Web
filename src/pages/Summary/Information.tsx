import {
  Link,
  Spacer,
  Stack,
  Text,
  Wrap,
  WrapItem,
  Skeleton,
  Tooltip,
  useMediaQuery,
  Divider,
} from '@chakra-ui/react'
import { FC } from 'react'
import { ExplorerDataType, getExplorerLink } from '../../utils/getExplorerLink'
import { useChannelInfo } from '../../hooks/useChannelInfo'
import { isAddress, shortenAddress } from '../../utils'
import { PROCESSING } from '../../constants/misc'
import { CHAIN_INFO } from '../../constants/chains'
import { formatNumber, parseToBigNumber } from '../../utils/bignumberUtil'
import { PUSD_ADDRESS } from '../../constants/addresses'
import { useToken } from '../../hooks/Tokens'
import { BigNumberish } from '@ethersproject/bignumber'
import TokenIcon from '../../components/TokenIcon'
import { useRecoilValue } from 'recoil'
import { activeChannelIdAtom } from '../../state/Summary'
import useActiveWeb3React from "../../hooks/useActiveWeb3React";

const Information = () => {
  const { chainId } = useActiveWeb3React()
  const channelId = useRecoilValue(activeChannelIdAtom)
  const { info, status } = useChannelInfo(channelId)
  const { symbol: miningTokenSymbol } = useToken(info.reward)
  const { symbol: priceTokenSymbol } = useToken(info.token0)
  const [isLargerThan1024] = useMediaQuery('(min-width: 1024px)')

  return (
    <Stack bg={'white'} w={'full'} borderRadius={'12px'} p={'20px'} border={"1px solid"} borderColor={"secondary.300"}>
      <Text fontWeight={'semibold'} hidden={!isLargerThan1024}>Information</Text>
      <Wrap justify={'space-between'}>
        <InformationDetail title={'ChannelId'} value={formatNumber(info.channelId)} loading={status === PROCESSING} />
        { !isLargerThan1024 && (
          <Divider />
        ) }
        <InformationDetail title={'Price Token'} value={info.token0} loading={status === PROCESSING} isToken />
        { !isLargerThan1024 && (
          <Divider />
        ) }
        <InformationDetail
          title={'Price Token Unit'}
          value={formatNumber(parseToBigNumber(info.unit).shiftedBy(-18))}
          loading={status === PROCESSING}
          unit={priceTokenSymbol}
        />
        { !isLargerThan1024 && (
          <Divider />
        ) }
        <InformationDetail title={'Mining Token'} value={info.reward} loading={status === PROCESSING} isToken />
        { !isLargerThan1024 && (
          <Divider />
        ) }
        <InformationDetail
          title={'Standard Output'}
          value={formatNumber(parseToBigNumber(info.rewardPerBlock).shiftedBy(-18))}
          unit={miningTokenSymbol + '/Block'}
          loading={status === PROCESSING}
        />
        { !isLargerThan1024 && (
          <Divider />
        ) }
        <InformationDetail
          title={'Attenuation Factor'}
          value={formatNumber(parseToBigNumber(info.reductionRate).shiftedBy(-2))}
          unit={'%'}
          loading={status === PROCESSING}
        />
        { !isLargerThan1024 && (
          <Divider />
        ) }
        <InformationDetail
          title={'Initial Block'}
          value={formatNumber(info.genesisBlock)}
          loading={status === PROCESSING}
        />
        { !isLargerThan1024 && (
          <Divider />
        ) }
        <InformationDetail
          title={'Number of Quotes'}
          value={formatNumber(
            info.pairs.reduce((prev, next) => prev + parseToBigNumber(next.sheetCount).toNumber(), 0)
          )}
          loading={status === PROCESSING}
        />
        { !isLargerThan1024 && (
          <Divider />
        ) }
        <InformationDetail
          title={'Total Mining Token'}
          value={formatNumber(parseToBigNumber(info.vault).shiftedBy(-18))}
          // unit={miningTokenSymbol}
          loading={status === PROCESSING}
        />
        { !isLargerThan1024 && (
          <Divider />
        ) }
        <InformationDetail
          title={'Quotation Fee'}
          value={formatNumber(info.postFeeUnit)}
          unit={CHAIN_INFO[chainId ?? 1].nativeSymbol}
          loading={status === PROCESSING}
        />
        { !isLargerThan1024 && (
          <Divider />
        ) }
        <InformationDetail
          title={'Price Calling Fee'}
          value={formatNumber(parseToBigNumber(info.singleFee).shiftedBy(-4))}
          unit={CHAIN_INFO[chainId ?? 1].nativeSymbol}
          loading={status === PROCESSING}
        />
        { !isLargerThan1024 && (
          <Divider />
        ) }
        <InformationDetail
          title={'Fee Balance'}
          value={formatNumber(parseToBigNumber(info.rewards).shiftedBy(-18))}
          unit={CHAIN_INFO[chainId ?? 1].nativeSymbol}
          loading={status === PROCESSING}
        />
        { !isLargerThan1024 && (
          <Divider />
        ) }
        <QuotationTokenList value={info.pairs} loading={status === PROCESSING} />
      </Wrap>
    </Stack>
  )
}

type InformationDetailProps = {
  title: string
  value: string | number | undefined | BigNumberish
  unit?: string
  loading?: boolean
  isToken?: boolean
}

const InformationDetail: FC<InformationDetailProps> = ({ ...props }) => {
  const { symbol: symbolName } = useToken(isAddress(props.value) ? String(isAddress(props.value)) : PUSD_ADDRESS[1])
  const { chainId } = useActiveWeb3React()
  const [isLargerThan1024] = useMediaQuery('(min-width: 1024px)')

  if (props.value === undefined || props.loading) {
    return (
      <WrapItem w={isLargerThan1024 ? '300px' : 'full'}>
        <Stack direction={'row'} w={'full'}>
          <Text color={'secondary.500'} fontWeight={'600'} whiteSpace={'nowrap'}>
            {props.title}
          </Text>
          <Spacer />
          <Skeleton w={'100px'} />
        </Stack>
      </WrapItem>
    )
  }

  return (
    <WrapItem w={isLargerThan1024 ? '300px' : 'full'}>
      <Stack direction={'row'} w={'full'}>
        <Text
          color={'secondary.500'}
          fontWeight={'600'}
          whiteSpace={'nowrap'}
          overflow={'hidden'}
          textOverflow={'ellipsis'}
          w={'200px'}
        >
          {props.title}
        </Text>
        <Spacer />
        {props.isToken ? (
          <Tooltip
            label={shortenAddress(String(props.value))}
            bg={'white'}
            borderRadius={'full'}
            color={'link.500'}
            whiteSpace={'nowrap'}
          >
            <Link
              href={getExplorerLink(Number(chainId), String(props.value), ExplorerDataType.TOKEN)}
              isExternal
              color={'link.600'}
              fontWeight={'bold'}
            >
              <Stack direction={'row'} alignItems={'center'}>
                <TokenIcon address={String(props.value)} />
                <Text>{symbolName}</Text>
              </Stack>
            </Link>
          </Tooltip>
        ) : (
          <Text fontWeight={'bold'} whiteSpace={'nowrap'} textOverflow={'ellipsis'}>
            {props.value} {props.unit}
          </Text>
        )}
      </Stack>
    </WrapItem>
  )
}

type QuotationTokenItemProps = {
  value: string
}

const QuotationTokenItem: FC<QuotationTokenItemProps> = ({ ...props }) => {
  const { symbol: symbolName } = useToken(isAddress(props.value) ? String(isAddress(props.value)) : PUSD_ADDRESS[1])
  return (
    <Stack direction={'row'} alignItems={'center'} minW={'80px'}>
      <TokenIcon address={props.value} />
      <Text>{symbolName}</Text>
    </Stack>
  )
}

type QuotationTokenListProps = {
  loading?: boolean
  value: any[]
}

const QuotationTokenList: FC<QuotationTokenListProps> = ({ ...props }) => {
  const { chainId } = useActiveWeb3React()

  if (props.value === undefined || props.loading) {
    return (
      <WrapItem>
        <Stack direction={'row'} w={'300px'}>
          <Text color={'secondary.500'} fontWeight={'600'} whiteSpace={'nowrap'}>
            Quotation Token
          </Text>
          <Spacer />
          <Skeleton w={'100px'} />
        </Stack>
      </WrapItem>
    )
  }

  return (
    <Stack direction={'row'} w={'full'}>
      <Text
        color={'secondary.500'}
        fontWeight={'600'}
        whiteSpace={'nowrap'}
        overflow={'hidden'}
        textOverflow={'ellipsis'}
        minW={'180px'}
      >
        Quotation Token
      </Text>
      <Stack spacing={'20px'} direction={'row'} overflowX={'scroll'}>
        {props.value.map((item, index) => (
          <Tooltip
            key={index}
            label={shortenAddress(String(item.target))}
            bg={'white'}
            borderRadius={'full'}
            color={'link.500'}
            whiteSpace={'nowrap'}
          >
            <Link
              href={getExplorerLink(Number(chainId), item.target ?? 'NaN', ExplorerDataType.TOKEN)}
              isExternal
              color={'link.600'}
              fontWeight={'bold'}
            >
              <QuotationTokenItem value={item.target} />
            </Link>
          </Tooltip>
        ))}
      </Stack>
      <Spacer />
      <Stack>{props.value.length >= 8 && <Text>...</Text>}</Stack>
    </Stack>
  )
}

export default Information
