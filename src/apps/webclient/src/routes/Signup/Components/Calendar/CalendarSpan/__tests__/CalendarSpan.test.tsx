import React from 'react'

import { mount } from 'enzyme'
import moment from 'moment'

import { CalendarSpan } from 'routes/Signup/Components/Calendar/CalendarSpan/CalendarSpan'

jest.mock('moment', () => () => jest.requireActual('moment')('2020-01-15', 'YYYY-MM-DD'))

describe('<CalendarSpan /> component', () => {
  describe('when rendered', () => {
    test('should not crash', () => {
      expect(() => {
        mount(<CalendarSpan lastCalendarDay={moment()} />)
      }).not.toThrow()
    })
  })

  describe('when calendar ends on same month as today', () => {
    test('should collapse 2 month names', () => {
      const wrapper = mount(<CalendarSpan lastCalendarDay={moment().add(3, 'days')} />)
      const spanLabel = wrapper.find('span').text()
      expect(spanLabel).toEqual('15 - 18 Jan')
    })
  })

  describe('when calendar ends on different month from today', () => {
    test('should display 2 month names', () => {
      const wrapper = mount(<CalendarSpan lastCalendarDay={moment().add(30, 'days')} />)
      const spanLabel = wrapper.find('span').text()
      expect(spanLabel).toEqual('15 Jan - 14 Feb')
    })
  })
})
