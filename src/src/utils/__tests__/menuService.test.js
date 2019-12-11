import menuFetchData from 'routes/Menu/fetchData'
import { getMenuService } from 'selectors/features'

import { loadMenuServiceDataIfDeepLinked } from 'utils/menuService'

jest.mock('routes/Menu/fetchData')
jest.mock('selectors/features')

describe('menuservice', () => {
  describe('loadMenuServiceDataIfDeepLinked', () => {
    afterEach(() => {
      jest.clearAllMocks()
    })

    test('fetches menuservice data when menu service is enabled and local data is empty', async() => {
      getMenuService.mockReturnValue(true)
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

    test('should not fetch menuservice data when menu service is disabled', async() => {
      getMenuService.mockReturnValue(false)
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
      getMenuService.mockReturnValue(true)
      menuFetchData.mockResolvedValue()
      const store = undefined

      await loadMenuServiceDataIfDeepLinked(store)

      expect(getMenuService).toHaveBeenCalled()
      expect(menuFetchData).not.toHaveBeenCalled()
    })

  })
})
