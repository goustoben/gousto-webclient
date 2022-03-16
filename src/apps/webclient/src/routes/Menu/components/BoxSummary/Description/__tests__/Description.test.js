import { shallow } from 'enzyme'
import React from 'react'
import { useSelector } from 'react-redux'
import { useCheckoutPrices } from 'routes/Menu/components/BoxSummary/utilHooks'
import { Description } from '../Description'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}))

jest.mock('../../utilHooks', () => ({
  ...jest.requireActual('../../utilHooks'),
  useCheckoutPrices: jest.fn().mockReturnValue({}),
  useDiscountTip: jest.fn().mockReturnValue('23% off your box'),
}))

describe('Description', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should return a paragraph', () => {
    const wrapper = shallow(<Description view="desktop" numPortions={2} numRecipes={1} />)

    expect(wrapper.type()).toEqual('p')
  })

  test('should have default messaging', () => {
    const wrapper = shallow(<Description view="desktop" numPortions={2} numRecipes={0} />)

    expect(wrapper.html().indexOf('Choose 2, 3 or 4 meals for 2 people') > -1).toEqual(true)
  })

  test('should have messaging based on number of recipes in basket', () => {
    const wrapper = shallow(<Description view="desktop" numPortions={2} numRecipes={3} />)

    expect(wrapper.html().indexOf('3 meals for 2 people added') > -1).toEqual(true)
  })

  test('should show a warning message if the warning prop is set', () => {
    const wrapper = shallow(<Description view="desktop" numPortions={2} numRecipes={3} warning />)

    expect(wrapper.html().indexOf('a change in your box') > -1).toEqual(true)
  })

  describe('when isSimplifyBasketBarEnabled is on', () => {
    let wrapper

    beforeEach(() => {
      useSelector.mockReturnValue(true)
    })

    describe('and when there are not enough recipes to checkout', () => {
      describe('and when there is no discount', () => {
        beforeEach(() => {
          wrapper = shallow(<Description view="desktop" numPortions={2} numRecipes={1} />)
        })

        test('then it should show the days part of the delivery tip', () => {
          expect(wrapper.text()).toBe('7 days a week')
        })
      })

      describe('and when there is a discount', () => {
        beforeEach(() => {
          useCheckoutPrices.mockReturnValue({
            isDiscountEnabled: true,
          })
          wrapper = shallow(<Description view="desktop" numPortions={2} numRecipes={1} />)
        })

        test('then it should show the delivery-as-additional-benefit tip', () => {
          expect(wrapper.text()).toBe('+ Free UK delivery')
        })
      })
    })

    describe('and when there are enough recipes to checkout', () => {
      describe('and when there is no discount', () => {
        beforeEach(() => {
          useCheckoutPrices.mockReturnValue({
            isDiscountEnabled: false,
          })
          wrapper = shallow(<Description view="desktop" numPortions={2} numRecipes={2} />)
        })

        test('then it should show the delivery tip without the comma', () => {
          expect(wrapper.text()).toBe('Free UK delivery')
        })
      })

      describe('and when there is a discount', () => {
        beforeEach(() => {
          useCheckoutPrices.mockReturnValue({
            isDiscountEnabled: true,
          })
          wrapper = shallow(<Description view="desktop" numPortions={2} numRecipes={2} />)
        })

        test('then it should show the discount tip', () => {
          expect(wrapper.text()).toBe('23% off your box')
        })
      })
    })
  })
})
