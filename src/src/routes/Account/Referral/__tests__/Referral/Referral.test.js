import React from 'react'
import { shallow } from 'enzyme'
import Referral from 'routes/Account/Referral/Referral'
import Immutable from 'immutable'

describe('Referral', () => {
  describe('rendering', () => {
    let wrapper
    const rafOffer = Immutable.fromJS({
      creditFormatted: '£15',
      firstBoxDiscountFormatted: '50%',
      firstMonthDiscountFormatted: '30%',
      expiry: ''
    })

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

    test('should render default RAFOffer if have no raf data', () => {
      wrapper = shallow(<Referral referralCode='RAF-TEST-1234' />)
      expect(wrapper.instance().props.rafOffer).toEqual(
        Immutable.fromJS ({
          "creditFormatted": "£15",
          "firstBoxDiscountFormatted": "50%",
          "firstMonthDiscountFormatted": "30%",
          details: [
            "Invite your friends to try Gousto. We’ll pop £15 in your account and your friends will get 50% off their first box",
            "You can refer up to 20 friends every month. That’s £300 worth of Gousto credit to use on recipes and goodies from the Gousto market",
            "Your credit shows up once your friend’s first box is delivered. See full T&Cs [tc]here.[/tc]"
          ]
        })
      )
    })

    test('should render default box icon and background when expiry is empty', () => {
      expect(wrapper.find('.containerBackground').length).toEqual(1)
      expect(wrapper.find('.iconRefer').length).toEqual(1)
    })
    
    test('should render double offer box icon and background when expiry is not empty', () => {
      const doubleRafOffer = Immutable.fromJS({
        creditFormatted: '£30',
        firstBoxDiscountFormatted: '50%',
        firstMonthDiscountFormatted: '30%',
        expiry: '2019-01-01'
      })
      wrapper = shallow(<Referral referralCode='RAF-TEST-1234' rafOffer={doubleRafOffer} />)
      
      expect(wrapper.find('.containerBackgroundDouble').length).toEqual(1)
      expect(wrapper.find('.iconReferDouble').length).toEqual(1)
    })

    test('should render HowItWork component', () => {
      expect(wrapper.find('HowItWorks').length).toEqual(1)
    })

    test('should render HowItWork component with default details prop', () => {
      wrapper = shallow(<Referral referralCode='RAF-TEST-1234' />)
      const value = {
        details: Immutable.fromJS([
          "Invite your friends to try Gousto. We’ll pop £15 in your account and your friends will get 50% off their first box",
          "You can refer up to 20 friends every month. That’s £300 worth of Gousto credit to use on recipes and goodies from the Gousto market",
          "Your credit shows up once your friend’s first box is delivered. See full T&Cs [tc]here.[/tc]"
        ])
      }
      expect(wrapper.find('HowItWorks').props('details')).toEqual(value)
    })
  })
})
