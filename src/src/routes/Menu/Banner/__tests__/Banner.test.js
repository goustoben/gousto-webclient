import React from 'react'
import { mount } from 'enzyme'

import { JoeWicksBanner } from 'routes/Menu/JoeWicksBanner'
import { ChristmasBanner } from 'routes/Menu/ChristmasBanner'

import { Banner } from 'routes/Menu/Banner'

describe('Banner', () => {
  let wrapper

  const isoStringDateOffsetBy = (minutes) => (
    new Date((new Date().setMinutes(new Date().getMinutes() + minutes))).toISOString()
  )

  describe('before the switchover date', () => {
    beforeEach(() => {
      wrapper = mount(<Banner
        switchoverDate={isoStringDateOffsetBy(2880)}  
      />)
    })

    test('should render a ChristmasBanner', () => {
      expect(wrapper.find(JoeWicksBanner)).toHaveLength(0)
      expect(wrapper.find(ChristmasBanner)).toHaveLength(1)
    })
  })

  describe('on the switchover date', () => {
    beforeEach(() => {
      wrapper = mount(<Banner
        switchoverDate={isoStringDateOffsetBy(0)}  
      />)
    })

    test('should render a JoeWicksBanner', () => {
      expect(wrapper.find(JoeWicksBanner)).toHaveLength(1)
      expect(wrapper.find(ChristmasBanner)).toHaveLength(0)
    })
  })

  describe('after the switchover date', () => {
    beforeEach(() => {
      wrapper = mount(<Banner
        switchoverDate={isoStringDateOffsetBy(-2880)}  
      />)
    })

    test('should render a JoeWicksBanner', () => {
      expect(wrapper.find(JoeWicksBanner)).toHaveLength(1)
      expect(wrapper.find(ChristmasBanner)).toHaveLength(0)
    })
  })
})
