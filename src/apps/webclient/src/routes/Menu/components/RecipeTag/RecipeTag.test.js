import React from 'react'

import { shallow } from 'enzyme'

import * as RecipeContext from 'routes/Menu/context/recipeContext'

import { RecipeTag } from './RecipeTag'

describe('RecipeTag', () => {
  describe('when given null brandTag', () => {
    beforeEach(() => {
      jest.spyOn(RecipeContext, 'useRecipeBrandAvailabilityTag').mockImplementation(() => null)
    })

    afterEach(() => {
      jest.clearAllMocks()
    })

    test('should return null', () => {
      const wrapper = shallow(<RecipeTag />)

      expect(wrapper.getElement()).toBe(null)
    })
  })

  describe('when given new brand tag', () => {
    beforeEach(() => {
      jest.spyOn(RecipeContext, 'useRecipeBrandAvailabilityTag').mockImplementation(() => ({
        slug: 'new',
        text: 'New',
        theme: { borderColor: '#01A92B', color: '#01A92B', name: 'light' },
      }))
    })

    afterEach(() => {
      jest.clearAllMocks()
    })

    test('should find recipe tag span', () => {
      const wrapper = shallow(<RecipeTag />)

      expect(wrapper.type()).toBe('span')
      expect(wrapper.find('span').first().prop('className')).toEqual('recipeTag')
      expect(wrapper.find('span').text()).toBe('New')
    })

    test('should find recipe tag div', () => {
      const wrapper = shallow(<RecipeTag type="div" />)

      expect(wrapper.type()).toBe('div')
      expect(wrapper.find('div').first().prop('className')).toEqual('recipeTag')
    })
  })
})
