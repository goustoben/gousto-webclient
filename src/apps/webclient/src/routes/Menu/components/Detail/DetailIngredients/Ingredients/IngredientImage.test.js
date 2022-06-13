import React from 'react'

import { shallow } from 'enzyme'
import Immutable from 'immutable'

import Image from 'components/Image'
import Svg from 'components/Svg'

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

    wrapper = shallow(<IngredientImage ingredient={ingredient} />)
  })

  test('should render an Image', () => {
    expect(wrapper.find(Image).length).toEqual(1)
  })

  test('should render the placeholder Svg if there is no image', () => {
    mutableIngredient = {
      media: {
        images: [],
      },
      name: 'carrot',
      label: 'one carrot',
    }
    ingredient = Immutable.fromJS(mutableIngredient)

    wrapper = shallow(<IngredientImage ingredient={ingredient} />)
    expect(wrapper.find(Svg).length).toEqual(1)
  })
})
