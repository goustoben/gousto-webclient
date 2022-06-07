import React from 'react'

import { shallow } from 'enzyme'
import Immutable from 'immutable'

import { Allergens } from '../Allergens/Allergens'
import { IngredientsList } from '../IngredientsList/IngredientsList'
import { DetailAllergenIngredients } from './DetailAllergenIngredients'

describe('<DetailAllergenIngredients />', () => {
  describe('when allergens and ingredients are defined', () => {
    const allergens = Immutable.List(['test'])
    const ingredients = Immutable.fromJS([
      { name: 'name1', subIngredients: 'subIngredients1', allergens: ['test'] },
    ])

    it('should render IngredientsList component', () => {
      const wrapper = shallow(
        <DetailAllergenIngredients ingredients={ingredients} allergens={allergens} />,
      )
      expect(wrapper.find(IngredientsList).length).toEqual(1)
    })

    it('should render Allergens component', () => {
      const wrapper = shallow(
        <DetailAllergenIngredients ingredients={ingredients} allergens={allergens} />,
      )
      expect(wrapper.find(Allergens).length).toEqual(1)
    })
  })

  describe('when ingredients are not defined', () => {
    const allergens = Immutable.List(['test'])
    const ingredients = Immutable.fromJS([])

    it('should not render component', () => {
      const wrapper = shallow(
        <DetailAllergenIngredients ingredients={ingredients} allergens={allergens} />,
      )
      expect(wrapper).toMatchObject({})
    })
  })

  describe('when allergens are not defined', () => {
    const allergens = Immutable.List([])
    const ingredients = Immutable.fromJS([
      { name: 'name1', subIngredients: 'subIngredients1', allergens: ['test'] },
    ])

    it('should render IngredientsList component', () => {
      const wrapper = shallow(
        <DetailAllergenIngredients ingredients={ingredients} allergens={allergens} />,
      )
      expect(wrapper.find(IngredientsList).length).toEqual(1)
    })

    it('should render Allergens component', () => {
      const wrapper = shallow(
        <DetailAllergenIngredients ingredients={ingredients} allergens={allergens} />,
      )
      expect(wrapper.find(Allergens).length).toEqual(1)
    })
  })
})
