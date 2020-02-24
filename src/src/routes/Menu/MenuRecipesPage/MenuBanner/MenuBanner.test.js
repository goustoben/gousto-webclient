import React from 'react'
import { shallow } from 'enzyme'
import moment from 'moment'
import { MenuBanner } from './index'

jest.mock('config/menu', () => ({
  noMenu: {
    switchoverDate: '2020-02-03T12:00:00+01:00'
  }
}))
jest.mock('moment')

describe('MenuBanner', () => {
  let wrapper
  describe('when switch over is now or after current moment', () => {
    beforeEach(() => {
      moment.mockReturnValue({
        isSameOrAfter: () => true
      })
    })
    test('should return null', () => {
      wrapper = shallow(<MenuBanner />)
      expect(wrapper.equals(null)).toBe(true)
    })
  })

  describe('when switch over is not after current moment', () => {
    beforeEach(() => {
      moment.mockReturnValue({
        isSameOrAfter: () => false
      })
    })
    test('should return Banner', () => {
      wrapper = shallow(<MenuBanner />)
      expect(wrapper.find('Banner')).toHaveLength(1)
    })
  })
})
