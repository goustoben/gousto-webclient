import { useEffect } from 'react'

// TODO VPP: sort out types

export const useClickOutside = (ref: any, callback: () => void, deps: any = []) => {
  useEffect(() => {
    const handleClickOutside: EventListenerOrEventListenerObject  = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, ...deps])
}
