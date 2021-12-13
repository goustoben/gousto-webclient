import { trackVariantListDisplay as trackVariantListDisplayAction } from 'actions/menu'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export const useTracking = () => {
  const dispatch = useDispatch()

  const trackVariantListDisplay = view => dispatch(trackVariantListDisplayAction(view))

  return {
    trackVariantListDisplay,
  }
}

/**
 * Helper hook to simplify usage of `useEffect` hook with conditions.
 * Takes `callback` and executes within `useEffect` hook only if `condition` is TRUE.
 */
const useEffectConditional = (condition, callback, dependencies = []) => {
  useEffect(() => {
    if (condition) {
      callback()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)
}

export const useTrackVariantListDisplay = ({hasAlternativeOptions, view}) => {
  const { trackVariantListDisplay } = useTracking()

  useEffectConditional(
    hasAlternativeOptions,
    () => trackVariantListDisplay(view),
    [view, hasAlternativeOptions]
  )
}
