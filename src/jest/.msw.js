import { setupServer } from 'msw/node'
import { handlers as sideHandlers } from '../src/routes/Menu/apis/sides.hook.mock'
import { extendKyUserIdAndAccessToken } from 'routes/Menu/apis/_utils'

export const helpers = {
    setupServer: (handlers) => {
        const server = setupServer(...handlers)

        // Establish API mocking before all tests.
        beforeAll(() => {
            server.listen()
        })

        // Reset any request handlers that we may add during the tests,
        // so they don't affect other tests.
        afterEach(() => {
            // If you need logging of the requests, uncomment the following line.
            // server.printHandlers()
            server.resetHandlers()
        })

        // Clean up after the tests are finished.
        afterAll(() => server.close())

        return server
    },
    handlers: {
        sides: sideHandlers
    },
    setUserId: (userId) => extendKyUserIdAndAccessToken(userId)
}
