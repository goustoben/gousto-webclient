import { UseMenuSWRArgs } from './useMenuSWR'

export type MenuServiceData = any

/**
 * Get the menu service data
 *
 * This function uses SWR under the hood, so it is safe to call many times
 *
 * This will return `null` while the data is loading, or in the case of an error.
 */
export function useMenuService(requestArgs: UseMenuSWRArgs) {
  // todo implement
}
