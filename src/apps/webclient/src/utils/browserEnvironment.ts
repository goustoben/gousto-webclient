import { WindowLocation } from './types/windowLocation'

/**
 * Utility to enable easier testing of these utilities
 */
export const getWindow = () => window

export const canUseWindow = () =>
  !!(typeof window !== 'undefined' && window.document && window.document.createElement)

export const canUseWindowOrThrow = () => {
  if (!canUseWindow()) {
    throw new Error('Window does not exist')
  }
}

export const getClientProtocol = () => {
  canUseWindowOrThrow()

  // eslint-disable-next-line no-underscore-dangle
  const _window = getWindow()

  return (_window.location as WindowLocation).protocol
}
