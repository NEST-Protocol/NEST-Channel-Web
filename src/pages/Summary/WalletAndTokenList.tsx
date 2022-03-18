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
import {FC, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Web3Status from '../../components/Web3Status'
import {useActiveChannelList} from '../../hooks/useActiveChannelList'
import {useRecoilState, useRecoilValue} from 'recoil'
import {activeChannelIdAtom, activeChannelInfoAtom, ChannelInfo} from '../../state/Summary'
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
    return channel.token0.toLowerCase().includes(searchText.toLowerCase()) || channel.reward.toLowerCase().includes(searchText.toLowerCase())
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
        {channelList.filter(handleSearch).map(({channelId, token0, reward,quoteTokens}) => (
          <ChannelListItem
            key={channelId}
            channelId={channelId}
            token0={token0}
            reward={reward}
            quoteTokens={quoteTokens}
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
  // const { symbol: rewardTokenSymbol, fetchStatus: rewardStatus } = useToken(props.reward)
  const { info } = useChannelInfo(props.channelId)
  const { symbol: quoteTokenSymbol, fetchStatus: quoteStatus } = useToken(info.pairs[0].target)

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
