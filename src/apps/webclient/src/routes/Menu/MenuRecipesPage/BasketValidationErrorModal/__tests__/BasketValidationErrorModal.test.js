import React from 'react'
import { shallow } from 'enzyme'
import { BasketValidationErrorModal } from '../BasketValidationErrorModal'

describe('BasketValidationErrorModal', () => {
  let wrapper
  let props
  beforeEach(() => {
    props = {
      title: '',
      shouldShow: true,
      shouldShowSwapButton: false,
      basketRecipeSwap: () => {},
      closeModal: () => {},
      brokenRulesToDisplay: [
        {
          description: 'Only 1 oven ready meal is available per order',
          recipes: [
            {
              imageUrl: 'url-for-image',
              title: 'Chicken',
            },
          ],
        },
        {
          description: 'Only 1 new-rule meal is available per order',
          recipes: [
            {
              imageUrl: 'url-for-image',
              title: 'Chicken',
            },
          ],
        },
      ],
    }
    wrapper = shallow(<BasketValidationErrorModal {...props} />)
  })

  test('should render ModalComponent with right props', () => {
    expect(wrapper.find('ModalComponent').prop('visible')).toEqual(true)
    expect(wrapper.find('ModalComponent').prop('styleName')).toEqual('basketErrorModal')
  })

  test('should render basketErrorModalCloseX', () => {
    expect(wrapper.find('.basketErrorModalCloseX').exists()).toBe(true)
  })

  test('should render basketErrorRuleRow for each rule', () => {
    expect(wrapper.find('.basketErrorRuleRow')).toHaveLength(2)
  })

  test('should render ruleRecipeListRow for each recipe in rule', () => {
    expect(wrapper.find('.basketErrorRuleRow').first().find('.ruleRecipeListRow')).toHaveLength(1)
  })

  describe('when click on close button', () => {
    const closeModalFunction = jest.fn()
    beforeEach(() => {
      props = {
        title: '',
        shouldShow: true,
        shouldShowSwapButton: false,
        basketRecipeSwap: () => {},
        closeModal: closeModalFunction,
        brokenRulesToDisplay: [
          {
            description: 'Only 1 oven ready meal is available per order',
            recipes: [
              {
                imageUrl: 'url-for-image',
                title: 'Chicken',
              },
            ],
          },
          {
            description: 'Only 1 new-rule meal is available per order',
            recipes: [
              {
                imageUrl: 'url-for-image',
                title: 'Chicken',
              },
            ],
          },
        ],
      }
      wrapper = shallow(<BasketValidationErrorModal {...props} />)
    })

    test('should close modal from x', () => {
      wrapper.find('.basketErrorModalCloseX').simulate('click')
      expect(closeModalFunction).toHaveBeenCalled()
    })

    test('should close modal from Close button', () => {
      wrapper.find('.basketErrorModalCloseFullButton').simulate('click')
      expect(closeModalFunction).toHaveBeenCalled()
    })
  })

  describe('When showSwapButton is true', () => {
    const basketRecipeSwap = jest.fn()
    beforeEach(() => {
      props = {
        title: '',
        shouldShow: true,
        shouldShowSwapButton: true,
        basketRecipeSwap,
        closeModal: () => {},
        brokenRulesToDisplay: [
          {
            description: 'Only 1 oven ready meal is available per order',
            recipes: [
              {
                imageUrl: 'url-for-image',
                title: 'Chicken',
              },
            ],
          },
          {
            description: 'Only 1 new-rule meal is available per order',
            recipes: [
              {
                imageUrl: 'url-for-image',
                title: 'Chicken',
              },
            ],
          },
        ],
      }
      wrapper = shallow(<BasketValidationErrorModal {...props} />)
    })

    test('then it should show the swap button in modal', () => {
      expect(wrapper.find('.basketErrorModalSwapButton')).toHaveLength(1)
    })

    describe('when click on close button', () => {
      test('should trigger recipe swap from Swap button', () => {
        wrapper.find('.basketErrorModalSwapButton').simulate('click')
        expect(basketRecipeSwap).toHaveBeenCalled()
      })
    })
  })
})
