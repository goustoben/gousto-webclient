import * as cookieHelper2 from 'utils/cookieHelper2'
import { getSidesForOrder } from './sides'
import * as menuFetch from './fetch'
import { mockFetchResponse } from './fetch.mock'

jest.spyOn(cookieHelper2, 'get').mockImplementation((cookies, key, withVersionPrefix, shouldDecode) => {
  if (key === 'gousto_session_id' && !withVersionPrefix && !shouldDecode) {
    return 'session-id'
  }

  return null
})

describe('getSidesForOrder', () => {
  beforeEach(() => {
    jest.spyOn(menuFetch, 'post').mockResolvedValue(mockFetchResponse({}))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should fetch the correct url', async () => {
    const userId = 'my-cool-user'
    const data = { some: 'thing' }
    const apiResponse = { data: [1, 2, 3] }

    menuFetch.post.mockResolvedValue(apiResponse)

    const response = await getSidesForOrder('token', data, userId)

    expect(menuFetch.post).toHaveBeenCalledTimes(1)
    expect(menuFetch.post).toHaveBeenCalledWith(
      'token',
      'https://production-api.gousto.co.uk/menu/v1/sides',
      { data },
      {'Content-Type': 'application/json', 'x-gousto-device-id': 'session-id', 'x-gousto-user-id': 'my-cool-user'}
    )
    expect(response).toEqual(apiResponse)
  })
})
