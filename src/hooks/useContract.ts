import { Contract } from '@ethersproject/contracts'

import ERC20_ABI from '../abis/erc20.json'
import ERC20_BYTES32_ABI from '../abis/erc20_bytes32.json'
import EIP_2612 from '../abis/eip_2612.json'
import NestOpenPlatform_ABI from '../abis/nestOpenPlatform.json'
import NestBatchPlatform2_ABI from '../abis/nestBatchPlatform2.json'
import NestLedger_ABI from '../abis/nestLedger.json'
import NestGovernance_ABI from '../abis/nestGovernance.json'

import { useActiveWeb3React } from './web3'
import { getContract } from '../utils'
import { useMemo } from 'react'
import { Erc20, NestOpenPlatform, NestBatchPlatform2, NestGovernance, NestLedger } from '../abis/types'

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

export function useBytes32TokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible)
}

export function useEIP2612Contract(tokenAddress?: string): Contract | null {
  return useContract(tokenAddress, EIP_2612, false)
}

export function useNestOpenPlatformContract(address: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract<NestOpenPlatform>(address, NestOpenPlatform_ABI, withSignerIfPossible)
}

export function useNestBatchPlatform2Contract(address: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract<NestBatchPlatform2>(address, NestBatchPlatform2_ABI, withSignerIfPossible)
}

export function useNestLedgerContract(address: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract<NestLedger>(address, NestLedger_ABI, withSignerIfPossible)
}

export function useNestGovernanceContract(address: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract<NestGovernance>(address, NestGovernance_ABI, withSignerIfPossible)
}
