import React from 'react'
import { mount } from 'enzyme'
import { PausedSubscription } from '../PausedSubscription'
const sections = ['resubscribe', 'order-a-box']

jest.mock('../sections/OrderABox', () => ({
  OrderABox: () => <div />
}))

describe('PausedSubscription', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(<PausedSubscription />)
  })

  test.each(sections)('renders %s section', (sectionName) => {
    expect(wrapper.find(`[data-testing="${sectionName}-section"]`).exists()).toBeTruthy()
  })
})
