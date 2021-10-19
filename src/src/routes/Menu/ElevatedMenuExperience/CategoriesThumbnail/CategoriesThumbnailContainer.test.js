import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'
import configureMockStore from 'redux-mock-store'
import { CategoriesThumbnailContainer } from './CategoriesThumbnailContainer'

describe('CategoriesThumbnailContainer', () => {
  let wrapper

  test('should map thumbnail from state to prop', () => {
    const mockStore = configureMockStore()
    const store = mockStore({
      routing: {
        locationBeforeTransitions: {
          query: {
            collection: 'vegetarian'
          }
        },
      },
      menuRecipeStock: Immutable.fromJS({
        111: { 2: 1000, 4: 1000 },
        222: { 2: 1000, 4: 1000 },
        333: { 2: 1000, 4: 1000 },
        444: { 2: 1000, 4: 1000 },
      }),
      basket: Immutable.fromJS({
        numPortions: 2,
        recipes: {},
        currentMenuId: 384,
      }),
      menuCollections: Immutable.fromJS({
        222: {
          published: true,
          shortTitle: 'Vegetarian',
          slug: 'vegetarian',
          id: '222',
          default: true,
          recipesInCollection: ['', '', ''],
          thumbnail: 'imageUrl'
        },
        234: {
          published: true,
          shortTitle: 'Marmite',
          slug: 'marmite',
          id: '234',
          recipesInCollection: ['', '', ''],
          thumbnail: 'imageTwoURL'
        },
      }),
    })

    wrapper = shallow(<CategoriesThumbnailContainer collectionId="222" store={store} />)

    expect(wrapper.find('CategoriesThumbnail').prop('thumbnail')).toEqual('imageUrl')
  })
})
