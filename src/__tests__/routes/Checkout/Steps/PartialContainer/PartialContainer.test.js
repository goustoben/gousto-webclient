import { shallow } from 'enzyme'
import React from 'react'
import PartialContainer from 'routes/Checkout/Components/PartialContainer'
import Payment from 'routes/Checkout/Components/Payment'

describe('PartialContainer', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<PartialContainer />)
  })

  test('should render a <div> with no props', () => {
    expect(wrapper.type()).toEqual('div')
  })

  test('should NOT render <Payment /> components', () => {
    wrapper = shallow(
			<PartialContainer>
				<Payment />
			</PartialContainer>,
    )
    expect(wrapper.find(Payment).length).toEqual(0)
  })

  test('should render 1 <Payment /> components', () => {
    wrapper = shallow(
			<PartialContainer visible>
				<Payment />
			</PartialContainer>,
    )
    expect(wrapper.find(Payment).length).toEqual(1)
  })
})
