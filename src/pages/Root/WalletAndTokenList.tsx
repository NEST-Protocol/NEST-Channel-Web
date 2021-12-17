import {Stack, Button, Spacer, Input, Text, Divider} from '@chakra-ui/react'
import {FC} from 'react'
import {useNavigate} from 'react-router-dom'
import Web3Status from '../../components/Web3Status'
import {useTokenSymbol} from "../../hooks/Tokens";
import useChannelList from "../../hooks/useChannelList";
import {useRecoilState} from "recoil";
import {activeChannelIdAtom} from "../../state/Root";

const WalletAndTokenList = () => {
  const navigate = useNavigate()

  // TODO: get from blockchain
  const channelList = useChannelList()

  return (
    <Stack bg={'white'} minW={'3xs'} h={'auto'} borderRadius={'2xl'} p={'20px'} spacing={'24px'}>
      <Web3Status/>

      <Input variant="filled" placeholder="Token Address"/>

      <Stack>
        {channelList.map((channel) => (
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
  channelId: number
  token0: string
  token1: string
}

const ChannelListItem: FC<ChannelListItemProps> = ({...props}) => {
  const token0 = useTokenSymbol(props.token0)
  const token1 = useTokenSymbol(props.token1)
  const [activeChannelId, setActiveChannelId] = useRecoilState(activeChannelIdAtom)

  return (
    <Stack>
      <Text color={activeChannelId === props.channelId ? 'primary.500' : 'secondary.500'} fontWeight={'600'}
            cursor={"pointer"}
            onClick={() => {
              setActiveChannelId(props.channelId)
            }}
      >
        {props.channelId} : {token0} / {token1}
      </Text>
      <Divider color={'secondary.400'}/>
    </Stack>
  )
}

export default WalletAndTokenList
