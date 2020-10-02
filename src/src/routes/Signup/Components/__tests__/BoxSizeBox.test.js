import React from 'react'
import Immutable from 'immutable'
import { shallow } from 'enzyme'
import { signupConfig } from 'config/signup'
import { BoxSizeBox } from '../BoxSizeBox/BoxSizeBox'

describe('given we are rendering BoxSizeBox', () => {
  let wrapper
  const numPortionChange = jest.fn()
  const numPortionChangeTracking = jest.fn()
  const next = jest.fn()

  const numPersons = 4

  beforeEach(() => {
    wrapper = shallow(
      <BoxSizeBox
        numPortionChange={numPortionChange}
        numPortionChangeTracking={numPortionChangeTracking}
        next={next}
        numPersons={numPersons}
      />
    )
  })

  describe('when the price data is not available', () => {
    test('then it renders a loader instead of prices', () => {
      expect(wrapper.find('.title').text()).toMatch(new RegExp(`${numPersons}\\s+people`))
      expect(wrapper.find('.subtitle').text()).toBe(
        signupConfig.boxSizeStep.boxSize[numPersons].description
      )

      expect(wrapper.find('Loader')).toHaveLength(1)

      expect(wrapper.find('.price')).toHaveLength(0)
      expect(wrapper.find('.redPrice')).toHaveLength(0)
      expect(wrapper.find('DiscountAppliedNotice')).toHaveLength(0)
      expect(wrapper.find('Button')).toHaveLength(1)
    })
  })

  describe('when there is no discount', () => {
    beforeEach(() => {
      const boxPrices = Immutable.fromJS({
        promoCodeValid: false,
        recipeTotal: '31.75',
        recipeTotalDiscounted: '31.75'
      })
      wrapper.setProps({ boxPrices })
    })

    test('then it renders correctly', () => {
      expect(wrapper.find('.title').text()).toMatch(new RegExp(`${numPersons}\\s+people`))
      expect(wrapper.find('.subtitle').text()).toBe(
        signupConfig.boxSizeStep.boxSize[numPersons].description
      )

      expect(wrapper.find('Loader')).toHaveLength(0)

      expect(wrapper.find('.price').text()).toBe('£31.75')
      expect(wrapper.find('.redPrice')).toHaveLength(0)
      expect(wrapper.find('DiscountAppliedNotice')).toHaveLength(0)
      expect(wrapper.find('Button')).toHaveLength(1)
    })

    test('then clicking the button sets the number of portions', () => {
      wrapper.find('Button').simulate('click')
      expect(numPortionChange).toHaveBeenCalledWith(numPersons)
      expect(numPortionChangeTracking).toHaveBeenCalledWith(numPersons)
      expect(next).toHaveBeenCalledWith()
    })
  })

  describe('when a discount is applied', () => {
    const boxPrices = Immutable.fromJS({
      promoCodeValid: true,
      recipeTotal: '24.99',
      recipeTotalDiscounted: '17.50'
    })

    beforeEach(() => {
      wrapper.setProps({ boxPrices, numPersons: 2 })
    })

    test('then it renders prices after and before discount', () => {
      expect(wrapper.find('.title').text()).toMatch(/2\s+people/)
      expect(wrapper.find('.subtitle').text()).toBe(signupConfig.boxSizeStep.boxSize[2].description)
      expect(wrapper.find('.price').text()).toBe('£17.50')
      expect(wrapper.find('.redPrice').text()).toBe('£24.99')
      expect(wrapper.find('DiscountAppliedNotice')).toHaveLength(1)
      expect(wrapper.find('Button')).toHaveLength(1)
    })
  })
})
