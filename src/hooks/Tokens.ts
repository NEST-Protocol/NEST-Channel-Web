import {useTokenContract} from "./useContract";
import {useEffect, useState} from "react";

// 传入tokenAddress，输出Token Name
export function useTokenName(validated: string): string {
  const tokenContract = useTokenContract(validated, false)
  const [name, setName] = useState("NaN")

  useEffect(()=>{
    tokenContract?.name()
      .then(res=>{
        setName(res)
      })
      .catch(_ => {
        setName("Error Token Address!")
      })
  }, [validated, tokenContract])

  return name
}



