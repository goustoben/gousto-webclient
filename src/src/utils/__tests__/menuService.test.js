import menuFetchData from 'routes/Menu/fetchData'
import { getUserMenuVariant } from 'selectors/features'

import { loadMenuServiceDataIfDeepLinked } from 'utils/menuService'

jest.mock('routes/Menu/fetchData')
jest.mock('selectors/features')

describe('menuservice', () => {
  describe('loadMenuServiceDataIfDeepLinked', () => {
    afterEach(() => {
      jest.clearAllMocks()
    })

    test('fetches menuservice data when local data is empty', async () => {
      menuFetchData.mockResolvedValue()
      const store = {
        getState: () => ({
          menuService: {
            data: []
          }
        })
      }

      await loadMenuServiceDataIfDeepLinked(store)

      expect(menuFetchData).toHaveBeenCalled()
    })

    test('fetches menuservice data when user has a userMenuVariant for AB testing menus', async () => {
      getUserMenuVariant.mockReturnValue('menuB')
      menuFetchData.mockResolvedValue()
      const store = {
        getState: () => ({
          menuService: {
            data: []
          },
        })
      }

      const isSignUpPage = true
      await loadMenuServiceDataIfDeepLinked(store, isSignUpPage)

      expect(menuFetchData.mock.calls[0][1]).toEqual(true)
      expect(menuFetchData.mock.calls[0][3]).toEqual('menuB')
    })

    test('should not fetch menuservice data when store is empty', async () => {
      menuFetchData.mockResolvedValue()
      const store = undefined

      await loadMenuServiceDataIfDeepLinked(store)

      expect(menuFetchData).not.toHaveBeenCalled()
    })
  })
})
