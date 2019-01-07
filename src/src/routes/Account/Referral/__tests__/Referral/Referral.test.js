import React from 'react'
import { shallow } from 'enzyme'
import Referral from 'routes/Account/Referral/Referral'
import Immutable from 'immutable'

describe('Referral', () => {
  describe('rendering', () => {
    let wrapper
    const rafOffer = {
      creditFormatted: '£15',
      firstBoxDiscountFormatted: '50%',
      firstMonthDiscountFormatted: '30%',
      expiry: ''
    }

    beforeEach(() => {
      wrapper = shallow(<Referral referralCode='RAF-TEST-1234' rafOffer={rafOffer} />)
    })

    test('should render a <div> with no props', () => {
      expect(wrapper.type()).toEqual('div')
    })
    
    test('should render RAFTitle', () => {
      expect(wrapper.find('RAFTitle').length).toEqual(1)
    })

    test('should render RAFOffer if have data', () => {
      expect(wrapper.find('Connect(RAFOffer)').length).toEqual(1)
    })

    test('should render default  RAFOffer if have no raf data', () => {
      wrapper = shallow(<Referral referralCode='RAF-TEST-1234' />)
      expect(wrapper.instance().props.rafOffer).toEqual(
        Immutable.Map ({
          "creditFormatted": "£15",
          "firstBoxDiscountFormatted": "50%",
          "firstMonthDiscountFormatted": "30%",
        })
      )
    })
  })
})
