import { Link, Spacer, Stack, Text, Wrap, WrapItem } from '@chakra-ui/react'
import { FC } from 'react'
import { ExplorerDataType, getExplorerLink } from '../../utils/getExplorerLink'
import { useActiveWeb3React } from '../../hooks/web3'
import useChannelInfo from "../../hooks/useChannelInfo";
import {useRecoilValue} from "recoil";
import {activeChannelIdAtom} from "../../state/Root";
import {shortenAddress} from "../../utils";

const Information = () => {
  const { chainId } = useActiveWeb3React()
  const activeChannelId = useRecoilValue(activeChannelIdAtom)
  const info = useChannelInfo(activeChannelId)

  return (
    <Stack bg={'white'} w={'full'} borderRadius={'20px'} p={'20px'}>
      <Text fontWeight={'bold'}>Information</Text>
      <Wrap justify={'space-between'}>
        <InformationDetail title={'ChannelId'} value={info.channelId} />
        <InformationDetail title={'Number of Quotes'} value={info.sheetCount} />
        <InformationDetail title={'Fee Balance'} value={info.feeInfo} unit={'BNB'} />
        <InformationDetail title={'Standard Output'} value={info.rewardPerBlock} unit={'/Block'} />
        <InformationDetail title={'Total Mining Token'} value={info.vault} unit={'LYK'} />
        <InformationDetail
          title={'Mining Token'}
          value={info.reward}
          link={getExplorerLink(Number(chainId), info.reward, ExplorerDataType.TOKEN)}
        />
        <InformationDetail title={'Initial Block'} value={info.genesisBlock} />
        <InformationDetail title={'Quotation Fee'} value={0} />
        <InformationDetail
          title={'Price Token'}
          value={info.token1}
          link={getExplorerLink(Number(chainId), info.token1, ExplorerDataType.TOKEN)}
        />
        <InformationDetail title={'Price Calling Fee'} value={info.singleFee} unit={'BNB'} />
        <InformationDetail title={'Attenuation Factor'} value={info.reductionRate} unit={'%'} />
        <InformationDetail
          title={'Quotation Token'}
          value={info.token0}
          link={getExplorerLink(Number(chainId), info.token0, ExplorerDataType.TOKEN)}
        />
      </Wrap>
    </Stack>
  )
}

type InformationDetailProps = {
  title: string
  value: string | number
  unit?: string
  link?: string
}

const InformationDetail: FC<InformationDetailProps> = ({ ...props }) => {
  return (
    <WrapItem>
      <Stack direction={'row'} w={'300px'}>
        <Text color={'secondary.500'} fontWeight={'600'}>
          {props.title}
        </Text>
        <Spacer />
        {props.link ? (
          <Link href={props.link} isExternal color={'link.500'} fontWeight={'bold'}>
            {shortenAddress(props.value.toString())} {props.unit}
          </Link>
        ) : (
          <Text fontWeight={'bold'}>
            {props.value} {props.unit}
          </Text>
        )}
      </Stack>
    </WrapItem>
  )
}

export default Information
