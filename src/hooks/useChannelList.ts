import {ChannelInfo, channelListAtom} from "../state/Root";
import {useRecoilState} from "recoil";
import {useEffect} from "react";
import Web3 from "web3"

export const useChannelList = () => {
  const [channelList, setChannelList] = useRecoilState(channelListAtom)
  const web3 = new Web3(Web3.givenProvider)

  async function fetchList() {
    const request = await fetch("https://api-rinkeby.etherscan.io/api?module=logs&action=getLogs" +
      "&fromBlock=9572136" +
      "&toBlock=latest" +
      "&address=0x638461f3ae49ccc257ef49fe76cce5816a9234ef" +
      "&topic0=0xde1433d3525be2096f0e9653e6f408254f9a4b2975bbb4415d2afcd24182fb53" +
      "&apikey=AGBK2NRNI82G789P1QCSZNR7RK8UG2F8WV")
    const data = await request.json()
    if (data.status === "1") {
      let list: ChannelInfo[] = []
      data.result.forEach((res: any) => {
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
      setChannelList(list)

    } else {
      setChannelList([])
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return channelList
}

export default useChannelList