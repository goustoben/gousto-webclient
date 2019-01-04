import React from 'react'
import { shallow } from 'enzyme'
import { YouGet } from '../YouGet.js'
import Gel from 'Gel'

describe('YouGet', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(
      <YouGet youGetOffer="£30" offerColour="blue"/>
    )
  })

  describe('upon initial render', () => {
    it('should render a Gel component with the offerColour prop', () => {
      expect(wrapper.find(Gel).length).toEqual(1)
      expect(wrapper.find(Gel).props().color).toEqual('blue')
    }) 

    it('should render the youGet offer as a child of the Gel component', () => {
      expect(wrapper.find(Gel).contains("£30")).toEqual(true)
    }) 
  })
})
