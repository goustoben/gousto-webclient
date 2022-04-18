import React from 'react'
import { mount } from 'enzyme'
import moment from 'moment'
import { CalendarDay } from 'routes/Signup/Components/Calendar/CalendarDay/CalendarDay'

describe('<CalendarSpan /> component', () => {
  const onDayClick = jest.fn()
  const dayToday = moment('2020-01-15', 'YYYY-MM-DD')
  const defaultProps = {
    date: dayToday,
    isSelected: true,
    isBeforeTodayDate: true,
    isToday: true,
    isDeliveryDay: false,
    onDayClick,
  }
  describe('when rendered', () => {
    test('should not crash', () => {
      expect(() => {
        mount(<CalendarDay {...defaultProps} />)
      }).not.toThrow()
    })

    test('should assign correct classes', () => {
      const wrapper = mount(<CalendarDay {...defaultProps} />)
      const button = wrapper.find('button').hostNodes()
      expect(button.hostNodes().hasClass('dayBeforeToday')).toEqual(true)
      expect(button.hostNodes().hasClass('todayDay')).toEqual(true)
      expect(button.hostNodes().hasClass('disabled')).toEqual(true)
      expect(button.hostNodes().hasClass('selectedDay')).toEqual(true)
    })

    test('should display correct day', () => {
      const wrapper = mount(<CalendarDay {...defaultProps} />)
      const button = wrapper.find('button').hostNodes()
      expect(button.text()).toBe(dayToday.date().toString())
    })

    test('should call onDayClick when clicked', () => {
      const wrapper = mount(<CalendarDay {...defaultProps} isDeliveryDay />)
      const button = wrapper.find('button').hostNodes()
      button.simulate('click')
      expect(onDayClick).toBeCalled()
    })
  })
})
