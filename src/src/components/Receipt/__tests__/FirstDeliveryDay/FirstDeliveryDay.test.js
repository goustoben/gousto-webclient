import React from 'react'
import { mount } from 'enzyme'
import Immutable from 'immutable'

import { FirstDeliveryDay } from '../../FirstDeliveryDay/FirstDeliveryDay'

describe('FirstDeliveryDay', () => {
  let wrapper
  const props = {
    date: '2020-02-17',
    slotId: 'slotId',
    deliveryDays: Immutable.fromJS({
      '2020-02-17': {
        slots: [{
          id: 'slotId',
          deliveryStartTime: '08:00:00',
          deliveryEndTime: '12:00:00'
        }, { id: 'a'}, { id: 'b' }]
      },
    }),
  }

  beforeEach(() => {
    wrapper = mount(<FirstDeliveryDay {...props} />)
  })

  test('should render FirstDeliveryDay properly', () => {
    const [,, deliveryDate] = wrapper.prop('date').split('-')
    const expectedDayTimeSlot = `Mon ${deliveryDate} Feb, 8am - 12pm `

    expect(wrapper.find('time').text()).toEqual(expectedDayTimeSlot)
  })
})
