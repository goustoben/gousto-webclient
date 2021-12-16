import { shallow } from 'enzyme'
import React from 'react'
import Immutable from 'immutable'

import { boxSummaryViews } from 'utils/boxSummary'
import { BoxSummaryContent as BoxSummary } from '../BoxSummaryContent/BoxSummaryContent'
import { DetailsContainer } from '../Details'
import { PostcodeContainer } from '../Postcode'
import { DeliverySlotContainer } from '../DeliverySlot'

describe('BoxSummaryContent', () => {
  const recipes = Immutable.Map()
  const defaultProps = {
    view: 'desktop',
    date: '',
    orderId: '',
    numPortions: 2,
    displayOptions: Immutable.List()
  }

  describe('boxSummaryCurrentView is boxSummaryViews.POSTCODE', () => {
    test('should ask me to enter my postcode', () => {
      const wrapper = shallow(<BoxSummary
        {...defaultProps}
        recipes={recipes}
        boxSummaryCurrentView={boxSummaryViews.POSTCODE}
      />)
      expect(wrapper.find(PostcodeContainer)).toHaveLength(1)
      expect(wrapper.find(DeliverySlotContainer)).toHaveLength(0)
      expect(wrapper.find(DetailsContainer)).toHaveLength(0)
    })
  })

  describe('boxSummaryCurrentView is boxSummaryViews.DELIVERY_SLOT', () => {
    test('should ask me to enter my delivery slot', () => {
      const wrapper = shallow(<BoxSummary
        {...defaultProps}
        recipes={recipes}
        boxSummaryCurrentView={boxSummaryViews.DELIVERY_SLOT}
      />)
      expect(wrapper.find(PostcodeContainer)).toHaveLength(0)
      expect(wrapper.find(DeliverySlotContainer)).toHaveLength(1)
      expect(wrapper.find(DetailsContainer)).toHaveLength(0)
    })
  })

  describe('boxSummaryCurrentView is boxSummaryViews.DETAILS', () => {
    test('should show me my basket', () => {
      const wrapper = shallow(<BoxSummary
        {...defaultProps}
        recipes={recipes}
        boxSummaryCurrentView={boxSummaryViews.DETAILS}
      />)
      expect(wrapper.find(PostcodeContainer)).toHaveLength(0)
      expect(wrapper.find(DeliverySlotContainer)).toHaveLength(0)
      expect(wrapper.find(DetailsContainer)).toHaveLength(1)
    })
  })

  describe('boxSummaryCurrentView is none of the defined values', () => {
    test('should not render any content', () => {
      const wrapper = shallow(<BoxSummary
        {...defaultProps}
        recipes={recipes}
        boxSummaryCurrentView=""
      />)
      expect(wrapper.find('div').prop('children')).toBe(null)
    })
  })
})
