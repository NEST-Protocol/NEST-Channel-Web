import {useNestOpenPlatformContract} from "./useContract";
import {NEST_OPEN_PLATFORM_ADDRESS} from "../constants/addresses";
import {useActiveWeb3React} from "./web3";
import {useEffect, useState} from "react";
import {formatNumber, parseToBigNumber} from "../utils/bignumberUtil";
import {IDLE, IDLE_DELAY, PROCESSING} from "../constants/misc";

type ChannelInfo = {
  channelId: string
  feeInfo: string
  postFeeUnit: string | number
  reductionRate: string | number
  reward: string
  rewardPerBlock: string
  sheetCount: string
  singleFee: string | number
  token0: string
  token1: string
  unit: string
  vault: string
  genesisBlock: string | number
  governance: string
}

export const useChannelInfo = (channelId: string) => {
  const {chainId} = useActiveWeb3React()
  const nestOpenPlatform = useNestOpenPlatformContract(NEST_OPEN_PLATFORM_ADDRESS[chainId ?? 1], false)
  const [info, setInfo] = useState<ChannelInfo>()
  const [status, setStatus] = useState(IDLE)

  const fetch = async () => {
    if (nestOpenPlatform) {
      setStatus(PROCESSING)
      nestOpenPlatform.getChannelInfo(channelId).then((res: any)=>{
        const info: ChannelInfo = {
          channelId: channelId,
          // fee balance
          feeInfo: formatNumber(parseToBigNumber(res.feeInfo).shiftedBy(-18)),
          // quotation fee
          postFeeUnit: formatNumber(parseToBigNumber(res.postFeeUnit).shiftedBy(-4)),
          // attenuation factor:
          reductionRate: formatNumber(parseToBigNumber(res.reductionRate).shiftedBy(-2)),
          // mining token
          reward: res.reward,
          // standard output
          rewardPerBlock: formatNumber(parseToBigNumber(res.rewardPerBlock).shiftedBy(-18)),
          // number of quote
          sheetCount: formatNumber(parseToBigNumber(res.sheetCount)),
          // price calling fee
          singleFee: formatNumber(parseToBigNumber(res.singleFee).shiftedBy(-4)),
          // price token
          token0: res.token0,
          // quotation token
          token1: res.token1,
          unit: formatNumber(parseToBigNumber(res.unit).shiftedBy(-18)),
          vault: formatNumber(parseToBigNumber(res.vault).shiftedBy(-18)),
          genesisBlock: formatNumber(parseToBigNumber(res.genesisBlock)),
          governance: res.governance,
        }
        setInfo(info)
        setTimeout(()=>{
          setStatus(IDLE)
        }, IDLE_DELAY)
      })
    }
  }

  useEffect(()=>{
    fetch()
  }, [chainId, channelId])

  return {info, status}
}

export default useChannelInfo