import {activeChannelIdAtom} from "../state/Root";
import {useRecoilValue} from "recoil";

export const useChannelInfo = () => {

}

export const useActiveChannelInfo = () => {
  const activeChannelId = useRecoilValue(activeChannelIdAtom)

}

export default useChannelInfo