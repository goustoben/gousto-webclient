import { shallow, mount } from 'enzyme'
import React from 'react'
import Immutable from 'immutable'

import { boxSummaryViews } from 'utils/boxSummary'

import { BoxSummaryContent as BoxSummary } from '../BoxSummaryContent/BoxSummaryContent'
import Details from '../Details'
import Postcode from '../Postcode'
import DeliverySlot from '../DeliverySlot'

describe('BoxSummaryContent', () => {
  const recipes = Immutable.Map()

  describe('boxSummaryCurrentView is boxSummaryViews.POSTCODE', () => {
    test('should ask me to enter my postcode', () => {
      const wrapper = shallow(<BoxSummary
        view="desktop"
        numPortions={2}
        recipes={recipes}
        showDetails={false}
        boxDetailsVisibilityChange={() => { }}
        boxSummaryCurrentView={boxSummaryViews.POSTCODE}
        loadPrices={() => { }}
      />)
      expect(wrapper.find(Postcode)).toHaveLength(1)
      expect(wrapper.find(DeliverySlot)).toHaveLength(0)
      expect(wrapper.find(Details)).toHaveLength(0)
    })
  })

  describe('boxSummaryCurrentView is boxSummaryViews.DELIVERY_SLOT', () => {
    test('should ask me to enter my delivery slot', () => {
      const deliveryDays = Immutable.fromJS([
        { date: '2017-01-01', slots: [] },
      ])
      const wrapper = shallow(<BoxSummary
        view="desktop"
        numPortions={2}
        recipes={recipes}
        showDetails={false}
        boxDetailsVisibilityChange={() => { }}
        postcode="W37UN"
        deliveryDays={deliveryDays}
        boxSummaryCurrentView={boxSummaryViews.DELIVERY_SLOT}
        loadPrices={() => { }}
      />)
      expect(wrapper.find(Postcode)).toHaveLength(0)
      expect(wrapper.find(DeliverySlot)).toHaveLength(1)
      expect(wrapper.find(Details)).toHaveLength(0)
    })
  })

  describe('boxSummaryCurrentView is boxSummaryViews.DETAILS', () => {
    test('should show me my basket', () => {
      const wrapper = shallow(<BoxSummary
        view="desktop"
        numPortions={2}
        recipes={recipes}
        showDetails={false}
        boxDetailsVisibilityChange={() => { }}
        postcode="W37UN"
        slotId="slotId"
        boxSummaryCurrentView={boxSummaryViews.DETAILS}
        loadPrices={() => { }}
      />)
      expect(wrapper.find(Postcode)).toHaveLength(0)
      expect(wrapper.find(DeliverySlot)).toHaveLength(0)
      expect(wrapper.find(Details)).toHaveLength(1)
    })
  })

  test('should load prices on componentDidMount', () => {
    const loadPrices = jest.fn()

    mount(
      <BoxSummary
        view="desktop"
        numPortions={2}
        recipes={recipes}
        showDetails={false}
        boxDetailsVisibilityChange={() => { }}
        postcode="W37UN"
        slotId="slotId"
        loadPrices={loadPrices}
      />
    )

    expect(loadPrices).toHaveBeenCalledTimes(1)
  })
})
