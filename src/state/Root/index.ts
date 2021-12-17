import {atom} from "recoil";

export const activeChannelIdAtom = atom({
  key: 'activeChannelId',
  default: "0",
})

export type ChannelInfo = {
  channelId: string,
  token0: string,
  unit: string,
  token1: string,
  reward: string
}

const defaultChannelList: ChannelInfo[] = []

export const channelListAtom = atom({
  key: 'channelList',
  default: defaultChannelList,
})