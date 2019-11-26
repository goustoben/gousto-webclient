import Immutable from 'immutable'
import { menuLoadCollectionRecipes } from 'actions/menuLoadCollectionRecipes'
import { fetchCollectionRecipes } from 'apis/collections'
import { menuReceiveCollectionRecipes, menuReceiveMenu } from 'actions/menu'

jest.mock('apis/collections', () => ({
  fetchCollectionRecipes: jest.fn().mockResolvedValue({
    data: {}
  }),
}))

jest.mock('actions/menu', () => ({
  menuReceiveCollectionRecipes: jest.fn(),
  menuReceiveMenu: jest.fn(),
}))

describe('menuLoadCollectionRecipes', () => {
  const dispatch = jest.fn()

  const state = {
    auth: Immutable.fromJS({
      accessToken: 'testAccessToken'
    }),
    features: Immutable.fromJS({
      menu_id: {
        value: false
      }
    })
  }

  const getState = () => state

  test('should call fetchCollectionRecipes with reqData including filters available on date ', async () => {
    await menuLoadCollectionRecipes('testDate', 'testCollectionId')(dispatch, getState)

    const expectedReqDataParams = {
      'filters[available_on]': 'testDate',
      'includes': ['ingredients', 'allergens', 'taxonomy']
    }
    expect(fetchCollectionRecipes).toHaveBeenCalledWith('testAccessToken', 'testCollectionId', expectedReqDataParams)
  })

  test('should call fetchCollectionRecipes with reqData including id if idsOnly is true', async() => {
    const idsOnly = true
    await menuLoadCollectionRecipes('testDate', 'testCollectionId', idsOnly )(dispatch, getState)

    const expectedReqDataParams = {
      'filters[available_on]': 'testDate',
      'includes': ['ingredients', 'allergens', 'taxonomy'],
      'fields[]': 'id'
    }
    expect(fetchCollectionRecipes).toHaveBeenCalledWith('testAccessToken', 'testCollectionId', expectedReqDataParams)
  })

  test('should dispatch menuReceiveCollectionRecipes when recipes are returned if idsOnly is true', async () => {
    const idsOnly = true

    fetchCollectionRecipes.mockResolvedValue({
      data: {
        recipes: []
      }
    })

    await menuLoadCollectionRecipes('testDate', 'testCollectionId', idsOnly )(dispatch, getState)
    expect(menuReceiveCollectionRecipes).toHaveBeenCalled()
  })

  test('should dispatch menuReceiveMenu when recipes are returned if idsOnly is false', async () => {
    const idsOnly = false

    await menuLoadCollectionRecipes('testDate', 'testCollectionId', idsOnly )(dispatch, getState)
    expect(menuReceiveMenu).toHaveBeenCalled()
  })
})
