import React from 'react'
import { mount } from 'enzyme'
import { Calendar } from 'routes/Signup/Components/Calendar/Calendar'
import { DeliveryDay } from 'routes/Signup/Components/Calendar/models/DeliveryDay'
import moment from 'moment'

const DELIVERY_DAY_FORMAT = 'YYYY-MM-DD'
jest.mock('moment', () => () => jest.requireActual('moment')('2020-01-15', DELIVERY_DAY_FORMAT))

describe('<Calendar /> component', () => {
  const onDayChange = jest.fn()
  const defaultProps = {
    // 7 days * 4 weeks - 1 starting day
    deliveryDays: new Array<DeliveryDay | null>(7 * 4 - 1).fill(null).map((_, day) => {
      const dateString = moment().add(day, 'days').format(DELIVERY_DAY_FORMAT)

      return {
        date: dateString,
        value: dateString,
        disabled: day % 2 === 1,
        label: `${dateString} delivery day label`,
      } as DeliveryDay
    }),
    selectedDay: '2020-01-16',
    onDayChange,
  }

  describe('when rendered', () => {
    test('should not crash', () => {
      expect(() => {
        mount(<Calendar {...defaultProps} />)
      }).not.toThrow()
    })
  })

  describe('when 4 weeks of delivery days provided', () => {
    test('should render 4 rows of calendar', () => {
      const wrapper = mount(<Calendar {...defaultProps} />)
      const rowsNumber = wrapper.find('tr').hostNodes().length
      expect(rowsNumber).toBe(5) // 1 header row + 4 calendar rows
    })
  })

  describe('when 3 weeks of delivery days provided', () => {
    test('should render 3 rows of calendar', () => {
      const wrapper = mount(
        <Calendar {...defaultProps} deliveryDays={defaultProps.deliveryDays.slice(0, 2)} />
      )
      const rowsNumber = wrapper.find('tr').hostNodes().length
      expect(rowsNumber).toBe(4) // 1 header row + 3 calendar rows
    })
  })
})
