import Immutable from 'immutable'
import { fetchUserOrders } from "apis/users/fetchUserOrders"
import { loadOrders } from "routes/Account/MyGousto/actions/loadOrders/loadOrders"

jest.mock('apis/user')

const ACCESS_TOKEN = 'access-token'
const STATE = {
  auth: Immutable.fromJS({ accessToken: ACCESS_TOKEN }),
}
const ORDERS = [
  {
    fieldA: 'a',
    fieldB: 'b',
  },
  {
    fieldA: 'a2',
    fieldB: 'b2',
  },
]

const dispatch = jest.fn()
const getState = jest.fn().mockReturnValue(STATE)

describe('Given loadOrders action is called', () => {
  beforeEach(async () => {
    fetchUserOrders.mockResolvedValueOnce({ data: ORDERS })
    await loadOrders()(dispatch, getState)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('it dispatches the orders received from the api call', () => {
    expect(dispatch).toHaveBeenCalledWith({
      type: 'MY_GOUSTO_LOAD_ORDERS',
      payload: { orders: ORDERS },
    })
  })
})
