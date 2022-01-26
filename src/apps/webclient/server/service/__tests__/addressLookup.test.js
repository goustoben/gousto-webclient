import lookupService from '../addressLookup'
import config from '../../config/apis'

jest.mock('utils/fetch')

describe('server/service/addressLookup', () => {
  let fetchMock
  const lookupConfig = config.craftyClicks

  const dummyLookupResponse = {
    data: {
      field: 'value'
    }
  }

  beforeEach(() => {
    // eslint-disable-next-line global-require
    fetchMock = require('utils/fetch').default
    fetchMock.mockImplementation(() => dummyLookupResponse)
  })

  test('It should forward the call to fetch and add required parameters', async () => {
    expect.assertions(4)

    await lookupService('AB12CD')

    expect(fetchMock).toHaveBeenCalled()
    expect(fetchMock.mock.calls[0][0]).toEqual(null)
    expect(fetchMock.mock.calls[0][1]).toEqual(lookupConfig.url)
    expect(fetchMock.mock.calls[0][2]).toEqual({
      key: lookupConfig.key,
      postcode: 'AB12CD',
      response: 'data_formatted',
      sort: 'asc',
    })
  })
})
