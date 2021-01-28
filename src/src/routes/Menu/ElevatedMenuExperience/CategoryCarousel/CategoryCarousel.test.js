import React from 'react'
import { shallow, mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import Immutable from 'immutable'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import Link from 'Link'
import { RecipeTileContainer } from '../../components/RecipeTile'
import { CategoryCarousel } from './CategoryCarousel'

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

describe('CategoryCarousel', () => {
  let store

  const category = Immutable.fromJS({
    shortTitle: 'Category 1',
    slug: 'category-1',
    id: 'category-id',
  })

  const carouselConfig = {
    title: 'Category 1',
    styleSlug: 'category-1',
    theme: {
      color: '#333D47',
      backgroundColor: '#F4F7FA',
      linkColor: '#615CFF',
      titleColor: '#333D47',
      fdiStyling: true
    },
    description: 'Tasty'
  }

  const recipe1 = {
    originalId: '1',
    recipe: Immutable.Map({
      id: '1',
      availability: [],
      title: 'recipe1',
      boxType: 'vegetarian',
      dietType: 'Vegetarian',
      isRecommended: false,
    })
  }
  const recipe2 = {
    originalId: '2',
    recipe: Immutable.Map({
      id: '2',
      availability: [],
      title: 'recipe2',
      boxType: 'vegetarian',
      dietType: 'Vegetarian',
      isRecommended: false,
    })
  }
  const recipes1 = Immutable.List([recipe1])
  const recipes2 = Immutable.List([recipe1, recipe2])
  const categoryButtonClicked = jest.fn()

  beforeEach(() => {
    const mockStore = configureStore()
    store = mockStore(initialState)
  })

  describe('when there are no recipes in category', () => {
    test('then it should render nothing', () => {
      const wrapper = shallow(
        <CategoryCarousel category={category} recipes={[]} carouselConfig={carouselConfig} />,
      )

      expect(wrapper.find(RecipeTileContainer)).toHaveLength(0)
    })
  })

  describe('when there is one recipe in category', () => {
    test('then it should render one RecipeTileContainer', () => {
      const wrapper = shallow(
        <CategoryCarousel category={category} recipes={recipes1} carouselConfig={carouselConfig} />,
      )

      expect(wrapper.find(RecipeTileContainer)).toHaveLength(1)
      expect(wrapper.find('.categoryTitle').text()).toEqual('Category 1')
    })

    test('then it should render View link with 1 recipe', () => {
      const wrapper = mount(
        <Provider store={store}>
          <CategoryCarousel category={category} recipes={recipes1} carouselConfig={carouselConfig} />
        </Provider>,
      )

      expect(wrapper.find('.categoryViewAllLink').find('GoustoLink').children().first()
        .text()).toEqual('View (1)')
    })
  })

  describe('when there are multiple recipes', () => {
    test('then it should render multiple RecipeTileContainer', () => {
      const wrapper = shallow(
        <CategoryCarousel category={category} recipes={recipes2} carouselConfig={carouselConfig} />,
      )

      expect(wrapper.find(RecipeTileContainer)).toHaveLength(2)
    })

    test('then it should render View link with 2 recipes', () => {
      const wrapper = mount(
        <Provider store={store}>
          <CategoryCarousel category={category} recipes={recipes2} carouselConfig={carouselConfig} />
        </Provider>,
      )

      expect(wrapper.find('.categoryViewAllLink').find('GoustoLink').children().first()
        .text()).toEqual('View (2)')
    })

    describe('when the view button is clicked', () => {
      const mockStore = configureStore([thunk])
      store = mockStore(initialState)
      const wrapper = mount(
        <Provider store={store}>
          <CategoryCarousel category={category} recipes={recipes2} carouselConfig={carouselConfig} categoryButtonClicked={categoryButtonClicked} />
        </Provider>,
      )
      const scrollSpy = jest.spyOn(window, 'scroll').mockImplementation(() => {})
      test('then the onClick actions are triggered', () => {
        wrapper.find(Link).simulate('click')
        expect(categoryButtonClicked).toHaveBeenCalledTimes(1)
        expect(scrollSpy).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('when there is a category description', () => {
    test('then it should render a descriptionn under the title', () => {
      const wrapper = shallow(
        <CategoryCarousel category={category} recipes={recipes2} carouselConfig={carouselConfig} />,
      )

      expect(wrapper.find('.categoryDescription')).toHaveLength(1)
    })
  })

  describe('when carousel config has an image url', () => {
    test('should render categoryCarouselImageContainer', () => {
      const carouselConfigWithImage = {
        ...carouselConfig,
        imageUrl: 'https://test.com/category-image/460.jpg'
      }

      const wrapper = shallow(
        <CategoryCarousel category={category} recipes={recipes2} carouselConfig={carouselConfigWithImage} />
      )

      expect(wrapper.find('.categoryCarouselImageContainer').exists()).toBe(true)
    })
  })

  describe('when carousel config does not have an image url', () => {
    test('should not render categoryCarouselImageContainer', () => {
      const wrapper = shallow(
        <CategoryCarousel category={category} recipes={recipes2} carouselConfig={carouselConfig} />
      )

      expect(wrapper.find('.categoryCarouselImageContainer').exists()).toBe(false)
    })
  })
})
