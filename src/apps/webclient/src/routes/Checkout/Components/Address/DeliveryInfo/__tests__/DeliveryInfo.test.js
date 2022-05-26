import React from 'react'

import Svg from 'Svg'
import { shallow } from 'enzyme'

import { DeliveryInfo } from '../DeliveryInfo'

describe('DeliveryInfo', () => {
  let wrapper

  test('should render by default', () => {
    wrapper = shallow(<DeliveryInfo />)

    expect(wrapper.find(Svg)).toBeTruthy()
  })

  test('should format dates', () => {
    wrapper = shallow(<DeliveryInfo deliveryDate="2018-06-04" cutOffDate="2018-06-01" />)

    expect(wrapper.text()).toContain('will arrive on Mondays')
    expect(wrapper.text()).toContain('until midday on Friday')
  })

  describe('frequency', () => {
    test('should display weekly by default', () => {
      wrapper = shallow(<DeliveryInfo />)

      expect(wrapper.text()).toContain('Your weekly Gousto box')
      expect(wrapper.text()).toContain('each week')
    })

    test('should display the passed frequency within the text', () => {
      wrapper = shallow(<DeliveryInfo frequency="fortnightly" />)

      expect(wrapper.text()).toContain('Your fortnightly Gousto box')
      expect(wrapper.text()).toContain('each fortnight')

      wrapper = shallow(<DeliveryInfo frequency="quarterly" />)

      expect(wrapper.text()).toContain('Your quarterly Gousto box')
      expect(wrapper.text()).toContain('each quarter')
    })
  })
})
