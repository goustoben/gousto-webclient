import React from 'react'

import { mount } from 'enzyme'

import { DeliveryCard } from '../DeliveryCard'

describe('DeliveryCard', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(
      <DeliveryCard iconName="icon-calendar">
        <div>children here</div>
      </DeliveryCard>,
    )
  })

  test('should render correctly', () => {
    expect(wrapper.find(DeliveryCard).exists()).toBeTruthy()
  })
})
