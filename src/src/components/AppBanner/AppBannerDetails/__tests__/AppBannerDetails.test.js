import React from 'react'
import { mount } from 'enzyme'

import { AppBannerDetails } from '../AppBannerDetails'

let wrapper

const mockProps = {
  name: 'iOS',
  ratings: '60000',
}
const renderAppBannerDetails = (props = {}) => {
  wrapper = mount(<AppBannerDetails {...mockProps} {...props} />)
}

describe('AppBannerDetails', () => {
  beforeEach(() => {
    renderAppBannerDetails()
  })

  test('displays the correct number of stars', () => {
    expect(wrapper.find('div.star').length).toEqual(5)
  })

  test('displays the platform as expected', () => {
    expect(wrapper.find('[data-testing="app-banner-details-heading"]').text()).toEqual('Gousto for iOS')
  })

  test('displays the ratings as expected', () => {
    expect(wrapper.find('[data-testing="app-banner-details-ratings"]').text()).toEqual('(60000)')
  })
})
