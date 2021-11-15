import fetch from 'utils/fetch'
import { updateTastePreferences } from "apis/tastePreferences/updateTastePreferences"

jest.mock('utils/fetch', () =>
  jest.fn().mockImplementation(() => {
    const getData = async () => ({ data: [1, 2, 3] })

    return getData()
  })
)

describe('updateTastePreferences', () => {
  test('should fetch the correct url', async () => {
    const expectedReqData = {}
    const headers = {
      'x-gousto-device-id': 'session_id',
      'Content-Type': 'application/json',
    }
    await updateTastePreferences('access-token', 'session_id')
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith('access-token', 'https://production-api.gousto.co.uk/tastepreferences/v1/preferences/profile', expectedReqData, 'POST', 'default', headers)
  })
})
