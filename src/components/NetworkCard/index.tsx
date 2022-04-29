import { Badge, chakra, Stack, Tooltip } from '@chakra-ui/react'
import { useActiveWeb3React } from '../../hooks/web3'
import { CHAIN_INFO, SupportedChainId } from '../../constants/chains'
import tips from '../../assets/svg/tips_icon.svg'
import * as React from 'react'

export const NetworkCard = () => {
  const { chainId, library } = useActiveWeb3React()
  const info = chainId ? CHAIN_INFO[chainId] : undefined

  if (!chainId || !info || !library) {
    return null
  }

  return (
    <Tooltip
      label="This network is not supported, please switch the wallet network to The BSC Mainnet."
      fontSize={'sm'}
      fontWeight={600}
      boxShadow={'0px 0px 60px 0px #BFBFBF'}
      isDisabled={chainId === SupportedChainId.BSC}
      placement="bottom-end"
      p={'24px'}
      bg={'white'}
      color={"black"}
      borderRadius={'20px'}
    >
      <Stack direction={'row'} alignItems={'center'} spacing={0}>
        <chakra.img src={tips} w={'16px'} h={'16px'} hidden={chainId === SupportedChainId.BSC} />
        <Badge variant={'ghost'}>
          {info.label}
        </Badge>
      </Stack>
    </Tooltip>
  )
}

export default NetworkCard
