import React from 'react'
import { shallow } from 'enzyme'
import { OrderSchedule } from '../OrderSchedule'

describe('OrderSchedule', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<OrderSchedule />)
  })

  it('should render three event dates', () => {
    expect(wrapper.find('EventDate').length).toEqual(3)
  })

  it('should not render an order summary on desktop', () => {
    expect(wrapper.find('OrderSummary').length).toEqual(0)
  })
})
