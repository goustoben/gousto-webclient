import React from 'react'
import { shallow } from 'enzyme'
import { SoldOutOverlay } from 'routes/Menu/Recipe/SoldOutOverlay'

describe('<SoldOutOverlay', () => {
  let wrapper
  describe('when a recipe has is in stock', () => {
    beforeEach(() => {
      wrapper = shallow(<SoldOutOverlay outOfStock={false} />)
    })

    test('the out of stock text does not render', () => {
      expect(wrapper.isEmptyRender()).toEqual(true)
    })
  })

  describe('when recipe is not in stock', () => {
    beforeEach(() => {
      wrapper = shallow(<SoldOutOverlay outOfStock />)
    })

    test('the overlay with out of stock text renders', () => {
      expect(wrapper.text()).toEqual('This recipe is sold out for your delivery date')
    })
  })
})
