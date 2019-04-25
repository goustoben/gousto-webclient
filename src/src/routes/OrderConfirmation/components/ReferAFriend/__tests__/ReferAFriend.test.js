import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'
import { ReferAFriend } from '../ReferAFriend'

describe('ReferAFriend', () => {
  let wrapper
  let rafOffer
  let testProps

  beforeEach(() => {
    rafOffer = Immutable.Map({
      creditFormatted: '£15',
      firstBoxDiscountFormatted: '60%',
      firstMonthDiscountFormatted: '30%',
    })

    testProps = {
      referralCode: '12345',
      userFirstName: 'test',
      device: 'test',
      trackingReferFriend: jest.fn(),
      trackingReferFriendSocialSharing: jest.fn()
    }

    wrapper = shallow(<ReferAFriend rafOffer={rafOffer} {...testProps} />)
  })

  test('should render a title', () => {
    expect(wrapper.find('.rafTitle').length).toEqual(1)
  })

  test('should render 2 Offer components', () => {
    expect(wrapper.find('Offer').length).toEqual(2)
  })

  test('should render UserRAFLink component with a SocialButton component as a child', () => {
    expect(wrapper.find('UserRAFLink').length).toEqual(1)
    expect(wrapper.find('UserRAFLink').children().find('SocialButton').length).toEqual(1)
  })

  test('should render SocialShareButtons component', () => {
    expect(wrapper.find('SocialShareButtons').length).toEqual(1)
  })

  test('should render SocialShareSheetCTA component', () => {
    expect(wrapper.find('SocialShareSheetCTA').length).toEqual(1)
  })
})