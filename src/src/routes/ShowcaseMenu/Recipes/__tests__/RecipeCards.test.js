import React from 'react'
import Immutable from 'immutable'
import { shallow } from 'enzyme'
import { RecipeCards } from '../RecipeCards'

describe('RecipeCards', () => {
  let wrapper

  const openRecipeDetails = jest.fn()

  const recipes = Immutable.List([
    {
      recipe: Immutable.fromJS({
        id: 'rec1',
        title: 'Caponata',
        media: {
          images: [
            {
              type: 'mood-image',
              urls: [
                {
                  src: 'caponata-800.jpg',
                  width: 800,
                },
                {
                  src: 'caponata-1500.jpg',
                  width: 1500,
                },
              ],
            },
          ],
        },
        rating: {
          count: 1023,
          average: 4,
        },
        cookingTime: 35,
      }),
    },
    {
      recipe: Immutable.fromJS({
        id: 'rec2',
        title: 'Comforting Cottage Pie',
        media: {
          images: [
            {
              type: 'mood-image',
              urls: [],
            },
          ],
        },
        rating: {
          count: 2048,
          average: 3.5,
        },
        cookingTime: 30,
      }),
    },
    {
      recipe: Immutable.fromJS({
        id: 'rec3',
        title: 'Sweet Chilli Turkey Noodles',
        media: {
          images: [
            {
              type: 'some-other-image',
              urls: [],
            },
          ],
        },
        rating: {
          count: 0,
          average: 0,
        },
        cookingTime: 30,
      }),
    },
    {
      recipe: Immutable.fromJS({
        id: 'rec4',
        title: 'Salmon & Spicy Stir-Fried Greens',
        media: {},
        rating: {
          count: 0,
          average: 0,
        },
        cookingTime: 30,
      }),
    },
  ])
  const currentCollectionId = 'coll1'

  beforeEach(() => {
    wrapper = shallow(
      <RecipeCards
        openRecipeDetails={openRecipeDetails}
        recipes={recipes}
        currentCollectionId={currentCollectionId}
      />
    )
  })

  test('has a button with RecipeCard for each recipe', () => {
    expect(wrapper.find('button')).toHaveLength(4)
    const first = wrapper.find('button').at(0)

    const recipeCard = first.find('RecipeCard')
    expect(recipeCard.exists()).toBe(true)

    expect(recipeCard.prop('title')).toBe('Caponata')
    expect(recipeCard.prop('rating')).toEqual({
      amountOfReviews: 1023,
      average: 4,
      size: 'Medium',
    })
    expect(recipeCard.prop('cookingTime')).toBe(35)
    expect(recipeCard.prop('media')).toEqual([
      { url: 'caponata-800.jpg', width: 800 },
      { url: 'caponata-1500.jpg', width: 1500 },
    ])
  })

  describe('when a recipe is clicked', () => {
    beforeEach(() => {
      wrapper.find('button').at(0).simulate('click', { preventDefault: jest.fn() })
    })

    test('then it should request a pop-up with details', () => {
      expect(openRecipeDetails).toHaveBeenCalledWith('rec1', 'coll1', 'Caponata')
    })
  })
})
