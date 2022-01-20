import { getUserMenuVariant } from 'selectors/features'
import menuFetchData from '../fetchData'

import { loadMenuServiceDataIfDeepLinked } from '../menuService'

jest.mock('../fetchData')
jest.mock('selectors/features')

describe('menuservice', () => {
  let dispatch
  let getState
  beforeEach(() => {
    dispatch = jest.fn()
    getState = () => ({})
  })
  describe('loadMenuServiceDataIfDeepLinked', () => {
    afterEach(() => {
      jest.clearAllMocks()
    })

    test('fetches menuservice data when local data is empty', async () => {
      menuFetchData.mockResolvedValue()
      getState = () => ({
        menuService: {
          data: []
        }
      })

      await loadMenuServiceDataIfDeepLinked()(dispatch, getState)

      expect(menuFetchData).toHaveBeenCalled()
    })

    test('fetches menuservice data when user has a userMenuVariant for AB testing menus', async () => {
      getUserMenuVariant.mockReturnValue('menuB')
      menuFetchData.mockResolvedValue()
      getState = () => ({
        menuService: {
          data: []
        },
      })

      const isSignUpPage = true
      await loadMenuServiceDataIfDeepLinked(isSignUpPage)(dispatch, getState)

      expect(menuFetchData.mock.calls[0][1]).toEqual(true)
      expect(menuFetchData.mock.calls[0][3]).toEqual('menuB')
    })
  })
})
