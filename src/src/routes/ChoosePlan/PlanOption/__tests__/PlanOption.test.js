import React from 'react'
import { shallow } from 'enzyme'
import { PlanOption } from '../PlanOption'

describe('PlanOption', () => {
  test('when totalPriceDiscounted is provided, should render both prices with full price struck through', () => {
    const wrapper = shallow(<PlanOption totalPrice='20.00' totalPriceDiscounted='10.00'/>)

    expect(wrapper.find('.totalPriceDiscounted').text()).toEqual('£20.00£10.00')
    expect(wrapper.find('s').text()).toEqual('£20.00')
  })

  test('when totalPriceDiscounted is not provided, should render the full price', () => {
    const wrapper = shallow(<PlanOption totalPrice='20.00'/>)

    expect(wrapper.find('.totalPriceDiscounted').exists()).toEqual(false)
    expect(wrapper.find('.totalPrice').text()).toEqual('£20.00')
  })
})
