import React from 'react'
import { shallow } from 'enzyme'
import { BannerTastePreferences } from './BannerTastePreferences'

describe('BannerTastePreferences', () => {
  let wrapper
  describe('When shouldBannerShow is true', () => {
    beforeEach(() => {
      wrapper = shallow(<BannerTastePreferences shouldBannerShow />)
    })

    test('should show banner message', () => {
      expect(wrapper.find('.tasteProfileBannerMessage').text()).toEqual('Heres the full menu, ordered to your preferences')
    })

    test('should show banner icon', () => {
      expect(wrapper.find('.tasteProfileBannerIcon')).toHaveLength(1)
    })
  })

  describe('When shouldBannerShow is false', () => {
    beforeEach(() => {
      wrapper = shallow(<BannerTastePreferences shouldBannerShow={false} />)
    })

    test('should return null', () => {
      expect(wrapper.type()).toEqual(null)
    })
  })
})
