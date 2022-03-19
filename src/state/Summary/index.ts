import { atom } from 'recoil'
import { PriceChannelViewStruct } from '../../abis/types/NestOpenPlatform'
import { PUSD_ADDRESS } from '../../constants/addresses'

export const activeChannelIdAtom = atom({
  key: 'activeChannelId',
  default: '0',
})

export type ChannelInfo = { channelId: string; token0: string; pairs: string[] }

const defaultChannelList: ChannelInfo[] = []

export const channelListAtom = atom({
  key: 'channelList',
  default: defaultChannelList,
})

export const defaultChannelInfo: PriceChannelViewStruct = {
  channelId: 'NaN',
  token0: PUSD_ADDRESS[0],
  unit: 'NaN',
  reward: 'NaN',
  rewardPerBlock: 'NaN',
  vault: 'NaN',
  rewards: 'NaN',
  postFeeUnit: 'NaN',
  count: 'NaN',
  opener: 'NaN',
  genesisBlock: 'NaN',
  singleFee: 'NaN',
  reductionRate: 'NaN',
  pairs: [{ target: PUSD_ADDRESS[0], sheetCount: 'NaN' }],
}

export const activeChannelInfoAtom = atom({
  key: 'activeChannelInfo',
  default: defaultChannelInfo,
})
