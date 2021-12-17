import {useTokenContract} from "./useContract";
import {useEffect, useState} from "react";

// 传入tokenAddress，输出Token Symbol
export function useTokenSymbol(validated: string): string {
  const tokenContract = useTokenContract(validated, false)
  const [symbol, setSymbol] = useState("NaN")

  useEffect(()=>{
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
  }, [validated, tokenContract])

  return symbol
}



