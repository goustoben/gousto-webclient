import React from 'react'
import { shallow } from 'enzyme'
import moment from 'moment'
import { MenuBanner } from './MenuBanner'

jest.mock('config/menu', () => ({
  defaultMenu: {
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
    describe('when hideMenuBanner is true', () => {
      test('should return null', () => {
        wrapper = shallow(<MenuBanner hideMenuBanner />)
        expect(wrapper.equals(null)).toBe(true)
      })
    })

    describe('when hideMenuBanner is false', () => {
      test('should return null', () => {
        wrapper = shallow(<MenuBanner hideMenuBanner={false} />)
        expect(wrapper.find('Banner')).toHaveLength(1)
        expect(wrapper.find('Banner').prop('type')).toEqual('default')
      })
    })
  })

  describe('when switch over is NOT after current moment', () => {
    beforeEach(() => {
      moment.mockReturnValue({
        isSameOrAfter: () => false
      })
    })
    test('should return febyouary Banner', () => {
      wrapper = shallow(<MenuBanner hideMenuBanner={false} />)
      expect(wrapper.find('Banner')).toHaveLength(1)
      expect(wrapper.find('Banner').prop('type')).toEqual('febyouary')
    })
  })
})
