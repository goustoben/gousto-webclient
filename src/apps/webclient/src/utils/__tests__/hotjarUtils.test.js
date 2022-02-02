import { invokeHotjarEvent } from '../hotjarUtils'

describe('hotjarUtils', () => {
  const hj = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('given invokeHotjarEvent is called', () => {
    beforeEach(() => {
      global.hj = hj
    })

    test('then it should invoke the hotjar event', () => {
      invokeHotjarEvent('skip_wizard_variant')

      expect(hj).toHaveBeenCalledWith('event', 'skip_wizard_variant')
    })

    describe('when hj is not defined', () => {
      beforeEach(() => {
        delete global.hj
      })

      test('then it should not do anything', () => {
        expect(() => {
          invokeHotjarEvent('skip_wizard_variant')
        }).not.toThrow()
      })
    })
  })
})
