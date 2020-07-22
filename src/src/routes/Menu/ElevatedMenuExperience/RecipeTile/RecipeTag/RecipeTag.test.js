import React from 'react'
import { shallow } from 'enzyme'

import { RecipeTag } from './RecipeTag'

describe('EMERecipeTile', () => {
  let brandTag
  describe('when given null brandTag', () => {
    test('should return null', () => {
      const wrapper = shallow(<RecipeTag brandTag={brandTag} />)

      expect(wrapper.getElement()).toBe(null)
    })
  })

  describe('when given new brand tag', () => {
    beforeEach(() => {
      brandTag = {
        slug: 'new',
        text: 'New',
        theme: { borderColor: '#01A92B', color: '#01A92B', name: 'light' },
      }
    })

    test('should find recipe tag span', () => {
      const wrapper = shallow(<RecipeTag brandTag={brandTag} />)

      expect(wrapper.type()).toBe('span')
      expect(wrapper.find('span').first().prop('className')).toEqual('recipeTag')
      expect(wrapper.find('span').text()).toBe('New')
    })

    test('should find recipe tag div', () => {
      const wrapper = shallow(<RecipeTag type="div" brandTag={brandTag} />)

      expect(wrapper.type()).toBe('div')
      expect(wrapper.find('div').first().prop('className')).toEqual('recipeTag')
    })
  })
})
