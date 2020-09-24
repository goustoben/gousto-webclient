import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'

import GoustoImage from 'Image'
import { SoldOutOverlay } from 'routes/Menu/Recipe/SoldOutOverlay'
import { TileImage } from './TileImage'
import { CookingTimeIconContainer } from '../CookingTimeIcon'

describe('<TileImage />', () => {
  let wrapper
  let media
  beforeEach(() => {
    media = Immutable.fromJS([
      {
        src: 'radish.small.jpg',
        width: 100,
      },
      {
        src: 'radish.medium.jpg',
        width: 150,
      },
      {
        src: 'radish.large.jpg',
        width: 200,
      },
      {
        src: 'radish.extraLarge.jpg',
        width: 250,
      },
    ])
  })

  it('shouldn\'t render a GoustoImage without media', () => {
    wrapper = shallow(<TileImage media={Immutable.List()} />)

    expect(wrapper.find(GoustoImage)).toHaveLength(0)
  })

  it('should render a GoustoImage with media', () => {
    wrapper = shallow(<TileImage media={media} />)

    expect(wrapper.find(GoustoImage)).toHaveLength(1)
  })

  test('should contain one SoldOutOverlay component', () => {
    expect(wrapper.find(SoldOutOverlay).length).toEqual(1)
  })

  test('should contain one CookingTimeIcon component', () => {
    global.innerWidth = 1200
    const showDetailRecipe = jest.fn()
    const index = 3
    const recipe = Immutable.fromJS({
      id: '1234',
      title: 'Bobs Brilliant Beef Burger',
      url: 'example.com/food',
      media: Immutable.fromJS([
        {
          src: 'radish.small.jpg',
          width: 100,
        },
        {
          src: 'radish.medium.jpg',
          width: 150,
        },
        {
          src: 'radish.large.jpg',
          width: 200,
        },
        {
          src: 'radish.extraLarge.jpg',
          width: 250,
        },
      ]),
      cookingTime: 30,
      cookingTimeFamily: 30
    })
    wrapper = shallow(<TileImage recipe={recipe} recipeId={recipe.get('id')} index={index} numPortions={2} showDetailRecipe={showDetailRecipe} media={media} />)
    expect(wrapper.find(CookingTimeIconContainer).length).toEqual(1)
  })

  describe('when in carousel', () => {
    test('should find carouselImageWrapper', () => {
      const showDetailRecipe = jest.fn()
      const index = 3
      const recipe = Immutable.fromJS({
        id: '1234',
        title: 'Bobs Brilliant Beef Burger',
        url: 'example.com/food',
        media: Immutable.fromJS([
          {
            src: 'radish.small.jpg',
            width: 100,
          },
          {
            src: 'radish.medium.jpg',
            width: 150,
          },
          {
            src: 'radish.large.jpg',
            width: 200,
          },
          {
            src: 'radish.extraLarge.jpg',
            width: 250,
          },
        ]),
        cookingTime: 30,
        cookingTimeFamily: 30
      })
      wrapper = shallow(<TileImage isInCarousel recipe={recipe} recipeId={recipe.get('id')} index={index} numPortions={2} showDetailRecipe={showDetailRecipe} media={media} />)

      expect(wrapper.find('.carouselImageWrapper').length).toEqual(1)
    })
  })

  describe('when in carousel with variant header', () => {
    test('should find carouselImageWrapper', () => {
      const showDetailRecipe = jest.fn()
      const index = 3
      const recipe = Immutable.fromJS({
        id: '1234',
        title: 'Bobs Brilliant Beef Burger',
        url: 'example.com/food',
        media: Immutable.fromJS([
          {
            src: 'radish.small.jpg',
            width: 100,
          },
          {
            src: 'radish.medium.jpg',
            width: 150,
          },
          {
            src: 'radish.large.jpg',
            width: 200,
          },
          {
            src: 'radish.extraLarge.jpg',
            width: 250,
          },
        ]),
        cookingTime: 30,
        cookingTimeFamily: 30
      })
      wrapper = shallow(<TileImage isInCarousel showVariantHeader recipe={recipe} recipeId={recipe.get('id')} index={index} numPortions={2} showDetailRecipe={showDetailRecipe} media={media} />)

      expect(wrapper.find('.carouselVariantHeaderImageWrapper').length).toEqual(1)
    })
  })
})

