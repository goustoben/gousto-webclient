import sinon from 'sinon'

import Immutable from 'immutable' // eslint-disable-line no-caps

import React from 'react'
import { shallow } from 'enzyme'
import SeeMenuSection from 'routes/Account/MyDeliveries/OrdersList/NoOrders/SeeMenuSection/SeeMenuSection'
import css from 'routes/Account/MyDeliveries/OrdersList/NoOrders/SeeMenuSection/SeeMenuSection.css'

describe('SeeMenuSection', () => {
  describe('rendering', () => {
    let wrapper
    const recipes = Immutable.fromJS([
      {
        recipeImage: 'http://image-url',
        recipeTitle: 'A recipe title',
        dietType: 'vegetarian',
      },
      {
        recipeImage: 'http://image-url2',
        recipeTitle: 'A recipe title 2',
        dietType: 'gourmet',
      },
      {
        recipeImage: 'http://image-url',
        recipeTitle: 'A recipe title',
        dietType: 'gourmet',
      },
      {
        recipeImage: 'http://image-url2',
        recipeTitle: 'A recipe title 2',
        dietType: 'gourmet',
      },
      {
        recipeImage: 'http://image-url',
        recipeTitle: 'A recipe title',
        dietType: 'gourmet',
      },
      {
        recipeImage: 'http://image-url2',
        recipeTitle: 'A recipe title 2',
        dietType: 'gourmet',
      },
      {
        recipeImage: 'http://image-url',
        recipeTitle: 'A recipe title',
        dietType: 'gourmet',
      },
      {
        recipeImage: 'http://image-url2',
        recipeTitle: 'A recipe title 2',
        dietType: 'gourmet',
      },
    ])

    test('should render a scroll wrapper', () => {
      wrapper = shallow(<SeeMenuSection recipes={recipes} boxType="gourmet" />)
      const className = `.${css.container.split(' ').join('.')}`
      expect(wrapper.find(className)).toHaveLength(1)
    })

    test('should render no more than 6 recipes', () => {
      wrapper = shallow(<SeeMenuSection recipes={recipes} boxType="gourmet" />)
      const expected =
        '<OrderRecipe /><OrderRecipe /><OrderRecipe /><OrderRecipe /><OrderRecipe /><OrderRecipe />'
      expect(wrapper.text()).toBe(expected)
    })

    test('should only render veggie recipes is user is veggie', () => {
      wrapper = shallow(
        <SeeMenuSection recipes={recipes} boxType="vegetarian" />,
      )
      const expected = '<OrderRecipe />'
      expect(wrapper.text()).toBe(expected)
    })
  })
})
