import { createContext, useContext } from 'react'

/**
 * Stores typed query string parameters that relate to the menu page
 *
 * This can probably be removed when we upgrade React Router
 */
export type MenuQueryParams = Partial<{
  tasteProfileId: any

  'preview[menu_id]': any
  'preview[auth_user_id]': any
  'preview[expiry]': any
  'preview[signature]': any
}>

const MenuQueryContext = createContext<MenuQueryParams>({} as MenuQueryParams)
MenuQueryContext.displayName = 'MenuQueryContext'

export const MenuQueryContextProvider = MenuQueryContext.Provider
export const useMenuQueryParams = (): MenuQueryParams => useContext(MenuQueryContext)
