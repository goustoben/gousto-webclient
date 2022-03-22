import React from 'react'
import { shallow } from 'enzyme'
import { useDispatch } from 'react-redux'
import { trackUTMAndPromoCode } from 'actions/tracking'
import { RecipesInBasketProgress } from '../RecipesInBasketProgress.logic'

jest.mock('src/routes/Menu/domains/basket', () => ({
  useBasket: jest.fn().mockReturnValue({
    recipeCount: 2,
  }),
}))

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}))

jest.mock('actions/tracking', () => ({
  trackUTMAndPromoCode: jest.fn().mockReturnValue('trackUTMAndPromoCode-test'),
}))

describe('RecipesInBasketProgress', () => {
  let wrapper
  const dispatch = jest.fn()

  describe('when closed', () => {
    beforeEach(() => {
      useDispatch.mockReturnValue(dispatch)
      wrapper = shallow(<RecipesInBasketProgress isAuthenticated={false} />)
    })

    test('then it should send the tracking event', () => {
      wrapper.prop('onClose')(4, 50)

      expect(trackUTMAndPromoCode).toHaveBeenCalledWith('click_close_action_bar', {
        max_recipes: 4,
        num_recipes: 2,
        percentage_complete: 50,
      })
      expect(dispatch).toHaveBeenCalledWith('trackUTMAndPromoCode-test')
    })
  })
})
