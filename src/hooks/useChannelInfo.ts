import {useNestOpenPlatformContract} from "./useContract";
import {NEST_OPEN_PLATFORM} from "../constants/addresses";
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
}

export const useChannelInfo = (channelId: string) => {
  const {chainId} = useActiveWeb3React()
  const nestOpenPlatform = useNestOpenPlatformContract(NEST_OPEN_PLATFORM[chainId ?? 1], false)
  const [info, setInfo] = useState<ChannelInfo>()
  const [status, setStatus] = useState(IDLE)

  const fetch = async () => {
    if (nestOpenPlatform) {
      setStatus(PROCESSING)
      nestOpenPlatform.getChannelInfo(channelId).then((res: any)=>{
        const info: ChannelInfo = {
          channelId: channelId,
          feeInfo: formatNumber(parseToBigNumber(res.feeInfo).shiftedBy(-18)),
          postFeeUnit: formatNumber(parseToBigNumber(res.postFeeUnit).shiftedBy(-4)),
          reductionRate: formatNumber(parseToBigNumber(res.reductionRate).shiftedBy(-2)),
          reward: res.reward,
          rewardPerBlock: formatNumber(parseToBigNumber(res.rewardPerBlock).shiftedBy(-18)),
          sheetCount: parseToBigNumber(res.sheetCount).toFixed(0),
          singleFee: formatNumber(parseToBigNumber(res.singleFee).shiftedBy(-4)),
          token0: res.token0,
          token1: res.token1,
          unit: res.unit.toString(),
          vault: res.vault.toString(),
          genesisBlock: res.genesisBlock,
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