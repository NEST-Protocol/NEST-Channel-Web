import { Stack, Button, Spacer, Input, Text, Divider } from '@chakra-ui/react'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import Web3Status from '../../components/Web3Status'

const WalletAndTokenList = () => {
  const navigate = useNavigate()

  return (
    <Stack bg={'white'} minW={'3xs'} h={'auto'} borderRadius={'2xl'} p={'20px'} spacing={'24px'}>
      <Web3Status />

      <Input variant="filled" placeholder="Token Address" />

      <Stack>
        <TokenListItem id={1} token1={'NEST'} token2={'USDT'} count={8} />
        <TokenListItem id={2} token1={'NEST'} token2={'USDT'} count={8} />
        <TokenListItem id={3} token1={'NEST'} token2={'USDT'} count={8} />
      </Stack>

      <Spacer />
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

type TokenListItemProps = {
  id: number
  token1: string
  token2: string
  count: number
}

const TokenListItem: FC<TokenListItemProps> = ({ ...props }) => {
  return (
    <Stack>
      <Stack direction={'row'}>
        <Text color={'secondary.500'} fontWeight={'600'}>
          {props.id} : {props.token1} {props.token2}
        </Text>
        <Spacer />
        <Text color={'secondary.500'} fontWeight={'600'}>
          {props.count}
        </Text>
      </Stack>
      <Divider color={'secondary.400'} />
    </Stack>
  )
}

export default WalletAndTokenList
