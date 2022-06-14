import { useState, useEffect } from 'react'

export type DeviceType = {
   MOBILE: string,
   TABLET: string,
   DESKTOP: string,
}

export const canUseDom = () => (typeof window !== 'undefined'
    && window.document && window.document.createElement)

export const DeviceType: DeviceType = {
  MOBILE: 'mobile',
  TABLET: 'tablet',
  DESKTOP: 'desktop',
}

const getDeviceType = (): string => {
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

export const useDeviceType = (): string => {
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
