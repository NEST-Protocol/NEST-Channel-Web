import { useNestOpenPlatformContract } from './useContract'
import { useCallback, useEffect, useState } from 'react'
import { IDLE, IDLE_DELAY, PROCESSING } from '../constants/misc'
import { useRecoilState, useRecoilValue } from 'recoil'
import { activeChannelIdAtom, activeChannelInfoAtom } from '../state/Summary'

export const useActiveChannelInfo = () => {
  const channelId = useRecoilValue(activeChannelIdAtom)
  const nestOpenPlatform = useNestOpenPlatformContract(false)
  const [info, setInfo] = useRecoilState(activeChannelInfoAtom)
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
