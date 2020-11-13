import React from 'react'
import { mount } from 'enzyme'
import { ActiveSubscription } from '../ActiveSubscription'
const sections = ['your-subscription-details', 'chef-selects-settings', 'total-price', 'skip-a-box', 'pause-subscription']

describe('ActiveSubscription', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(<ActiveSubscription />)
  })

  test.each(sections)('renders %s section', (sectionName) => {
    expect(wrapper.find(`[data-testing="${sectionName}-section"]`).exists()).toBeTruthy()
  })
})
