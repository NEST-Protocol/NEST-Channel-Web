import {useActiveWeb3React} from "./web3";
import {Token} from "@uniswap/sdk-core";
import {useMemo} from "react";
import {arrayify, parseBytes32String} from "ethers/lib/utils";
import {isAddress} from "../utils";
import {useBytes32TokenContract, useTokenContract} from "./useContract";

function useTokensFromMap(tokenMap: TokenAddressMap): { [address: string]: Token } {
  const { chainId } = useActiveWeb3React()

  return useMemo(() => {
    if (!chainId) return {}

    // reduce to just tokens
    return Object.keys(tokenMap[chainId] ?? {}).reduce<{ [address: string]: Token }>(
      (newMap, address) => {
        newMap[address] = tokenMap[chainId][address].token
        return newMap
      },
      {}
    )

  }, [chainId, tokenMap])
}

function useAllTokens(): { [address: string]: Token } {
  const allTokens = useCombinedActiveList()
  return useTokensFromMap(allTokens)
}

// parse a name or symbol from a token response
const BYTES32_REGEX = /^0x[a-fA-F0-9]{64}$/

function parseStringOrBytes32(str: string | undefined, bytes32: string | undefined, defaultValue: string): string {
  return str && str.length > 0
    ? str
    : // need to check for proper bytes string and valid terminator
    bytes32 && BYTES32_REGEX.test(bytes32) && arrayify(bytes32)[31] === 0
      ? parseBytes32String(bytes32)
      : defaultValue
}

export function useToken(tokenAddress: string | null): Token | undefined | null {
  const { chainId } = useActiveWeb3React()
  const tokens = useAllTokens()

  const address = isAddress(tokenAddress)
  const tokenContract = useTokenContract(address ? address : undefined, false)
  const tokenContractBytes32 = useBytes32TokenContract(address ? address : undefined, false)
  const token: Token | undefined = address ? tokens[address] : undefined

  // TODO

}

export default useToken