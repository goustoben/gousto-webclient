import React from 'react'
import { mount } from 'enzyme'
import { ActiveSubscription } from '../ActiveSubscription'

jest.mock('../sections/YourSubscriptionDetails/DeliveryDayAndTime', () => ({
  DeliveryDayAndTime: () => <div />
}))

jest.mock('../sections/YourSubscriptionDetails/Frequency', () => ({
  Frequency: () => <div />
}))

const sections = ['your-subscription-details', 'chef-selects-settings', 'total-price', 'skip-a-box', 'pause-subscription']

describe('ActiveSubscription', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(<ActiveSubscription accessToken="access-token" isMobile={false} />)
  })

  test.each(sections)('renders %s section', (sectionName) => {
    expect(wrapper.find(`[data-testing="${sectionName}-section"]`).exists()).toBeTruthy()
  })
})
