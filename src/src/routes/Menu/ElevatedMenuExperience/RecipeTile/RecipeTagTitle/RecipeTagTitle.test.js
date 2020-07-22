import React from 'react'
import { shallow } from 'enzyme'

import { RecipeTagTitle } from './RecipeTagTitle'

describe('EMERecipeTile', () => {
  let brandTag
  describe('when given null brandTag', () => {
    test('should return null', () => {
      const wrapper = shallow(<RecipeTagTitle brandTag={brandTag} />)

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

    test('should find recipe title tag', () => {
      const wrapper = shallow(<RecipeTagTitle brandTag={brandTag} />)

      expect(wrapper.type()).toBe('div')
      expect(wrapper.find('div').first().prop('className')).toEqual('recipeTagTitle')
      expect(wrapper.find('div').first().text()).toEqual('New')
    })
  })
})
