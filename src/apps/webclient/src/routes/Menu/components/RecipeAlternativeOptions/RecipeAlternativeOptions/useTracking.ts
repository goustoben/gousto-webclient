import { useEffect } from 'react'

import { useDispatch } from 'react-redux'

import { trackVariantListDisplay as trackVariantListDisplayAction } from 'actions/menu'

type ViewMode = 'details' | 'grid'

export const useTracking = () => {
  const dispatch = useDispatch()

  const trackVariantListDisplay = (view: ViewMode) => dispatch(trackVariantListDisplayAction(view))

  return {
    trackVariantListDisplay,
  }
}

/**
 * Helper hook to simplify usage of `useEffect` hook with conditions.
 * Takes `callback` and executes within `useEffect` hook only if `condition` is TRUE.
 */
const useEffectConditional = (
  condition: boolean,
  callback: () => void,
  dependencies: any[] = [],
) => {
  useEffect(() => {
    if (condition) {
      callback()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)
}

export const useTrackVariantListDisplay = ({
  hasAlternativeOptions,
  view,
}: {
  hasAlternativeOptions: boolean
  view: ViewMode
}) => {
  const { trackVariantListDisplay } = useTracking()

  useEffectConditional(hasAlternativeOptions, () => trackVariantListDisplay(view), [
    view,
    hasAlternativeOptions,
  ])
}
