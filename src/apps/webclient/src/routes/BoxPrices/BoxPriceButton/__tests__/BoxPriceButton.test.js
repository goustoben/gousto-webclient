import React from 'react'
import { shallow } from 'enzyme'

import { BoxPriceButton } from '../BoxPriceButton'

describe('given BoxPriceButton is rendered', () => {
  let wrapper
  const boxPricesBoxSizeSelected = jest.fn()

  beforeEach(() => {
    wrapper = shallow(
      <BoxPriceButton numPersons={2} boxPricesBoxSizeSelected={boxPricesBoxSizeSelected}>
        test button text
      </BoxPriceButton>,
    )
  })

  test('then it should render correctly', () => {
    expect(wrapper.find('Segment')).toHaveLength(1)
    expect(wrapper.find('Segment').childAt(0).text()).toBe('test button text')
  })

  describe('when clicked', () => {
    test('for 2 people: then it should invoke the callback', () => {
      wrapper.find('Segment').simulate('click')
      expect(boxPricesBoxSizeSelected).toHaveBeenCalledWith(2)
    })

    test('for 4 people: then it should invoke the callback', () => {
      wrapper.setProps({ numPersons: 4 })
      wrapper.find('Segment').simulate('click')
      expect(boxPricesBoxSizeSelected).toHaveBeenCalledWith(4)
    })
  })
})
