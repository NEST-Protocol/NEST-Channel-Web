import {Stack, Button, Spacer, Input, Text, Divider, Skeleton, useToast, Box} from '@chakra-ui/react'
import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Web3Status from '../../components/Web3Status'
import { useActiveChannelList } from '../../hooks/useActiveChannelList'
import { useRecoilState, useRecoilValue } from 'recoil'
import { activeChannelIdAtom, activeChannelInfoAtom, ChannelInfo } from '../../state/Summary'
import { useActiveWeb3React } from '../../hooks/web3'
import { useToken } from '../../hooks/Tokens'

const WalletAndTokenList = () => {
  const navigate = useNavigate()
  const channelList = useActiveChannelList()
  const [searchText, setSearchText] = useState('')
  const { account } = useActiveWeb3React()
  const activeChannelInfo = useRecoilValue(activeChannelInfoAtom)
  const toast = useToast()

  const handleSearch = (channel: ChannelInfo) => {
    return channel.token0.toLowerCase().includes(searchText) || channel.token1.toLowerCase().includes(searchText)
  }

  return (
    <Stack bg={'white'} minW={'3xs'} h={'auto'} borderRadius={'20px'} p={'20px'} spacing={'24px'}>
      <Web3Status />

      <Input
        variant="filled"
        placeholder="Token Address"
        onChange={(e) => {
          setSearchText(e.target.value)
        }}
      />

      <Stack overflow={'scroll'} h={activeChannelInfo.governance === account ? '490px' : '414px'}>
        {channelList.filter(handleSearch).map((channel) => (
          <ChannelListItem
            key={channel.channelId}
            channelId={channel.channelId}
            token0={channel.token0}
            token1={channel.token1}
          />
        ))}
      </Stack>
      <Spacer />
      <Button
        variant={'outline'}
        onClick={() => {
          if (account) {
            navigate('/create')
          } else {
            toast({
              position: "top",
              render: () => (
                <Box color='white' p={3} px={6} bg='primary.500' fontWeight={"bold"} borderRadius={"full"}>
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

type ChannelListItemProps = {
  channelId: string
  token0: string
  token1: string
}

const ChannelListItem: FC<ChannelListItemProps> = ({ ...props }) => {
  const { symbol: token0 } = useToken(props.token0)
  const { symbol: token1 } = useToken(props.token1)
  const [activeChannelId, setActiveChannelId] = useRecoilState(activeChannelIdAtom)

  return (
    <Stack>
      <Skeleton isLoaded={token0 !== 'NaN' && token1 !== 'NaN'}>
        <Text
          color={activeChannelId === props.channelId ? 'primary.500' : 'secondary.500'}
          fontWeight={'600'}
          cursor={'pointer'}
          onClick={() => {
            setActiveChannelId(props.channelId)
          }}
        >
          {props.channelId} : {token0} / {token1}
        </Text>
        <Divider color={'secondary.400'} />
      </Skeleton>
    </Stack>
  )
}

export default WalletAndTokenList
