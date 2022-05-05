import {Button, Menu, MenuButton, MenuItem, MenuList, useMediaQuery} from '@chakra-ui/react'
import {useActiveWeb3React} from '../../hooks/web3'
import {CHAIN_INFO, SupportedChainId} from '../../constants/chains'
import {BigNumber, utils} from 'ethers'
import * as React from 'react'

export const NetworkCard = () => {
  const {chainId, library} = useActiveWeb3React()
  const info = chainId ? CHAIN_INFO[chainId] : undefined
  const [isLargerThan1024] = useMediaQuery('(min-width: 1024px)')

  const menus = [
    {
      id: 'Rinkeby',
      chainId: SupportedChainId.RINKEBY,
      icon: chainId ? CHAIN_INFO[SupportedChainId.RINKEBY].logoUrl : undefined,
    },
    {
      id: 'BNB',
      chainId: SupportedChainId.BSC,
      icon: chainId ? CHAIN_INFO[SupportedChainId.BSC].logoUrl : undefined,
    },
    {
      id: 'BNB Testnet',
      chainId: SupportedChainId.BSCTestnet,
      icon: chainId ? CHAIN_INFO[SupportedChainId.BSCTestnet].logoUrl : undefined,
    },
    {
      id: 'KCC',
      chainId: SupportedChainId.KCC,
      icon: chainId ? CHAIN_INFO[SupportedChainId.KCC].logoUrl : undefined,
    }
  ]

  const select = (chainId: number) => {
    return async () => {
      const {ethereum} = window
      if (!ethereum || !ethereum.on) {
        return
      }
      const formattedChainId = utils.hexStripZeros(BigNumber.from(chainId).toHexString())
      try {
        await ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{chainId: formattedChainId}],
        })
      } catch (switchError) {
        if (chainId === 321) {
          try {
            await ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: '0x141',
                  chainName: 'KCC Mainnet network',
                  nativeCurrency: {
                    name: 'KCS',
                    symbol: 'KCS',
                    decimals: 18
                  },
                  rpcUrls: ['https://rpc-mainnet.kcc.network'],
                  blockExplorerUrls: ['https://explorer.kcc.io/']
                },
              ],
            });
          } catch (addError) {
            // handle "add" error
          }
        }
      }
    }
  }

  if (!chainId || !info || !library) {
    return null
  }

  return (
    <Menu autoSelect={false}>
      <MenuButton
        as={Button}
        bg={"white"}
        color={'primary.500'}
        _hover={{color: 'primary.500', bg: 'white'}}
        _active={{color: 'primary.500', bg: 'white'}}
        fontSize={isLargerThan1024 ? 'md' : 'xs'}
        fontWeight={'medium'}
        px={'20px'}
        leftIcon={<img src={info.logoUrl} alt={'logo'} width={'16px'} height={'16px'}/>}
      >
        {info.label}
      </MenuButton>
      <MenuList borderRadius={'12px'} borderColor={'secondary.300'}>
        {menus.map((item) => (
          <MenuItem
            key={item.id}
            px={'20px'}
            onClick={select(item.chainId)}
            fontWeight={'medium'}
            icon={<img src={item.icon} alt={'logo'} width={'16px'} height={'16px'}/>}
            isDisabled={item.chainId === chainId}
          >
            {item.id}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export default NetworkCard
