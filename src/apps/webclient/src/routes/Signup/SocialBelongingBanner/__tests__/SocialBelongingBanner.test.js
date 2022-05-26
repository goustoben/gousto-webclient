import React from 'react'

import { shallow } from 'enzyme'

import { SocialBelongingBanner } from '../SocialBelongingBanner'

describe('given SocialBelongingBanner component', () => {
  let wrapper
  const amountOfCustomers = 100
  const district = 'Ealing'
  const trackBannerAppearance = jest.fn()

  beforeEach(() => {
    wrapper = shallow(
      <SocialBelongingBanner
        amountOfCustomers={amountOfCustomers}
        district={district}
        trackBannerAppearance={trackBannerAppearance}
      />,
    )
  })

  describe('when component is mounted', () => {
    test('then it should be rendered correctly', () => {
      expect(wrapper.find('.socialBelongingContainer').exists()).toBeTruthy()
      expect(wrapper.find('DeliveryCard').exists()).toBeTruthy()
    })
  })
})
