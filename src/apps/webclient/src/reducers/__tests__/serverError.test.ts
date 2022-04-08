import { canUseWindow } from 'utils/browserEnvironment'
import { serverErrorReducers } from '../serverError'

jest.mock('utils/browserEnvironment')

const mockState = '418'
const mockAction = {
  type: '@@router/LOCATION_CHANGE',
}

describe('serverError reducer', () => {
  describe('serverError', () => {
    describe('when window is available', () => {
      beforeEach(() => {
        ;(canUseWindow as jest.Mock).mockReturnValue(true)
      })

      test('returns 404', () => {
        const result = serverErrorReducers.serverError(mockState, mockAction)

        expect(result).toEqual('404')
      })
    })

    describe('when window is not available', () => {
      beforeEach(() => {
        ;(canUseWindow as jest.Mock).mockReturnValue(false)
      })

      test('returns initial state', () => {
        const result = serverErrorReducers.serverError(mockState, mockAction)

        expect(result).toEqual(mockState)
      })
    })
  })
})
