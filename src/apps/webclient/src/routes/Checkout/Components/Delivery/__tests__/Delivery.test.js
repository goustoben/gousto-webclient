import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'
import { FormSection } from 'redux-form'
import { Delivery } from '../Delivery'

describe('Delivery', () => {
  let wrapper
  const props = {
    deliveryDays: Immutable.Map([]),
    slotId: '',
    date: '',
  }

  beforeEach(() => {
    wrapper = shallow(<Delivery {...props} />)
  })

  test('should render correctly', () => {
    expect(wrapper.type()).toEqual('div')
    expect(wrapper.find(FormSection)).toHaveLength(1)
    expect(wrapper.find('DeliveryCard')).toHaveLength(1)
  })
})
