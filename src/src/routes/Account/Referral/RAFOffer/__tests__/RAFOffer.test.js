import React from 'react'
import { shallow } from 'enzyme'
import { userFetchReferralOffer } from 'actions'
import { RAFOffer } from '../RAFOffer'
import { YouGet } from '../YouGet.js'
import { YourFriendGets } from '../YourFriendGets.js'

jest.mock('actions', () => ({
  userFetchReferralOffer: jest.fn().mockReturnValue(Promise.resolve()),
}))

describe('RAFOffer', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(
      <RAFOffer userFetchReferralOffer={userFetchReferralOffer}/>
    )
  })

  afterEach(() => {
    userFetchReferralOffer.mockClear()
  })

  describe('upon initial render', () => {

    it('should render 1 <YouGet> component', () => {
      expect(wrapper.find(YouGet))
    })
    
    it('should render 1 <YourFriendGets> component', () => {
      expect(wrapper.find(YourFriendGets))
    })
  })
})
