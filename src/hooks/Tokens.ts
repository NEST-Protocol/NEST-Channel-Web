import {isAddress} from "../utils";

// 传入tokenAddress，输出Token类
export function useTokenName(tokenAddress: string | null): string {
  const validated = isAddress(tokenAddress)
  if (!validated) { return "NaN" }
  return "PETH"
}



