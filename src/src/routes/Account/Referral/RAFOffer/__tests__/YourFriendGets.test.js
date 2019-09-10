import React from 'react'
import { shallow } from 'enzyme'
import Gel from 'Gel'
import { YourFriendGets } from '../YourFriendGets.js'

describe('YouGet', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(
      <YourFriendGets yourFriendFirstBoxOffer="50%" yourFriendFirstMonthOffer="30%"/>
    )
  })

  describe('upon initial render', () => {
    it('should render a Gel component with the yourFriendFirstBoxOffer as a child', () => {
      expect(wrapper.find(Gel).first().length).toEqual(1)
      expect(wrapper.find(Gel).first().contains("50%")).toEqual(true)
    }) 
    
    it('should render a Gel component with the yourFriendFirstMonthOffer as a child', () => {
      expect(wrapper.find(Gel).last().length).toEqual(1)
      expect(wrapper.find(Gel).last().contains("30%")).toEqual(true)
    }) 

  })
})
