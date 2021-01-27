import React from 'react'
import { mount } from 'enzyme'
import { ActiveSubscription } from '../ActiveSubscription'

jest.mock('../sections/YourSubscriptionDetails/DeliveryDayAndTime', () => ({
  DeliveryDayAndTime: () => <div />
}))

jest.mock('../sections/YourSubscriptionDetails/Frequency', () => ({
  Frequency: () => <div />
}))

jest.mock('../sections/ChefSelectsSettings/MealsPerBox', () => ({
  MealsPerBox: () => <div />
}))

jest.mock('../sections/YourSubscriptionDetails/BoxSize', () => ({
  BoxSize: () => <div />
}))

jest.mock('../sections/ChefSelectsSettings/DietaryPreference', () => ({
  DietaryPreference: () => <div />
}))

jest.mock('../sections/SkipABox', () => ({
  SkipABox: () => <div />
}))

jest.mock('../sections/TotalPrice', () => ({
  TotalPrice: () => <div />
}))

jest.mock('../ResubscriptionModal', () => ({
  ResubscriptionModal: () => <div />
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
