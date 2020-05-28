import React from 'react'
import { shallow } from 'enzyme'
import { InfoBadges } from './InfoBadges'
import { InfoBadgeContainer } from './InfoBadgeContainer'
import { InfoBadgeSlugs } from './InfoBadgeSlugs'

describe('InfoBadges', () => {
  describe('when provided 1 slug', () => {
    const slugs = [InfoBadgeSlugs.OVEN_READY]

    test('should render 1 InfoBadgeContainer with the correct slug', () => {
      const wrapper = shallow(<InfoBadges slugs={slugs} />)

      const badge = wrapper.find(InfoBadgeContainer)
      expect(badge.length).toEqual(1)
      expect(badge.key()).toEqual(InfoBadgeSlugs.OVEN_READY)
      expect(badge.prop('slug')).toEqual(InfoBadgeSlugs.OVEN_READY)
    })
  })

  describe('when provided 2 slug', () => {
    const slugs = [InfoBadgeSlugs.OVEN_READY, InfoBadgeSlugs.NEW_RECIPE]

    test('should render 2 InfoBadgeContainers with the correct slugs, in order', () => {
      const wrapper = shallow(<InfoBadges slugs={slugs} />)

      const badges = wrapper.find(InfoBadgeContainer)
      expect(badges.length).toEqual(2)
      expect(badges.at(0).key()).toEqual(InfoBadgeSlugs.OVEN_READY)
      expect(badges.at(0).prop('slug')).toEqual(InfoBadgeSlugs.OVEN_READY)
      expect(badges.at(1).key()).toEqual(InfoBadgeSlugs.NEW_RECIPE)
      expect(badges.at(1).prop('slug')).toEqual(InfoBadgeSlugs.NEW_RECIPE)
    })
  })
})
