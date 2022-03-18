import { useNestOpenPlatformContract } from './useContract'
import { useCallback, useEffect, useState } from 'react'
import { IDLE, IDLE_DELAY, PROCESSING } from '../constants/misc'
import {defaultChannelInfo} from '../state/Summary'

export const useChannelInfo = (channelId: string) => {
  const nestOpenPlatform = useNestOpenPlatformContract(false)
  const [info, setInfo] = useState(defaultChannelInfo)
  const [status, setStatus] = useState(IDLE)

  const refresh = useCallback(async () => {
    if (nestOpenPlatform) {
      setStatus(PROCESSING)
      const res = await nestOpenPlatform.getChannelInfo(channelId)
      setInfo(res)
      setTimeout(() => {
        setStatus(IDLE)
      }, IDLE_DELAY)
    }
  }, [channelId, nestOpenPlatform, setInfo])

  useEffect(() => {
    refresh()
  }, [channelId, nestOpenPlatform, refresh, setInfo])

  return { info, status, refresh }
}
