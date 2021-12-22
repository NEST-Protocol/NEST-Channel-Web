/// <reference types="react-scripts" />
declare module '*.jpg'
declare module '*.png'
declare module '*.ttf'

interface Window {
  ethereum?: {
    isMetaMask?: true
    isConnected: () => boolean
    request: <T extends unknown>(args: RequestArguments) => Promise<T>
    on?: (...args: any[]) => void
    removeListener?: (...args: any[]) => void
    autoRefreshOnNetworkChange?: boolean
    _metamask: {
      isUnlocked: () => Promise<boolean>
    }
  }
  web3?: Record<string, unknown>
}
