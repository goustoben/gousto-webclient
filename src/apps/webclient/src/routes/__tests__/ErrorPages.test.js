/* eslint-disable no-underscore-dangle */
import { Helmet } from 'react-helmet'
import { canUseWindow } from 'utils/browserEnvironment'
import * as userSelectors from 'selectors/user'
import { safeJestMock } from '_testing/mocks'
import { isServer } from '../../../server/utils/serverEnvironment'
const { processRequest } = require('../../../server/processRequest')

const getUserId = safeJestMock(userSelectors, 'getUserId')

jest.mock('utils/browserEnvironment')
jest.mock('../../../server/utils/serverEnvironment')

// This test renders the entire route as a string
// and is extremely slow to run
describe('router', () => {
  beforeEach(() => {
    isServer.mockReturnValue(true)
    canUseWindow.mockReturnValue(false)
    Helmet.canUseDOM = false
    getUserId.mockReturnValue('123456')
  })

  afterEach(() => {
    Helmet.canUseDOM = true
  })

  test('should 404 when given an unknown route', async () => {
    const ctx = {
      request: {
        url: '/apagethatwillneverexist',
        path: '/apagethatwillneverexist',
      },
      req: {
        headers: {
          'user-agent': 'apagethatwillneverexist',
        },
      },
    }
    await processRequest(ctx, () => {
      expect(
        ctx.body.indexOf('We can&#x27;t find the page you&#x27;re looking for'),
      ).not.toBe(-1)
      expect(ctx.status).toEqual(404)
    })
  })

  test('should throw an error to the server-side handler on error', async () => {
    const ctx = {
      request: {
        url: '/500pagetest',
        path: '/500pagetest',
      },
      req: {
        headers: {
          'user-agent': '500pagetest',
        },
      },
    }

    await processRequest(ctx, () => {}).catch(err => {
      expect(err).toBeDefined()
    })
  })
})
