import React from 'react'

import { shallow } from 'enzyme'

import { useStock } from '../../../domains/stock'
import { DetailAddRecipe } from './DetailAddRecipe'

jest.mock('../../../domains/stock')
const useStockMock = useStock

describe('DetailAddRecipe', () => {
  let wrapper
  describe('when isOutOfStock true', () => {
    beforeEach(() => {
      useStockMock.mockReturnValue({
        isRecipeInStock: () => false,
      })
      wrapper = shallow(
        <DetailAddRecipe id="1" originalId="2" view="grid" position={0} buttonText="Add recipe" />,
      )
    })
    test('should return null', () => {
      expect(wrapper.type()).toBe(null)
    })
  })

  describe('when isOutOfStock false', () => {
    beforeEach(() => {
      useStockMock.mockReturnValue({
        isRecipeInStock: () => true,
      })
      wrapper = shallow(
        <DetailAddRecipe id="1" originalId="2" view="grid" position={0} buttonText="Add recipe" />,
      )
    })
    test('should return addRecipeWrapper', () => {
      expect(wrapper.find('.addRecipeWrapper')).toHaveLength(1)
    })
  })
})
