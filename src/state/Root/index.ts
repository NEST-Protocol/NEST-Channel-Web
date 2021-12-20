import {atom} from "recoil";
import {ZERO_ADDRESS} from "../../constants/misc";

export const activeChannelIdAtom = atom({
  key: 'activeChannelId',
  default: "0",
})

export type ChannelInfo = {
  channelId: string,
  token0: string,
  unit: string,
  token1: string,
  reward: string,
}

type MoreChannelInfo = {
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

const defaultChannelList: ChannelInfo[] = []

export const channelListAtom = atom({
  key: 'channelList',
  default: defaultChannelList,
})

const defaultActiveChannelInfo: MoreChannelInfo = {
  channelId: 'NaN',
  feeInfo: 'NaN',
  postFeeUnit: 'NaN',
  reductionRate: 'NaN',
  reward: ZERO_ADDRESS,
  rewardPerBlock: 'NaN',
  sheetCount: 'NaN',
  singleFee: 'NaN',
  token0: ZERO_ADDRESS,
  token1: ZERO_ADDRESS,
  unit: 'NaN',
  vault: 'NaN',
  genesisBlock: 'NaN',
  governance: 'NaN',
}

export const activeChannelInfoAtom = atom({
  key: 'activeChannelInfo',
  default: defaultActiveChannelInfo,
})