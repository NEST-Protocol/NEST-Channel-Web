import { useNestOpenPlatformContract } from './useContract'
import { useCallback, useEffect, useState } from 'react'
import { IDLE, IDLE_DELAY, PROCESSING } from '../constants/misc'
import {activeChannelIdAtom, activeChannelInfoAtom} from '../state/Summary'
import {useRecoilState, useRecoilValue} from "recoil";

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
  }, [refresh])

  return { info, status, refresh }
}
