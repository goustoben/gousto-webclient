import {
  zeStart,
  zeChatButtonSetUp,
} from 'utils/zendesk'

describe('zendesk utils', () => {
  describe('when `zeStart` is called', () => {
    beforeEach(() => {
      window.zE = jest.fn().mockImplementation((callback) => {
        if (typeof callback === 'function') {
          callback()
        }
      })
    })

    describe('and `window.zE` function is not found ', () => {
      beforeEach(() => {
        delete window.zE
        jest.useFakeTimers()
      })

      test('`clearInterval` is being called after attempting to find `zE()`', () => {
        const promise = zeStart().catch(() => {
          expect(clearInterval).toHaveBeenCalledTimes(1)
        })

        jest.runAllTimers()

        return promise
      })

      test('errors when attempts time out', () => {
        const promise = zeStart().catch((err) => {
          expect(err).toContain(
            'Could not find `zE` function'
          )
        })

        jest.runAllTimers()

        return promise
      })
    })

    describe('and `window.zE` function is found', () => {
      beforeEach(() => {
        jest.useFakeTimers()
      })

      test('`clearInterval` is being called after attempting to find `zE()`', () => {
        const promise = zeStart().then(() => {
          expect(clearInterval).toHaveBeenCalledTimes(1)
        })

        jest.runAllTimers()

        return promise
      })

      describe('shouldDisplayChat', () => {
        test('webWidget:hide is called when url is incorrect', () => {
          const promise = zeStart().then(() => {
            zeChatButtonSetUp('/incorrect-url')

            expect(window.zE).toHaveBeenCalledWith('webWidget', 'hide')
            expect(window.zE).not.toHaveBeenCalledWith('webWidget', 'show')
          })

          jest.runAllTimers()

          return promise
        })

        test('webWidget:show is called if correct url is passed through', () => {
          const promise = zeStart().then(() => {
            zeChatButtonSetUp('/my-gousto')

            expect(window.zE).toHaveBeenCalledWith('webWidget', 'show')
          })

          jest.runAllTimers()

          return promise
        })
      })
    })
  })

  describe('`zeChatButtonSetUp`', () => {
    describe('when `zE` is not found', () => {
      beforeEach(() => {
        delete window.zE
      })

      test('errors when trying to set up the button', () => {
        try {
          zeChatButtonSetUp()
        } catch (err) {
          expect(err.message).toBe('zeInstance is not a function')
        }
      })
    })
  })
})
