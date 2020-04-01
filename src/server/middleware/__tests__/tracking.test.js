jest.mock('uuid', () => ({
  v4: () => 'generated-uuid'
}))

const { sessionMiddleware } = require('../tracking')

describe('tracking', () => {
  describe('session middleware', () => {
    const context = {}
    let next

    beforeEach(() => {
      context.cookies = {
        get: jest.fn(),
        set: jest.fn(),
      }

      next = jest.fn()
    })

    describe('given middleware with default session cookie name', () => {
      const middleware = sessionMiddleware()

      describe('and session cookie is set', () => {
        beforeEach(() => {
          context.cookies.get.mockReturnValue('bob')
        })

        describe('when execute middleware', () => {
          beforeEach(async () => {
            await middleware(context, next)
          })

          it('then next should have been called', () => {
            expect(next).toHaveBeenCalledWith()
          })

          it('then get cookies should have been called with default name', () => {
            expect(context.cookies.get).toHaveBeenCalledWith('session')
          })

          it('then should set cookie should not have been called', () => {
            expect(context.cookies.set).not.toHaveBeenCalled()
          })
        })
      })

      describe('and session cookie is not set', () => {
        beforeEach(() => {
          context.cookies.get.mockReturnValue(undefined)
        })

        describe('when execute middleware', () => {
          beforeEach(async () => {
            await middleware(context, next)
          })

          it('then next should have been called', () => {
            expect(next).toHaveBeenCalledWith()
          })

          it('then get cookies should have been called with default name', () => {
            expect(context.cookies.get).toHaveBeenCalledWith('session')
          })

          it('then should set cookie', () => {
            expect(context.cookies.set).toHaveBeenCalledWith('session', 'generated-uuid', {
              secure: false,
              httpOnly: false,
            })
          })
        })
      })
    })

    describe('given middleware with custom session cookie name', () => {
      const sessionCookieName = 'customCookieName'
      const middleware = sessionMiddleware(sessionCookieName)

      describe('and session cookie is set', () => {
        beforeEach(() => {
          context.cookies.get.mockReturnValue('bob')
        })

        describe('when execute middleware', () => {
          beforeEach(async () => {
            await middleware(context, next)
          })

          it('then next should have been called', () => {
            expect(next).toHaveBeenCalledWith()
          })

          it('then get cookies should have been called with provided name', () => {
            expect(context.cookies.get).toHaveBeenCalledWith(sessionCookieName)
          })

          it('then should set cookie should not have been called', () => {
            expect(context.cookies.set).not.toHaveBeenCalled()
          })
        })
      })

      describe('and session cookie is not set', () => {
        beforeEach(() => {
          context.cookies.get.mockReturnValue(undefined)
        })

        describe('when execute middleware', () => {
          beforeEach(async () => {
            await middleware(context, next)
          })

          it('then next should have been called', () => {
            expect(next).toHaveBeenCalledWith()
          })

          it('then get cookies should have been called with provided name', () => {
            expect(context.cookies.get).toHaveBeenCalledWith(sessionCookieName)
          })

          it('then should set cookie', () => {
            expect(context.cookies.set).toHaveBeenCalledWith(sessionCookieName, 'generated-uuid', {
              secure: false,
              httpOnly: false,
            })
          })
        })
      })
    })
  })
})
