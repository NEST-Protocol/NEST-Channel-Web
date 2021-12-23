import { Contract } from '@ethersproject/contracts'

import ERC20_ABI from '../abis/erc20.json'
import NestOpenPlatform_ABI from '../abis/nestOpenPlatform.json'

import { useActiveWeb3React } from './web3'
import { getContract } from '../utils'
import { useMemo } from 'react'
import { Erc20, NestOpenPlatform } from '../abis/types'

// returns null on errors
export function useContract<T extends Contract = Contract>(
  addressOrAddressMap: string | { [chainId: number]: string } | undefined,
  ABI: any,
  withSignerIfPossible = true
): T | null {
  const { library, account, chainId } = useActiveWeb3React()

  return useMemo(() => {
    if (!addressOrAddressMap || !ABI || !library || !chainId) return null
    let address: string | undefined
    if (typeof addressOrAddressMap === 'string') address = addressOrAddressMap
    else address = addressOrAddressMap[chainId]
    if (!address) return null
    try {
      return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [addressOrAddressMap, ABI, library, chainId, withSignerIfPossible, account]) as T
}

export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean) {
  return useContract<Erc20>(tokenAddress, ERC20_ABI, withSignerIfPossible)
}

export function useNestOpenPlatformContract(address: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract<NestOpenPlatform>(address, NestOpenPlatform_ABI, withSignerIfPossible)
}
