import { UseMenuSWRArgs } from './useMenuSWR'
import { useNormalisedData } from './useNormalisedData'

export type MenuServiceData = NonNullable<ReturnType<typeof useNormalisedData>>

/**
 * Get the menu service data
 *
 * This function uses SWR under the hood, so it is safe to call many times
 *
 * This will return `null` while the data is loading, or in the case of an error.
 */
export function useMenuService(requestArgs: UseMenuSWRArgs) {
  return useNormalisedData(requestArgs)
}
