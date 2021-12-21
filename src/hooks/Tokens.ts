import {useTokenContract} from "./useContract";
import {useCallback, useEffect, useState} from "react";

// 传入tokenAddress，输出Token Symbol
export function useTokenSymbol(validated: string): string {
  const tokenContract = useTokenContract(validated, false)
  const [symbol, setSymbol] = useState("NaN")

  const refresh = useCallback(()=>{
    if (!validated){
      setSymbol("NaN")
    }

    tokenContract?.symbol()
      .then(res=>{
        setSymbol(res)
      })
      .catch(_ => {
        setSymbol("Error!")
      })
  }, [tokenContract, validated])

  useEffect(()=>{
    refresh()
  }, [refresh, tokenContract, validated])

  return symbol
}



