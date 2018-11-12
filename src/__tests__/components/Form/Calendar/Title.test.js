import React from 'react'

import sinon from 'sinon'

import Title from 'Form/Calendar/Title'

import { shallow } from 'enzyme'

describe('Form/Calendar/Title', () => {
  let wrapper
  let dates

  beforeEach(() => {
    dates = [
      {
        date: '2016-01-01',
        disabled: true,
      },
      {
        date: '2016-01-02',
        orderId: '123-123-123',
      },
      {
        date: '2016-01-03',
        icon: 'truck',
        orderId: '234-234-234',
      },
      {
        date: '2016-01-04',
        icon: 'truck',
        orderId: '345-345-345',
      },
      {
        date: '2016-01-05',
      },
      {
        date: '2016-01-06',
      },
    ]

    wrapper = shallow(<Title dates={dates} />)
  })

  test('should render a span', () => {
    expect(wrapper.type()).toEqual('span')
  })

  test('should render the date as `monthName year`', () => {
    expect(wrapper.text()).toEqual('January 2016')
  })

  describe('with dates spanning multiple months or years', () => {
    beforeEach(() => {
      dates = [
        {
          date: '2015-01-01',
          disabled: true,
        },
        {
          date: '2015-01-02',
          orderId: '123-123-123',
        },
        {
          date: '2015-01-03',
          icon: 'truck',
          orderId: '234-234-234',
        },
        {
          date: '2016-01-04',
          icon: 'truck',
          orderId: '345-345-345',
        },
        {
          date: '2016-01-05',
        },
        {
          date: '2016-01-06',
        },
      ]

      wrapper = shallow(<Title dates={dates} />)
    })

    test('should render the date as `monthName year / monthName year`', () => {
      expect(wrapper.text()).toEqual('January 2015 / January 2016')
    })
  })

  describe('with dates spanning multiple months', () => {
    beforeEach(() => {
      dates = [
        {
          date: '2016-11-01',
          disabled: true,
        },
        {
          date: '2016-11-02',
          orderId: '123-123-123',
        },
        {
          date: '2016-11-03',
          icon: 'truck',
          orderId: '234-234-234',
        },
        {
          date: '2016-12-04',
          icon: 'truck',
          orderId: '345-345-345',
        },
        {
          date: '2016-12-05',
        },
        {
          date: '2016-12-06',
        },
      ]

      wrapper = shallow(<Title dates={dates} />)
    })

    test('should render the date as `monthName year / monthName year`', () => {
      expect(wrapper.text()).toEqual('November 2016 / December 2016')
    })
  })
})
