import { Link, Spacer, Stack, Text, Wrap, WrapItem, Skeleton, Tooltip } from '@chakra-ui/react'
import { FC } from 'react'
import { ExplorerDataType, getExplorerLink } from '../../utils/getExplorerLink'
import { useActiveWeb3React } from '../../hooks/web3'
import { useActiveChannelInfo } from '../../hooks/useActiveChannelInfo'
import { isAddress, shortenAddress } from '../../utils'
import { PROCESSING } from '../../constants/misc'
import { CHAIN_INFO } from '../../constants/chains'
import {formatNumber, parseToBigNumber} from '../../utils/bignumberUtil'
import { PUSD_ADDRESS } from '../../constants/addresses'
import { useToken } from '../../hooks/Tokens'
import {BigNumberish} from "@ethersproject/bignumber";

const Information = () => {
  const { chainId } = useActiveWeb3React()
  const { info, status } = useActiveChannelInfo()
  const { symbol: miningTokenSymbol } = useToken(info.pairs[1].target)
  return (
    <Stack bg={'white'} w={'full'} borderRadius={'20px'} p={'20px'}>
      <Text fontWeight={'bold'}>Information</Text>
      <Wrap justify={'space-between'}>
        <InformationDetail
          title={'ChannelId'}
          value={formatNumber(info.channelId)}
          loading={status === PROCESSING}
        />
        <InformationDetail
          title={'Number of Quotes'}
          value={formatNumber(info.pairs[1].sheetCount)}
          loading={status === PROCESSING}
        />
        <InformationDetail
          title={'Fee Balance'}
          value={formatNumber(parseToBigNumber(info.rewards).shiftedBy(-18))}
          unit={CHAIN_INFO[chainId ?? 1].nativeSymbol}
          loading={status === PROCESSING}
        />
        <InformationDetail
          title={'Standard Output'}
          value={formatNumber(parseToBigNumber(info.rewardPerBlock).shiftedBy(-18))}
          unit={miningTokenSymbol + '/Block'}
          loading={status === PROCESSING}
        />
        <InformationDetail
          title={'Total Mining Token'}
          value={formatNumber(parseToBigNumber(info.vault).shiftedBy(-18))}
          // unit={miningTokenSymbol}
          loading={status === PROCESSING}
        />
        <InformationDetail
          title={'Mining Token'}
          value={info.pairs[1].target}
          loading={status === PROCESSING}
          link={getExplorerLink(Number(chainId), info.pairs[1].target, ExplorerDataType.TOKEN)}
        />
        <InformationDetail
          title={'Initial Block'}
          value={formatNumber(info.genesisBlock)}
          loading={status === PROCESSING}
        />
        <InformationDetail
          title={'Quotation Fee'}
          value={formatNumber(info.postFeeUnit)}
          unit={CHAIN_INFO[chainId ?? 1].nativeSymbol}
          loading={status === PROCESSING}
        />
        <InformationDetail
          title={'Price Token'}
          value={info.token0}
          loading={status === PROCESSING}
          link={getExplorerLink(Number(chainId), info.token0, ExplorerDataType.TOKEN)}
        />
        <InformationDetail
          title={'Price Calling Fee'}
          value={formatNumber(parseToBigNumber(info.singleFee).shiftedBy(-4))}
          unit={CHAIN_INFO[chainId ?? 1].nativeSymbol}
          loading={status === PROCESSING}
        />
        <InformationDetail
          title={'Attenuation Factor'}
          value={formatNumber(parseToBigNumber(info.reductionRate).shiftedBy(-2))}
          unit={'%'}
          loading={status === PROCESSING}
        />
        <InformationDetail
          title={'Quotation Token'}
          value={info.pairs[1].target}
          loading={status === PROCESSING}
          link={getExplorerLink(Number(chainId), info.pairs[1].target ?? 'NaN', ExplorerDataType.TOKEN)}
        />
      </Wrap>
    </Stack>
  )
}

type InformationDetailProps = {
  title: string
  value: string | number | undefined | BigNumberish
  unit?: string
  link?: string
  loading?: boolean
}

const InformationDetail: FC<InformationDetailProps> = ({ ...props }) => {
  const { symbol: symbolName } = useToken(isAddress(props.value) ? String(isAddress(props.value)) : PUSD_ADDRESS[1])

  if (props.value === undefined || props.loading) {
    return (
      <WrapItem>
        <Stack direction={'row'} w={'300px'}>
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
    <WrapItem>
      <Stack direction={'row'} w={'300px'}>
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
        {props.link ? (
          <Tooltip label={symbolName} bg={'white'} borderRadius={'full'} color={'black'}>
            <Link href={props.link} isExternal color={'link.500'} fontWeight={'bold'}>
              {shortenAddress(props.value.toString())} {props.unit}
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

export default Information
