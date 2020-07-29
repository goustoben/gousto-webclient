import { actionTypes } from '../../../../actions/actionTypes'
import { setMenuFeature } from '../menuFeatures'

describe('setMenuFeature', () => {
  test('should return MENU_SET_FEATURE with payload', () => {
    const result = setMenuFeature('feature_name', 'feature_value')

    expect(result).toEqual({
      type: actionTypes.MENU_SET_FEATURE,
      payload: {
        name: 'feature_name',
        value: 'feature_value'
      }
    })
  })
})
