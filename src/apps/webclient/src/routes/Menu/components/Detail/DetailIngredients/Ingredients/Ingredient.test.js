import React from 'react'

import { shallow } from 'enzyme'
import Immutable from 'immutable'

import { Ingredient } from './Ingredient'
import { IngredientImage } from './IngredientImage'

describe('<Ingredient />', () => {
  let ingredient
  let mutableIngredient
  let wrapper

  beforeEach(() => {
    mutableIngredient = {
      media: {
        images: [
          {
            urls: [
              {
                src: 'carrot.small.jpg',
                width: 100,
              },
              {
                src: 'carrot.medium.jpg',
                width: 150,
              },
              {
                src: 'carrot.large.jpg',
                width: 200,
              },
              {
                src: 'carrot.extraLarge.jpg',
                width: 250,
              },
            ],
          },
        ],
      },
      allergens: [],
      name: 'carrot',
      label: 'one carrot',
    }
    ingredient = Immutable.fromJS(mutableIngredient)

    wrapper = shallow(<Ingredient ingredient={ingredient} />)
  })

  test('should return a <div>', () => {
    expect(wrapper.type()).toEqual('div')
  })

  test('should return a <span> with label', () => {
    const label = wrapper.find('span')
    expect(label.length).toEqual(1)
    expect(label.getElement().props.children).toEqual(ingredient.get('label'))
  })

  test('should render an IngredientImage', () => {
    expect(wrapper.find(IngredientImage).length).toEqual(1)
  })

  test('should render a span ingredient label', () => {
    expect(wrapper.find('span').text()).toEqual(mutableIngredient.label)
  })
})
