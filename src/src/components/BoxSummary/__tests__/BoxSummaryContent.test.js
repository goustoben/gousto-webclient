import { shallow, mount } from 'enzyme'
import React from 'react'
import Immutable from 'immutable'

import { boxSummaryViews } from 'utils/boxSummary'

import { BoxSummaryContent as BoxSummary } from '../BoxSummaryContent/BoxSummaryContent'
import Details from '../Details'
import Postcode from '../Postcode'
import DeliverySlot from '../DeliverySlot'

describe('BoxSummary', () => {
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

  test('should load prices when one of the observable props changes', () => {
    const loadPrices = jest.fn()
    const wrapper = mount(
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

    wrapper.setProps({ date: '2017-10-23' })

    expect(loadPrices).toHaveBeenCalledTimes(2)

    wrapper.setProps({ numPortions: 4 })

    expect(loadPrices).toHaveBeenCalledTimes(3)

    wrapper.setProps({ orderId: '4' })

    expect(loadPrices).toHaveBeenCalledTimes(4)

    wrapper.setProps({ recipes: Immutable.Map({ 1: 123 }) })

    expect(loadPrices).toHaveBeenCalledTimes(5)

    wrapper.setProps({ date: '2017-10-21', numPortions: 2, orderId: '3', recipes: Immutable.Map({ 2: 43 }) })

    expect(loadPrices).toHaveBeenCalledTimes(6)
  })
})
