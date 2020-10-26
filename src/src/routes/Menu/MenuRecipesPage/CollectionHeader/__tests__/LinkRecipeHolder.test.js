import React from 'react'
import { shallow } from 'enzyme'
import { LinkRecipeHolder } from '../RecipeLinkHeader'
import { RecipeTileContainer } from '../../../components/RecipeTile'

describe('LinkRecipeHolder', () => {
  let wrapper
  const images = {
    single: 'www.header.com/christmas-single.png',
    double: 'www.header.com/christmas-double.png',
  }
  const recipes = ['1234','5678']
  const title = 'Gousto x Marmite'
  describe('when screen is matching 2 columns', () => {
    beforeEach(() => {
      const matches = {
        twoColumns: true,
        threeColumns: false,
        fourColumns: false,
      }
      wrapper = shallow(<LinkRecipeHolder matches={matches} images={images} fdiStyling={false} recipes={recipes} title={title} />)
    })

    test('should render recipeLink50percentContainer', () => {
      expect(wrapper.find('.recipeLink50percentContainer')).toHaveLength(1)
    })

    test('should render recipeLinkImage with src for single', () => {
      expect(wrapper.find('.recipeLinkImage').prop('src')).toEqual('www.header.com/christmas-single.png')
    })

    test('should render only one recipe', () => {
      expect(wrapper.find(RecipeTileContainer)).toHaveLength(1)
    })
  })

  describe('when screen is matching 3 columns', () => {
    beforeEach(() => {
      const matches = {
        twoColumns: false,
        threeColumns: true,
        fourColumns: false,
      }
      wrapper = shallow(<LinkRecipeHolder matches={matches} images={images} fdiStyling={false} recipes={recipes} title={title} />)
    })

    test('should render recipeLink33percentContainer', () => {
      expect(wrapper.find('.recipeLink33percentContainer')).toHaveLength(1)
    })

    test('should render recipeLinkImage with src for single', () => {
      expect(wrapper.find('.recipeLinkImage').prop('src')).toEqual('www.header.com/christmas-single.png')
    })

    test('should render 2 recipes', () => {
      expect(wrapper.find(RecipeTileContainer)).toHaveLength(2)
    })
  })

  describe('when screen is matching 4 columns', () => {
    beforeEach(() => {
      const matches = {
        twoColumns: false,
        threeColumns: false,
        fourColumns: true,
      }
      wrapper = shallow(<LinkRecipeHolder matches={matches} images={images} fdiStyling={false} recipes={recipes} title={title} />)
    })

    test('should render recipeLink50percentContainer', () => {
      expect(wrapper.find('.recipeLink50percentContainer')).toHaveLength(1)
    })

    test('should render recipeLinkImage with src for double', () => {
      expect(wrapper.find('.recipeLinkImage').prop('src')).toEqual('www.header.com/christmas-double.png')
    })

    test('should render 2 recipes', () => {
      expect(wrapper.find(RecipeTileContainer)).toHaveLength(2)
    })
  })
})
