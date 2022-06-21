import { atom } from 'recoil'
import { PriceChannelViewStruct } from '../../abis/types/NestOpenPlatform'

export const activeChannelIdAtom = atom({
  key: 'activeChannelId',
  default: '0',
})

export const channelListAtom = atom<PriceChannelViewStruct[]>({
  key: 'channelList',
  default: [],
})

export const defaultChannelInfo: PriceChannelViewStruct = {
  channelId: '0',
  token0: 'NaN',
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
  pairs: [],
}

export const activeChannelInfoAtom = atom({
  key: 'activeChannelInfo',
  default: defaultChannelInfo,
})
