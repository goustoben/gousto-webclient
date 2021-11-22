import { fromJS } from 'immutable'
import { safeJestMock } from '_testing/mocks'
import * as coreApi from '../../apis/core'
import { loadShippingAddresses } from '../loadShippingAddresses'
import * as getHelpActionsUtils from '../utils'

const fetchShippingAddresses = safeJestMock(coreApi, 'fetchShippingAddresses')

const ACCESS_TOKEN = 'adfjlakjds13'
const ACTION_TYPE = 'GET_HELP_LOAD_SHIPPING_ADDRESSES'
const USER_ID = '1234'
const ADDRESSES = [{ id: '1' }, { id: '2' }]
const RESPONSE = {
  status: 'ok',
  data: ADDRESSES
}

const dispatch = jest.fn()
const getState = jest.fn(() => ({
  auth: fromJS({
    accessToken: ACCESS_TOKEN,
  }),
}))
const asyncAndDispatchSpy = jest.spyOn(getHelpActionsUtils, 'asyncAndDispatch')

describe('loadShippingAddresses', () => {
  beforeAll(async () => {
    fetchShippingAddresses.mockResolvedValue(RESPONSE)
    await loadShippingAddresses(USER_ID)(dispatch, getState)
  })

  test('fetchShippingAddresses is called with the right params', async () => {
    expect(fetchShippingAddresses).toHaveBeenCalledWith(ACCESS_TOKEN)
  })

  test('the addresses are dispatched', async () => {
    expect(dispatch).toHaveBeenCalledWith({
      type: ACTION_TYPE,
      payload: ADDRESSES,
    })
  })

  test('asyncAndDispatch is called with the right params', async () => {
    expect(asyncAndDispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        dispatch,
        actionType: ACTION_TYPE,
        errorMessage: `Failed to loadShippingAddresses userId: ${USER_ID}`,
      })
    )
  })
})
