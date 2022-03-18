import {
  Stack,
  Button,
  Spacer,
  Input,
  Text,
  Divider,
  Skeleton,
  useToast,
  Box,
} from '@chakra-ui/react'
import {FC, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Web3Status from '../../components/Web3Status'
import {useActiveChannelList} from '../../hooks/useActiveChannelList'
import {useRecoilState, useRecoilValue} from 'recoil'
import {activeChannelIdAtom, activeChannelInfoAtom, ChannelInfo, channelListAtom} from '../../state/Summary'
import {useActiveWeb3React} from '../../hooks/web3'
import {useToken} from '../../hooks/Tokens'
import {IDLE} from "../../constants/misc";
import {useChannelInfo} from "../../hooks/useChannelInfo";

const WalletAndTokenList = () => {
  const navigate = useNavigate()
  const channelList = useActiveChannelList()
  const [searchText, setSearchText] = useState('')
  const {account} = useActiveWeb3React()
  const activeChannelInfo = useRecoilValue(activeChannelInfoAtom)
  const toast = useToast()

  const handleSearch = (channel: ChannelInfo) => {
    let isQuoteToken = false
    channel.pairs.forEach((item)=> {
      if (item !== undefined && item.toLowerCase().includes(searchText.toLowerCase())){
        isQuoteToken = true
      }
    })

    return channel.token0.toLowerCase().includes(searchText.toLowerCase()) || isQuoteToken
  }

  return (
    <Stack bg={'white'} minW={'3xs'} h={'auto'} borderRadius={'20px'} p={'20px'} spacing={'24px'}>
      <Web3Status/>

      <Input
        variant="filled"
        placeholder="Token Address"
        fontSize={searchText === '' ? '15px' : '17px'}
        onChange={(e) => {
          setSearchText(e.target.value)
        }}
      />

      <Stack overflow={'scroll'} h={activeChannelInfo.opener === account ? '490px' : '414px'}>
        <Stack direction={"row"} fontWeight={'bold'} fontSize={"xs"}>
          <Text>Channel</Text>
          <Divider orientation={"vertical"}/>
          <Text>Price</Text>
          <Divider orientation={"vertical"}/>
          <Text>Quote</Text>
        </Stack>
        <Divider/>
        {channelList.filter(handleSearch).map(({channelId, token0,pairs}) => (
          <ChannelListItem
            key={channelId}
            channelId={channelId}
            token0={token0}
            pairs={pairs}
          />
        ))}
      </Stack>
      <Spacer/>
      <Button
        variant={'outline'}
        onClick={() => {
          if (account) {
            navigate('/create')
          } else {
            toast({
              position: 'top',
              render: () => (
                <Box
                  color="white"
                  p={3}
                  px={6}
                  bg="primary.500"
                  textAlign={'center'}
                  fontWeight={'bold'}
                  borderRadius={'full'}
                >
                  Connect wallet first!
                </Box>
              ),
            })
          }
        }}
      >
        Create
      </Button>
    </Stack>
  )
}

const ChannelListItem: FC<ChannelInfo> = ({...props}) => {
  const [activeChannelId, setActiveChannelId] = useRecoilState(activeChannelIdAtom)
  const { symbol: priceTokenSymbol, fetchStatus: priceStatus } = useToken(props.token0)
  const { info } = useChannelInfo(props.channelId)
  const { symbol: quoteTokenSymbol, fetchStatus: quoteStatus } = useToken(info.pairs[0].target)
  const [channelList, setChannelList] = useRecoilState(channelListAtom)


  useEffect(()=>{
    const lists = [...channelList]
    setChannelList(lists.map((pair)=> pair.channelId === props.channelId ? {...pair, pairs: info.pairs.map(({target})=> target)} : pair))
  }, [info.pairs, props.channelId, setChannelList])

  return (
    <Stack>
      <Skeleton isLoaded={priceStatus === IDLE && quoteStatus === IDLE}>
        <Text
          color={activeChannelId === props.channelId ? 'primary.500' : 'secondary.500'}
          fontWeight={'600'}
          cursor={'pointer'}
          onClick={() => {
            setActiveChannelId(props.channelId)
          }}
        >
          { props.channelId } / { priceTokenSymbol } / { quoteTokenSymbol }{info.pairs.length >1 && '...'}
        </Text>
        <Divider color={'secondary.400'}/>
      </Skeleton>
    </Stack>
  )
}

export default WalletAndTokenList
