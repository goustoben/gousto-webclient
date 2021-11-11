import { fetch } from 'utils/fetch'
import { addressLookup } from '../addressLookup'
import config from '../../config/apis'

jest.mock('utils/fetch', () => ({
  fetch: jest.fn()
}))

describe('server/service/addressLookup', () => {
  const lookupConfig = config.craftyClicks

  const dummyLookupResponse = {
    data: {
      field: 'value'
    }
  }

  beforeEach(() => {
    fetch.mockImplementation(() => dummyLookupResponse)
  })

  test('It should forward the call to fetch and add required parameters', async () => {
    expect.assertions(4)

    await addressLookup('AB12CD')

    expect(fetch).toHaveBeenCalled()
    expect(fetch.mock.calls[0][0]).toEqual(null)
    expect(fetch.mock.calls[0][1]).toEqual(lookupConfig.url)
    expect(fetch.mock.calls[0][2]).toEqual({
      key: lookupConfig.key,
      postcode: 'AB12CD',
      response: 'data_formatted',
      sort: 'asc',
    })
  })
})
