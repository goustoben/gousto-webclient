import { shallow } from 'enzyme'
import React from 'react'
import { useSelector } from 'react-redux'
import { Description } from '../Description'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}))

jest.mock('../../utilHooks', () => ({
  ...jest.requireActual('../../utilHooks'),
  useCheckoutPrices: jest.fn().mockReturnValue({}),
  useDiscountTip: jest.fn().mockReturnValue(null),
}))

describe('Description', () => {
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
    beforeEach(() => {
      useSelector.mockReturnValue(true)
    })

    test('then it should render without crashing', () => {
      expect(() => {
        shallow(<Description view="desktop" numPortions={2} numRecipes={1} />)
      }).not.toThrow()
    })
  })
})
