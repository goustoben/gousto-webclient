import React from 'react'
import { shallow } from 'enzyme'
import { SoldOutOverlay } from 'routes/Menu/Recipe/SoldOutOverlay'

describe('<SoldOutOverlay', () => {
  let wrapper
  describe('when a recipe has a stock amount provided', () => {
    beforeEach(() => {
      const stock = 200
      wrapper = shallow(<SoldOutOverlay stock={stock} />)
    })

    test('the out of stock text does not render', () => {
      expect(wrapper.isEmptyRender()).toEqual(true)
    })
  })

  describe('when recipe is not in stock', () => {
    beforeEach(() => {
      const stock = -3000
      wrapper = shallow(<SoldOutOverlay stock={stock} />)
    })

    test('the overlay with out of stock text renders', () => {
      expect(wrapper.text()).toEqual('This recipe is sold out')
    })

    describe('when recipe is already in the basket', () => {
      beforeEach(() => {
        const stock = -100
        const inBasket = true
        wrapper = shallow(<SoldOutOverlay stock={stock} inBasket={inBasket} />)
      })

      test('the out of stock text does not render', () => {
        expect(wrapper.isEmptyRender()).toEqual(true)
      })
    })
  })

  describe('when recipe stock is null', () => {
    beforeEach(() => {
      const stock = null
      wrapper = shallow(<SoldOutOverlay stock={stock} />)
    })

    test('the out of stock text does not render', () => {
      expect(wrapper.isEmptyRender()).toEqual(true)
    })
  })

  describe('when recipe stock is undefined', () => {
    beforeEach(() => {
      const stock = undefined
      wrapper = shallow(<SoldOutOverlay stock={stock} />)
    })

    test('the overlay renders with out of stock text', () => {
      expect(wrapper.text()).toEqual('This recipe is sold out')
    })
  })
})
