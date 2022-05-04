import {Text, useMediaQuery, MenuList, MenuButton, Menu, MenuItem, Stack} from '@chakra-ui/react'
import { useActiveWeb3React } from '../../hooks/web3'
import { CHAIN_INFO } from '../../constants/chains'
import * as React from 'react'
import ETH from '../../assets/svg/ETH.svg'
import KCC from '../../assets/svg/KCC.svg'
import BNB from '../../assets/svg/BNB.svg'

export const NetworkCard = () => {
  const { chainId, library } = useActiveWeb3React()
  const info = chainId ? CHAIN_INFO[chainId] : undefined
  const [isLargerThan1024] = useMediaQuery('(min-width: 1024px)')

  const menus = [
    {
      id: 'Rinkeby',
      chainId: '0x4',
      icon: ETH,
    },
    {
      id: 'BNB',
      chainId: '0x38',
      icon: BNB,
    },
    {
      id: 'BNB Testnet',
      chainId: '0x61',
      icon: BNB,
    },
    {
      id: 'KCC',
      chainId: '0x141',
      icon: KCC,
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
          <MenuItem key={item.id} onClick={select(item.chainId)} fontWeight={'medium'}>
            <Stack direction={"row"} alignItems={"center"}>
              <img src={item.icon} alt={'logo'} width={'16px'} height={'16px'}/>
              <Text>{item.id}</Text>
            </Stack>
          </MenuItem>
        )) }
      </MenuList>
    </Menu>
  )
}

export default NetworkCard
