import {useNestOpenPlatformContract} from "./useContract";
import {NEST_OPEN_PLATFORM_ADDRESS} from "../constants/addresses";
import {useActiveWeb3React} from "./web3";
import {useEffect, useState} from "react";
import {parseToBigNumber} from "../utils/bignumberUtil";
import {IDLE, IDLE_DELAY, PROCESSING} from "../constants/misc";
import {useRecoilState} from "recoil";
import {activeChannelInfoAtom} from "../state/Root";

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
  const [info, setInfo] = useRecoilState(activeChannelInfoAtom)
  const [status, setStatus] = useState(IDLE)

  const refresh = async () => {
    if (nestOpenPlatform) {
      setStatus(PROCESSING)
      const res = await nestOpenPlatform.getChannelInfo(channelId)
      const info: ChannelInfo = {
        channelId: channelId,
        // fee balance
        feeInfo: parseToBigNumber(res.feeInfo).shiftedBy(-18).toString(),
        // quotation fee
        postFeeUnit: parseToBigNumber(res.postFeeUnit).shiftedBy(-4).toString(),
        // attenuation factor:
        reductionRate: parseToBigNumber(res.reductionRate).shiftedBy(-2).toString(),
        // mining token
        reward: res.reward,
        // standard output
        rewardPerBlock: parseToBigNumber(res.rewardPerBlock).shiftedBy(-18).toString(),
        // number of quote
        sheetCount: parseToBigNumber(res.sheetCount).toString(),
        // price calling fee
        singleFee: parseToBigNumber(res.singleFee).shiftedBy(-4).toString(),
        // price token
        token0: res.token0,
        // quotation token
        token1: res.token1,
        unit: parseToBigNumber(res.unit).shiftedBy(-18).toString(),
        vault: parseToBigNumber(res.vault).shiftedBy(-18).toString(),
        genesisBlock: parseToBigNumber(res.genesisBlock).toString(),
        governance: res.governance,
      }
      setInfo(info)
      setTimeout(()=>{
        setStatus(IDLE)
      }, IDLE_DELAY)
    }
  }

  useEffect(()=>{
    refresh()
  }, [chainId, channelId])

  return {info, status, refresh}
}

export default useChannelInfo