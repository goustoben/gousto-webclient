import React from 'react'
import Immutable from 'immutable'
import { shallow } from 'enzyme'
import * as statusSelectors from 'selectors/status'
import { safeJestMock } from '../../../../../_testing/mocks'
import * as basketSelectors from '../../../selectors/basket'
import { BasketValidationErrorModalContainer } from '../BasketValidationErrorModalContainer'
describe('BasketValidationErrorModalContainer', () => {
  let wrapper
  describe('when no breaking rules', () => {
    beforeEach(() => {
      wrapper = shallow(<BasketValidationErrorModalContainer />, {
        context: {
          store: {
            getState: () => ({
              error: Immutable.fromJS({})
            }),
            dispatch: () => {},
            subscribe: () => {}
          }
        }
      })
    })

    test('should render BasketValidationErrorModal with the right props', () => {
      expect(wrapper.find('BasketValidationErrorModal').props()).toEqual({
        brokenRulesToDisplay: [],
        closeModal: expect.any(Function),
        shouldShow: false,
        title: 'Basket Not Valid'
      })
    })
  })

  describe('when some break rules', () => {
    beforeEach(() => {
      const getBasketNotValidErrorSpy = safeJestMock(statusSelectors, 'getBasketNotValidError')
      const getFormatedRulesMessageSpy = safeJestMock(basketSelectors, 'getFormatedRulesMessage')

      getFormatedRulesMessageSpy.mockReturnValue([{
        description: 'Only 1 oven ready meal is available per order',
        recipes: [{
          imageUrl: 'url-for-image',
          title: 'Chicken'}]
      },
      {
        description: 'Only 1 new-rule meal is available per order',
        recipes: [{
          imageUrl: 'url-for-image',
          title: 'Chicken'
        }]
      }])
      getBasketNotValidErrorSpy.mockReturnValue([{
        name: 'rule-name',
        message: 'Only 1 oven ready meal is available per order',
        items: ['123']
      }])
      wrapper = shallow(<BasketValidationErrorModalContainer />, {
        context: {
          store: {
            getState: () => ({
              error: Immutable.fromJS({})
            }),
            dispatch: () => {},
            subscribe: () => {}
          }
        }
      })
    })

    test('should render BasketValidationErrorModal with the right props', () => {
      expect(wrapper.find('BasketValidationErrorModal').props()).toEqual({
        brokenRulesToDisplay: [{
          description: 'Only 1 oven ready meal is available per order',
          recipes: [{
            imageUrl: 'url-for-image',
            title: 'Chicken'}]
        },
        {
          description: 'Only 1 new-rule meal is available per order',
          recipes: [{
            imageUrl: 'url-for-image',
            title: 'Chicken'
          }]
        }],
        closeModal: expect.any(Function),
        shouldShow: true,
        title: 'Basket Not Valid'
      })
    })
  })
})

