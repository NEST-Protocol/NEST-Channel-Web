import {Text, useMediaQuery, MenuList, MenuButton, Menu, MenuItem} from '@chakra-ui/react'
import { useActiveWeb3React } from '../../hooks/web3'
import { CHAIN_INFO } from '../../constants/chains'
import * as React from 'react'

export const NetworkCard = () => {
  const { chainId, library } = useActiveWeb3React()
  const info = chainId ? CHAIN_INFO[chainId] : undefined
  const [isLargerThan1024] = useMediaQuery('(min-width: 1024px)')

  const menus = [
    {
      id: 'Rinkeby',
      chainId: '0x4',
    },
    {
      id: 'BNB',
      chainId: '0x38',
    },
    {
      id: 'BNB Testnet',
      chainId: '0x61',
    },
    {
      id: 'KCC',
      chainId: '0x141'
    }
  ]

  const select = (id: string) => {
    return async () => {
      const { ethereum } = window
      if (!ethereum || !ethereum.on) {
        return
      }
      try {
        await ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: id }],
        })
      } catch (switchError) {
        console.log(switchError)
      }
    }
  }

  if (!chainId || !info || !library) {
    return null
  }

  return (
    <Menu>
      <MenuButton>
        <Text variant={'ghost'} fontSize={isLargerThan1024 ? 'md' : 'xs'} fontWeight={'medium'}>
          {info.label}
        </Text>
      </MenuButton>
      <MenuList>
        { menus.map((item)=> (
          <MenuItem key={item.id} onClick={select(item.chainId)} fontWeight={'medium'}>{item.id}</MenuItem>
        )) }
      </MenuList>
    </Menu>
  )
}

export default NetworkCard
