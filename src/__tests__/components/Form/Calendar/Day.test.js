import React from 'react'
import { shallow } from 'enzyme'

import sinon from 'sinon'

import Day from 'Form/Calendar/Day'

describe('Form/Calendar/Day', () => {
  let date
  let weekNo
  let dayNo
  let selected
  let disabled
  let onClick
  let icon
  let orderId
  let className

  let wrapper

  beforeEach(() => {
    date = '2016-01-01'
    weekNo = '201601'
    dayNo = '1'
    selected = false
    disabled = false
    onClick = sinon.spy()
    icon = 'truck'
    orderId = '123-123-123'
    className = 'hi'

    wrapper = shallow(
			<Day
			  date={date}
			  weekNo={weekNo}
			  dayNo={dayNo}
			  selected={selected}
			  disabled={disabled}
			  onClick={onClick}
			  icon={icon}
			  orderId={orderId}
			  className={className}
			/>,
    )
  })

  test('should return a div', () => {
    expect(wrapper.type()).toEqual('div')
  })

  test('should have an icon', () => {
    expect(wrapper.find('span').length).toEqual(2)
  })

  describe('without a date', () => {
    beforeEach(() => {
      date = ''
      dayNo = '02'
      wrapper = shallow(
				<Day
				  date={date}
				  weekNo={weekNo}
				  dayNo={dayNo}
				  selected={selected}
				  disabled={disabled}
				  onClick={onClick}
				  icon={icon}
				  orderId={orderId}
				  className={className}
				/>,
      )
    })

    test('should have text which is the day date', () => {
      expect(wrapper.text()).toEqual('05')
    })
  })

  describe('disabled without a date', () => {
    beforeEach(() => {
      date = ''
      disabled = true
      dayNo = '02'
      wrapper = shallow(
				<Day
				  date={date}
				  weekNo={weekNo}
				  dayNo={dayNo}
				  selected={selected}
				  disabled={disabled}
				  onClick={onClick}
				  icon={icon}
				  orderId={orderId}
				  className={className}
				/>,
      )
    })

    test('should have text which is the day date', () => {
      expect(wrapper.text()).toEqual('05')
    })
  })

  describe('disabled with a date', () => {
    beforeEach(() => {
      date = '2016-12-25'
      weekNo = '201652'
      dayNo = '7'
      disabled = true

      wrapper = shallow(
				<Day
				  date={date}
				  weekNo={weekNo}
				  dayNo={dayNo}
				  selected={selected}
				  disabled={disabled}
				  onClick={onClick}
				  icon={icon}
				  orderId={orderId}
				  className={className}
				/>,
      )
    })

    test('should have text which is the day date', () => {
      expect(wrapper.text()).toEqual('25')
    })
  })
})
