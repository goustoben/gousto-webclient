import React from 'react'
import { shallow } from 'enzyme'

import { SubscriberPricingInfoPanel } from '../SubscriberPricingInfoPanel'

describe('Subscriber pricing Recovery Info Panel', () => {
  let wrapper

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('When a non-eligible panel is rendered', () => {
    beforeEach(() => {
      wrapper = shallow(
        <SubscriberPricingInfoPanel
          variant="noOffer"
        />
      )
    })

    test('then "noOffer" class is rendered', () => {
      expect(wrapper.find('.noOffer').length).toEqual(1)
    })
  })

  describe('When an eligible panel is rendered', () => {
    beforeEach(() => {
      wrapper = shallow(
        <SubscriberPricingInfoPanel
          variant="offer"
        />
      )
    })

    test('then "offer" class is rendered', () => {
      expect(wrapper.find('.offer').length).toEqual(1)
    })
  })
})
