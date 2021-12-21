import {ChannelInfo, channelListAtom} from "../state/Root";
import {useRecoilState} from "recoil";
import {useEffect} from "react";
import Web3 from "web3"
import {useActiveWeb3React} from "./web3";
import {CHANNEL_OPEN_LOGS_FILTER} from "../constants/logs";

export const useChannelList = () => {
  const [channelList, setChannelList] = useRecoilState(channelListAtom)
  const web3 = new Web3(Web3.givenProvider)
  const { chainId ,library } = useActiveWeb3React()

  async function refresh() {
    try {
      let list: ChannelInfo[] = []
      const request = await fetch(CHANNEL_OPEN_LOGS_FILTER[chainId ?? 1].hostname +
        "/api?module=logs&action=getLogs" +
        "&fromBlock=" + CHANNEL_OPEN_LOGS_FILTER[chainId ?? 1].fromBlock +
        "&toBlock=" + CHANNEL_OPEN_LOGS_FILTER[chainId ?? 1].toBlock +
        "&address=" + CHANNEL_OPEN_LOGS_FILTER[chainId ?? 1].address +
        "&topic0=" + CHANNEL_OPEN_LOGS_FILTER[chainId ?? 1].topics[0] +
        "&apikey=" + process.env.REACT_APP_BSCSCAN_KEY ?? "YourApiKeyToken"
      )
      const data = await request.json()
      if (data.status === '1'){
        const logs = data.result
        if (logs){
          logs.forEach((res: any) => {
            // open (uint256 channelId, address token0, uint256 unit, address token1, address reward)
            const decodeParameters = web3.eth.abi.decodeParameters(['uint256', 'address', 'uint256', 'address', 'address'], res.data)
            const info: ChannelInfo = {
              channelId: decodeParameters[0],
              token0: decodeParameters[1],
              unit: decodeParameters[2],
              token1: decodeParameters[3],
              reward: decodeParameters[4],
            }
            list.push(info)
          })
        }
        setChannelList(list)
      }
    }catch (e){
      setChannelList([])
    }
  }

  useEffect(() => {
    refresh()
  }, [chainId, library])

  return channelList
}

export default useChannelList