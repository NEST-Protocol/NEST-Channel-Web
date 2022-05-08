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
      id: 'Ethereum',
      chainId: SupportedChainId.MAINNET,
      icon: chainId ? CHAIN_INFO[SupportedChainId.MAINNET].logoUrl : undefined,
    },
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
        // @ts-ignore
        if (switchError.code === 4902) {
          if (chainId === SupportedChainId.KCC) {
            try {
              await ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainId: utils.hexStripZeros(BigNumber.from(SupportedChainId.KCC).toHexString()),
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
          else if (chainId === SupportedChainId.BSC) {
            try {
              await ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainId: utils.hexStripZeros(BigNumber.from(SupportedChainId.BSC).toHexString()),
                    chainName: 'BSC',
                    nativeCurrency: {
                      name: 'BNB',
                      symbol: 'BNB',
                      decimals: 18
                    },
                    rpcUrls: ['https://bsc-dataseed.binance.org/'],
                    blockExplorerUrls: ['https://bscscan.com']
                  },
                ],
              });
            } catch (addError) {
              // handle "add" error
            }
          }
          else if (chainId === SupportedChainId.BSCTestnet) {
            try {
              await ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainId: utils.hexStripZeros(BigNumber.from(SupportedChainId.BSCTestnet).toHexString()),
                    chainName: 'BSC Testnet',
                    nativeCurrency: {
                      name: 'BNB',
                      symbol: 'BNB',
                      decimals: 18
                    },
                    rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
                    blockExplorerUrls: ['https://testnet.bscscan.com/']
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
