import {Stack, Button, Spacer, Input, Text, Divider, Skeleton} from '@chakra-ui/react'
import {FC, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Web3Status from '../../components/Web3Status'
import {useTokenSymbol} from "../../hooks/Tokens";
import useChannelList from "../../hooks/useChannelList";
import {useRecoilState} from "recoil";
import {activeChannelIdAtom, ChannelInfo} from "../../state/Root";

const WalletAndTokenList = () => {
  const navigate = useNavigate()

  // TODO: get from blockchain
  const channelList = useChannelList()
  const [searchText, setSearchText] = useState('')

  const handleSearch = (channel: ChannelInfo) => {
    return channel.token0.toLowerCase().includes(searchText) || channel.token1.toLowerCase().includes(searchText)
  }

  return (
    <Stack bg={'white'} minW={'3xs'} h={'auto'} borderRadius={'2xl'} p={'20px'} spacing={'24px'}>
      <Web3Status/>

      <Input variant="filled" placeholder="Token Address" onChange={(e)=> {
        setSearchText(e.target.value)
      }}/>

      <Stack>
        {channelList.filter(handleSearch).map((channel) => (
          <ChannelListItem key={channel.channelId} channelId={channel.channelId} token0={channel.token0}
                           token1={channel.token1}/>
        ))}
      </Stack>

      <Spacer/>
      <Button
        variant={'outline'}
        onClick={() => {
          navigate('/create')
        }}
      >
        Create
      </Button>
    </Stack>
  )
}

type ChannelListItemProps = {
  channelId: string
  token0: string
  token1: string
}

const ChannelListItem: FC<ChannelListItemProps> = ({...props}) => {
  const token0 = useTokenSymbol(props.token0)
  const token1 = useTokenSymbol(props.token1)
  const [activeChannelId, setActiveChannelId] = useRecoilState(activeChannelIdAtom)

  return (
    <Stack>
      <Skeleton isLoaded={token0 !== "NaN" && token1 !== "NaN"}>
        <Text color={activeChannelId === props.channelId ? 'primary.500' : 'secondary.500'} fontWeight={'600'}
              cursor={"pointer"}
              onClick={() => {
                setActiveChannelId(props.channelId)
              }}
        >
          {props.channelId} : {token0} / {token1}
        </Text>
        <Divider color={'secondary.400'}/>
      </Skeleton>
    </Stack>
  )
}

export default WalletAndTokenList
