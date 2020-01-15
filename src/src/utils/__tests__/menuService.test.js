import menuFetchData from 'routes/Menu/fetchData'
import { getMenuService, getUserMenuVariant } from 'selectors/features'

import { loadMenuServiceDataIfDeepLinked } from 'utils/menuService'

jest.mock('routes/Menu/fetchData')
jest.mock('selectors/features')

describe('menuservice', () => {
  describe('loadMenuServiceDataIfDeepLinked', () => {
    getMenuService.mockReturnValue(true)

    afterEach(() => {
      jest.clearAllMocks()
    })

    test('fetches menuservice data when menu service is enabled and local data is empty', async() => {
      menuFetchData.mockResolvedValue()
      const store = {
        getState: () => {
          return {
            menuService: {
              data: []
            }
          }
        }
      }

      await loadMenuServiceDataIfDeepLinked(store)

      expect(getMenuService).toHaveBeenCalled()
      expect(menuFetchData).toHaveBeenCalled()
    })

    test('fetches menuservice data when menu service is enabled and user has a userMenuVariant for AB testing menus', async() => {
      getUserMenuVariant.mockReturnValue('menuB')
      menuFetchData.mockResolvedValue()
      const store = {
        getState: () => {
          return {
            menuService: {
              data: []
            },
          }
        }
      }

      const isSignUpPage = true
      await loadMenuServiceDataIfDeepLinked(store, isSignUpPage)

      expect(getMenuService).toHaveBeenCalled()
      expect(menuFetchData.mock.calls[0][1]).toEqual(true)
      expect(menuFetchData.mock.calls[0][3]).toEqual('menuB')
    })

    test('should not fetch menuservice data when menu service is disabled', async() => {
      getMenuService.mockReturnValueOnce(false)
      menuFetchData.mockResolvedValue()
      const store = {
        getState: () => {
          return {
            menuService: {
              data: []
            }
          }
        }
      }

      await loadMenuServiceDataIfDeepLinked(store)

      expect(getMenuService).toHaveBeenCalled()
      expect(menuFetchData).not.toHaveBeenCalled()
    })

    test('should not fetch menuservice data when store is empty', async() => {
      menuFetchData.mockResolvedValue()
      const store = undefined

      await loadMenuServiceDataIfDeepLinked(store)

      expect(getMenuService).toHaveBeenCalled()
      expect(menuFetchData).not.toHaveBeenCalled()
    })
  })
})
