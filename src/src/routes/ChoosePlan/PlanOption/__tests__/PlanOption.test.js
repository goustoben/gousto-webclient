import React from 'react'
import { shallow } from 'enzyme'
import { PlanOption } from '../PlanOption'

describe('PlanOption', () => {
  test('when totalPriceDiscounted is provided, should render both prices with full price struck through', () => {
    const wrapper = shallow(<PlanOption totalPrice='20.00' totalPriceDiscounted='10.00' />)

    expect(wrapper.find('.totalPriceDiscounted').text()).toEqual('£20.00£10.00')
    expect(wrapper.find('s').text()).toEqual('£20.00')
  })

  test('when totalPriceDiscounted is not provided, should render the full price', () => {
    const wrapper = shallow(<PlanOption totalPrice='20.00' />)

    expect(wrapper.find('.totalPriceDiscounted').exists()).toEqual(false)
    expect(wrapper.find('.totalPrice').text()).toEqual('£20.00')
  })

  test('when totalPriceDiscounted is equal to totalPrice, should render the full price', () => {
    const wrapper = shallow(<PlanOption totalPrice='20.00' totalPriceDiscounted='20.00' />)

    expect(wrapper.find('.totalPriceDiscounted').exists()).toEqual(false)
    expect(wrapper.find('.totalPrice').text()).toEqual('£20.00')
  })

  test('should show excl extras message if any extras have been chosen', () => {
    const wrapper = shallow(<PlanOption totalPrice='20.00' showExclExtras />)

    expect(wrapper.find('.exclExtras').length).toEqual(1)
  })

  test('should NOT show excl extras message if no extras have been chosen', () => {
    const wrapper = shallow(<PlanOption totalPrice='20.00' showExclExtras={false} />)

    expect(wrapper.find('.exclExtras').length).toEqual(0)
  })
})
