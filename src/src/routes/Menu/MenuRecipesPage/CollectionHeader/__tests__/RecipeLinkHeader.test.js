import React from 'react'
import { mount } from 'enzyme'
import Immutable from 'immutable'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { RecipeLinkHeader} from '../RecipeLinkHeader'

const initialState = {
  basket: Immutable.fromJS({
    numPortions: 0
  }),
  menuCollections: Immutable.fromJS([]),
  recipes: Immutable.fromJS([]),
  menuRecipeStock: Immutable.fromJS([]),
  menu: Immutable.fromJS({
    menuVariants: Immutable.fromJS([])
  }),
  auth: Immutable.fromJS({
    id: 'user-id'
  }),
  routing: { locationBeforeTransitions: { pathname: '/menu' } },
}

describe('RecipeLinkHeader', () => {
  let store
  let wrapper
  let headerAttributes
  global.innerWidth = 1500

  beforeEach(() => {
    const mockStore = configureStore([thunk])
    store = mockStore(initialState)
  })

  describe('when headerImage is defined', () => {
    beforeEach(() => {
      headerAttributes = {
        link: {
          collectionSlug: 'gousto-x-marmite',
          collectionId: 'collection-id-1234'
        },
        title: 'Gousto x Marmite',
        description: 'New marmite recipes.',
        titleColor: '#FFFFFF',
        images: {
          single: 'www.header.com/christmas-single.png',
          double: 'www.header.com/christmas-double.png',
        },
        recipes: ['1234','5678'],
        descriptionColor: '#FFFFFF',
        backgroundColor: '#333D47',
        linkColor: '#BBC2FF',
        fdiStyling: false
      }

      wrapper = mount(
        <Provider store={store}>
          <RecipeLinkHeader headerAttributes={headerAttributes} />
        </Provider>)
    })

    test('should render title', () => {
      expect(wrapper.find('.recipeLinkHeaderTitle').text()).toEqual('Gousto x Marmite')
    })

    test('should render description', () => {
      expect(wrapper.find('.recipeLinkHeaderDescription').text()).toEqual('New marmite recipes.')
    })

    test('should render viewAllLink', () => {
      expect(wrapper.find('a.recipeLinkHeaderViewAllLink').text()).toEqual('View')
    })

    test('should render viewAllLink', () => {
      expect(wrapper.find('LinkRecipeHolder')).toHaveLength(1)
    })
  })
})
