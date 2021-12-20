import {useNestOpenPlatformContract} from "./useContract";
import {NEST_OPEN_PLATFORM} from "../constants/addresses";
import {useActiveWeb3React} from "./web3";
import {useEffect, useState} from "react";
import useInterval from "@use-it/interval";
import {formatNumber, parseToBigNumber} from "../utils/bignumberUtil";

export const useChannelInfo = (channelId: string) => {
  const {chainId} = useActiveWeb3React()
  const nestOpenPlatform = useNestOpenPlatformContract(NEST_OPEN_PLATFORM[chainId ?? 1], false)
  const [feeInfo, setFeeInfo] = useState('NaN')
  const [postFeeUnit, setPostFeeUnit] = useState<string | number>('NaN')
  const [reductionRate, setReductionRate] = useState<string | number>('NaN')
  const [reward, setReward] = useState('NaN')
  const [rewardPerBlock, setRewardPerBlock] = useState('NaN')
  const [sheetCount, setSheetCount] = useState('NaN')
  const [singleFee, setSingleFee] = useState<string | number>('NaN')
  const [token0, setToken0] = useState('NaN')
  const [token1, setToken1] = useState('NaN')
  const [unit, setUnit] = useState('NaN')
  const [vault, setVault] = useState('NaN')
  const [genesisBlock, setGenesisBlock] = useState<string | number>('NaN')

  const fetch = async () => {
    if (nestOpenPlatform) {
      nestOpenPlatform.getChannelInfo(channelId).then((res: any)=>{
        setFeeInfo(formatNumber(parseToBigNumber(res.feeInfo).shiftedBy(-18)))
        setGenesisBlock(res.genesisBlock)
        setPostFeeUnit(formatNumber(parseToBigNumber(res.postFeeUnit).shiftedBy(-4)))
        setReductionRate(formatNumber(parseToBigNumber(res.reductionRate).shiftedBy(-2)))
        setReward(res.reward)
        setRewardPerBlock(formatNumber(parseToBigNumber(res.rewardPerBlock).shiftedBy(-18)))
        setSheetCount(parseToBigNumber(res.sheetCount).toFixed(0))
        setSingleFee(formatNumber(parseToBigNumber(res.singleFee).shiftedBy(-4)))
        setToken0(res.token0)
        setToken1(res.token1)
        setUnit(res.unit.toString())
        setVault(res.vault.toString())
      })
    }
  }

  useEffect(()=>{
    fetch()
  }, [chainId])
  useInterval(fetch, 3000)

  return {
    channelId,
    feeInfo,
    postFeeUnit,
    reductionRate,
    reward,
    rewardPerBlock,
    sheetCount,
    singleFee,
    token0,
    token1,
    unit,
    vault,
    genesisBlock
  }
}

export default useChannelInfo