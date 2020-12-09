import React from 'react'
import { mount } from 'enzyme'
import { Breadcrumbs } from '../Breadcrumbs'

describe('Breadcrumbs', () => {
  let wrapper
  const trackCheckoutNavigationLinks = jest.fn()
  const items = [
    {
      id: 'account',
      label: 'Account'
    },
    {
      id: 'delivery',
      label: 'Delivery'
    }
  ]
  const currentId = 'account'

  beforeEach(() => {
    wrapper = mount(
      <Breadcrumbs
        currentId={currentId}
        trackCheckoutNavigationLinks={trackCheckoutNavigationLinks}
        items={items}
      />
    )
  })

  test('should renders correctly', () => {
    expect(wrapper.find(Breadcrumbs).exists()).toBeTruthy()
  })
})
