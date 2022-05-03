import {Text, Stack, useMediaQuery} from '@chakra-ui/react'
import { useActiveWeb3React } from '../../hooks/web3'
import { CHAIN_INFO } from '../../constants/chains'
import * as React from 'react'

export const NetworkCard = () => {
  const { chainId, library } = useActiveWeb3React()
  const info = chainId ? CHAIN_INFO[chainId] : undefined
  const [isLargerThan1024] = useMediaQuery('(min-width: 1024px)')

  if (!chainId || !info || !library) {
    return null
  }

  return (
    <Stack direction={'row'} alignItems={'center'} spacing={0}>
      <Text variant={'ghost'} fontSize={isLargerThan1024 ? 'md' : 'xs'} fontWeight={'medium'}>
        {info.label}
      </Text>
    </Stack>
  )
}

export default NetworkCard
