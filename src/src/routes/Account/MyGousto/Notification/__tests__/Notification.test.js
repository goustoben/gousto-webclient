import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'
import moment from 'moment'
import { Notification } from '..'

describe('Notification component', () => {

  // describe('componentDidMount', () => {
  //   it('should call checkCardExpiryDate', () => {
  //     expect(wrapper.instance.checkCardExpiryDate).toHaveBeenCalled()
  //   })
  // })

  describe('checkCardExpiryDate', () => {
    let wrapper
    let card
    let orders

    beforeEach(() => {
      orders = Immutable.Map({})
      wrapper = shallow(<Notification card={card} orders={orders} />)
    })

    it('should append "Expired" to local banners state if card expiry date is in current month', () => {
      card = Immutable.Map({
        lastFourDigits: "1234",
        expiryDate: '2019-08',
      })

      wrapper.instance().checkCardExpiryDate(card, now)
      expect(wrapper.state('bannersToShow')).toEqual(['expired'])
    })
  })
})
