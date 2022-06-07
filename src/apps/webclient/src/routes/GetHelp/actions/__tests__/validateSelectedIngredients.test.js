import Immutable from 'immutable'
import { actionTypes } from 'actions/actionTypes'
import { validateSelectedIngredients } from '../validateSelectedIngredients'
import { validateIngredients } from '../../apis/ssrIngredients'

jest.mock('../../apis/ssrIngredients')

const ACCESS_TOKEN = 'access-token'
const GET_STATE_PARAMS = {
  auth: Immutable.fromJS({ accessToken: ACCESS_TOKEN }),
}

describe('given validateSelectedIngredients is called', () => {
  const dispatch = jest.fn()
  const getState = jest.fn().mockReturnValue(GET_STATE_PARAMS)

  const body = {
    accessToken: 'user-access-token',
    customerId: '777',
    ingredients: [{
      ingredient_uuid: '2222',
      recipe_gousto_reference: '1234',
    }],
    orderId: '888',
  }
  const expectedParams = [
    'user-access-token',
    {
      customer_id: '777',
      ingredients: JSON.stringify([{
        ingredient_uuid: '2222',
        recipe_gousto_reference: '1234',
      }]),
      order_id: '888',
    }
  ]

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('the validateIngredients is being called correctly', () => {
    validateSelectedIngredients(body)(dispatch, getState)
    expect(validateIngredients).toHaveBeenCalledWith(...expectedParams)
  })

  describe('when validateIngredients returns an error', () => {
    test('error is dispatched', () => {
      validateIngredients.mockRejectedValueOnce('error')
      validateSelectedIngredients(body)(dispatch, getState)

      expect(dispatch.mock.calls[1]).toEqual([{
        type: 'ERROR',
        key: actionTypes.GET_HELP_VALIDATE_INGREDIENTS,
        value: ''
      }])
    })
  })
})
