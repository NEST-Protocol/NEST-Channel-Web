import {useNestOpenPlatformContract} from "./useContract";
import {NEST_OPEN_PLATFORM} from "../constants/addresses";
import {useActiveWeb3React} from "./web3";
import {useState} from "react";

export const useChannelInfo = (channelId: string) => {
  const {chainId} = useActiveWeb3React()
  const nestOpenPlatform = useNestOpenPlatformContract(NEST_OPEN_PLATFORM[chainId ?? 1], false)
  const [feeInfo, setFeeInfo] = useState('NaN')
  const [postFeeUnit, setPostFeeUnit] = useState('NaN')
  const [reductionRate, setReductionRate] = useState('NaN')
  const [reward, setReward] = useState('NaN')
  const [rewardPerBlock, setRewardPerBlock] = useState('NaN')
  const [sheetCount, setSheetCount] = useState('NaN')
  const [singleFee, setSingleFee] = useState('NaN')
  const [token0, setToken0] = useState('NaN')
  const [token1, setToken1] = useState('NaN')
  const [unit, setUnit] = useState('NaN')
  const [vault, setVault] = useState('NaN')
  const [genesisBlock, setGenesisBlock] = useState('NaN')

  if (nestOpenPlatform) {
    nestOpenPlatform.getChannelInfo(channelId).then((res: any)=>{
      console.log(res)
    })
  }

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