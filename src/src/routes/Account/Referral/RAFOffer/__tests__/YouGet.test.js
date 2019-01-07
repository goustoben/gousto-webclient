import React from 'react'
import { shallow } from 'enzyme'
import Gel from 'Gel'
import { YouGet } from '../YouGet.js'

describe('YouGet', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(
      <YouGet youGetOffer="£15" offerColour="blue"/>
    )
  })

  describe('upon initial render', () => {
    it('should render a Gel component with the offerColour prop for default color', () => {
      expect(wrapper.find(Gel).length).toEqual(1)
      expect(wrapper.find(Gel).props().color).toEqual('blue')
    }) 
    
    it('should render a Gel component with the offerColour prop for boosted campaign', () => {
      wrapper = shallow(
        <YouGet youGetOffer="£30" offerColour="gold"/>
      )
      expect(wrapper.find(Gel).length).toEqual(1)
      expect(wrapper.find(Gel).props().color).toEqual('gold')
    }) 

    it('should render the youGet offer as a child of the Gel component', () => {
      expect(wrapper.find(Gel).contains("£15")).toEqual(true)
    }) 
  })
})
