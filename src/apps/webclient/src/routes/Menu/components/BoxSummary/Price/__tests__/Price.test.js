import React from 'react'
import { shallow } from 'enzyme'
import { useSelector } from 'react-redux'

import { Price } from '../Price'
import css from '../Price.css'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}))

describe('<Price />', () => {
  let wrapper

  const [recipeTotal, recipeDiscount, recipeTotalDiscounted] = [39.99, 0.0, 39.99]

  beforeEach(() => {
    wrapper = shallow(<Price />)
  })

  test('should display a dash by default', () => {
    expect(wrapper.text().indexOf('£-') > -1).toBe(true)
  })

  test('should render a formatted recipeTotal', () => {
    wrapper.setProps({
      recipeTotal,
      recipeDiscount,
      recipeTotalDiscounted,
    })

    expect(wrapper.text().indexOf('£39.99') > -1).toBe(true)
  })

  test('should render a receipeTotal and a discountedPrice if applicable', () => {
    wrapper.setProps({
      recipeTotal: 39.99,
      recipeDiscount: 5.0,
      recipeTotalDiscounted: 34.99,
    })

    expect(wrapper.text().indexOf('£39.99') > -1).toBe(true)
    expect(wrapper.text().indexOf('£34.99') > -1).toBe(true)
  })

  test('should strike through receipeTotal if it also has a discounted price', () => {
    wrapper.setProps({
      recipeTotal: 39.99,
      recipeDiscount: 5.0,
      recipeTotalDiscounted: 34.99,
    })
    const strikeClassSelector = `.${css.total.split(' ').join('.')}`

    expect(wrapper.find(strikeClassSelector).length).toBe(1)
    expect(wrapper.text().indexOf('£34.99') > -1).toBe(true)
  })

  describe('when isSimplifyBasketBarEnabled is on', () => {
    beforeEach(() => {
      useSelector.mockReturnValue(true)
      wrapper.setProps({
        recipeTotal,
        recipeDiscount,
        recipeTotalDiscounted,
      })
    })

    test('then it should render the variant', () => {
      expect(wrapper.find('span').hasClass('primaryPrice')).toBe(true)
    })
  })
})
