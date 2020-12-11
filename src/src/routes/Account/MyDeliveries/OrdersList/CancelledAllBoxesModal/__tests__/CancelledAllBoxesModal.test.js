import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'
import Link from 'Link'
import CancelledAllBoxesModal from '../CancelledAllBoxesModal'

describe('CancelledAllBoxesModal', () => {
  let wrapper
  describe('When isNewSubscriptionPageEnabled is false', () => {
    const pendingOrderDates = Immutable.Map({
      111: '2001-03-04',
      222: '2001-05-06',
      333: '2001-06-07',
    })
    beforeEach(() => {
      wrapper = shallow(<CancelledAllBoxesModal
        isModalOpen
        pendingOrdersDates={pendingOrderDates}
        toggleModalVisibility={() => {}}
        isNewSubscriptionPageEnabled={false}
      />)
    })
    test('then Pause subscription is linking to /my-subscription', () => {
      expect(wrapper.find(Link).prop('to')).toEqual('/my-subscription')
    })
  })

  describe('When isNewSubscriptionPageEnabled is true', () => {
    const pendingOrderDates = Immutable.Map({
      111: '2001-03-04',
      222: '2001-05-06',
      333: '2001-06-07',
    })
    beforeEach(() => {
      wrapper = shallow(<CancelledAllBoxesModal
        isModalOpen={false}
        pendingOrdersDates={pendingOrderDates}
        toggleModalVisibility={() => {}}
        isNewSubscriptionPageEnabled
      />)
    })

    test('then Pause subscription is linking to /subscription-settings', () => {
      expect(wrapper.find(Link).prop('to')).toEqual('/subscription-settings')
    })
  })
})
