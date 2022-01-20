import React from 'react'
import { shallow } from 'enzyme'
import {
  LoadingRecipeCards,
  LoadingRecipeCard,
  N_LOADING_RECIPE_CARDS,
} from '../LoadingRecipeCards'

describe('given LoadingRecipeCards is rendered', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<LoadingRecipeCards />)
  })

  test('renders a number of LoadingRecipeCard components', () => {
    expect(wrapper.find('LoadingRecipeCard')).toHaveLength(N_LOADING_RECIPE_CARDS)
  })
})

describe('given LoadingRecipeCard is rendered', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<LoadingRecipeCard />)
  })

  test('then it should render correctly', () => {
    expect(wrapper.find('.loadingImage').exists()).toBe(true)
    expect(wrapper.find('.loadingDetails .loadingLine')).toHaveLength(2)
    expect(wrapper.find('.loadingDetails .loadingStars').exists()).toBe(true)
  })
})
