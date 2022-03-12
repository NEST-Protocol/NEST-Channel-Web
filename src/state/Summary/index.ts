import { atom } from 'recoil'
import {PriceChannelViewStruct} from "../../abis/types/NestOpenPlatform";

export const activeChannelIdAtom = atom({
  key: 'activeChannelId',
  default: '0',
})

export type ChannelInfo = {
  channelId: string
  token0: string
  unit: string
  token1: string
  reward: string
}

const defaultChannelList: ChannelInfo[] = []

export const channelListAtom = atom({
  key: 'channelList',
  default: defaultChannelList,
})

const defaultActiveChannelInfo: PriceChannelViewStruct = {
  channelId: "NaN",
  token0: "NaN",
  unit: "NaN",
  reward: "NaN",
  rewardPerBlock: "NaN",
  vault: "NaN",
  rewards: "NaN",
  postFeeUnit: "NaN",
  count: "NaN",
  opener: "NaN",
  genesisBlock: "NaN",
  singleFee: "NaN",
  reductionRate: "NaN",
  pairs: [],
}

export const activeChannelInfoAtom = atom({
  key: 'activeChannelInfo',
  default: defaultActiveChannelInfo,
})
