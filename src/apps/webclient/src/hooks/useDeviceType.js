import { useState, useEffect } from 'react'
import { canUseDom } from 'utils/browserHelper'

export const DeviceType = {
  MOBILE: 'mobile',
  TABLET: 'tablet',
  DESKTOP: 'desktop',
}

const getDeviceType = () => {
  if (!canUseDom()) {
    return DeviceType.DESKTOP
  }
  const width = window.innerWidth
  let deviceType = DeviceType.DESKTOP
  if (width < 768) {
    deviceType = DeviceType.MOBILE
  } else if (width < 1025) {
    deviceType = DeviceType.TABLET
  }

  return deviceType
}

export const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState(getDeviceType())

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (canUseDom()) {
      const onResize = () => {
        setDeviceType(getDeviceType())
      }
      window.addEventListener('resize', onResize)

      return () => {
        window.removeEventListener('resize', onResize)
      }
    }
  }, [])

  return deviceType
}
