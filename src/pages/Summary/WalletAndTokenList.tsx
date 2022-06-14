import {Stack, Button, Spacer, Input, Text, Divider, Skeleton, useToast, Box, useMediaQuery} from '@chakra-ui/react'
import {FC, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Web3Status from '../../components/Web3Status'
import {useActiveChannelList} from '../../hooks/useActiveChannelList'
import {useRecoilState, useRecoilValue} from 'recoil'
import {activeChannelIdAtom, activeChannelInfoAtom, ChannelInfo, channelListAtom} from '../../state/Summary'
import {useToken} from '../../hooks/Tokens'
import {IDLE} from '../../constants/misc'
import {useChannelInfo} from '../../hooks/useChannelInfo'
import {TokenName} from '../../components/InputWithTokenName'
import useActiveWeb3React from "../../hooks/useActiveWeb3React";

const WalletAndTokenList = () => {
  const navigate = useNavigate()
  const channelList = useActiveChannelList()
  const [searchText, setSearchText] = useState('')
  const {account} = useActiveWeb3React()
  const activeChannelInfo = useRecoilValue(activeChannelInfoAtom)
  const toast = useToast()
  const [isLargerThan1024] = useMediaQuery('(min-width: 1024px)')

  const handleSearch = (channel: ChannelInfo) => {
    let isQuoteToken = false
    channel.pairs.forEach((item) => {
      if (item !== undefined && item.toLowerCase().includes(searchText.toLowerCase())) {
        isQuoteToken = true
      }
    })

    return channel.token0.toLowerCase().includes(searchText.toLowerCase()) || isQuoteToken
  }

  return (
    <Stack bg={'white'} minW={'3xs'} h={'auto'} borderRadius={'12px'} px={'20px'} py={isLargerThan1024 ? '20px' : '24px'} spacing={'24px'} border={"1px solid"}
           borderColor={"secondary.300"} alignItems={"center"}>
      <Stack spacing={'24px'} w={isLargerThan1024 ? 'full' : '80%'}>
        <Web3Status/>

        <Input
          variant="filled"
          maxH={isLargerThan1024 ? '36px' : '44px'}
          placeholder="Token Address"
          fontSize={searchText === '' ? '15px' : '17px'}
          onChange={(e) => {
            setSearchText(e.target.value)
          }}
        />
      </Stack>

      <Stack overflow={'scroll'} h={isLargerThan1024 ? (activeChannelInfo.opener === account ? '600px' : '540px') : ''} w={'full'}>
        <Stack direction={'row'} fontSize={isLargerThan1024 ? 'sm' : 'md'} fontWeight={'semibold'} w={'full'} justifyContent={"space-around"}>
          <Text>Channel</Text>
          <Box>
            <Divider orientation={'vertical'}/>
          </Box>
          <Text>Price</Text>
          <Box>
            <Divider orientation={'vertical'}/>
          </Box>
          <Text>Quote</Text>
        </Stack>
        <Divider/>
        {channelList.filter(handleSearch).map(({channelId, token0, pairs}) => (
          <ChannelListItem key={channelId} channelId={channelId} token0={token0} pairs={pairs}/>
        ))}
      </Stack>
      <Spacer/>
      <Button
        variant={'outline'}
        isFullWidth={true}
        maxW={isLargerThan1024 ? 'full' : '80%'}
        h={isLargerThan1024 ? '40px' : '44px'}
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
  const {symbol: priceTokenSymbol, fetchStatus: priceStatus} = useToken(props.token0)
  const {info} = useChannelInfo(props.channelId)
  const [channelList, setChannelList] = useRecoilState(channelListAtom)
  useEffect(() => {
    const list = [...channelList]
    setChannelList(
      list.map((pair) =>
        pair.channelId === props.channelId
          ? {
            ...pair,
            pairs: info.pairs.map(({target}) => target),
          }
          : pair
      )
    )
    // eslint-disable-next-line
  }, [info.pairs, props.channelId, setChannelList])

  return (
    <Skeleton isLoaded={priceStatus === IDLE}>
      <Stack
        direction={'row'}
        alignItems={'center'}
        spacing={1}
        cursor={'pointer'}
        onClick={() => {
          setActiveChannelId(props.channelId)
        }}
      >
        <Text
          color={activeChannelId === props.channelId ? 'primary.500' : 'secondary.500'}
          fontWeight={600}
          whiteSpace={'nowrap'}
        >
          {props.channelId} / {priceTokenSymbol} /
        </Text>
        <Stack direction={'row'} w={'full'} spacing={1} overflow={'scroll'} alignItems={'center'}>
          {info.pairs.slice(0, 2).map((item) => (
            <TokenName
              address={item.target}
              color={activeChannelId === props.channelId ? 'primary.500' : 'secondary.500'}
            />
          ))}
          {info.pairs.length > 2 && (
            <Text color={activeChannelId === props.channelId ? 'primary.500' : 'secondary.500'}>...</Text>
          )}
        </Stack>
      </Stack>
      <Divider color={'secondary.400'}/>
    </Skeleton>
  )
}

export default WalletAndTokenList
