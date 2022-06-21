export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

export const NetworkContextName = 'NETWORK'

export const IS_IN_IFRAME = window.parent !== window

// 30 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 30
export const L2_DEADLINE_FROM_NOW = 60 * 5

// transaction popup dismissal amounts
export const DEFAULT_TXN_DISMISS_MS = 25000
export const L2_TXN_DISMISS_MS = 5000

export const IDLE = 'IDLE'
export const PROCESSING = 'PROCESSING'
export const SUCCESS = 'SUCCESS'
export const ERROR = 'ERROR'

// How long to pause on a success or error message
// before transitioning back to an IDLE state.
export const IDLE_DELAY = 200
