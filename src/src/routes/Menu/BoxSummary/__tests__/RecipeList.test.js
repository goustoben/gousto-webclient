import { shallow } from 'enzyme'
import React from 'react'

import Immutable from 'immutable'

import RecipeList from '../RecipeList/RecipeList'
import RecipeHolder from '../RecipeHolder'

describe('RecipeList', () => {
  let menuRecipesStore
  let recipes

  beforeEach(() => {
    menuRecipesStore = Immutable.fromJS({
      1: 'store1',
      2: 'store2',
      3: 'store3',
      4: 'store4',
    })
    recipes = Immutable.fromJS({ 1: 1, 2: 1, 3: 1, 4: 1 })
  })

  test('should return a div', () => {
    const wrapper = shallow(<RecipeList />)
    expect(wrapper.type()).toEqual('div')
  })

  test('should return 1 span when view is desktop', () => {
    const wrapper = shallow(<RecipeList />)
    expect(wrapper.find('span').length).toEqual(1)
  })

  test('should return 4 RecipeHolder', () => {
    const wrapper = shallow(
      <RecipeList recipes={recipes} menuRecipesStore={menuRecipesStore} />,
    )

    expect(wrapper.find(RecipeHolder).length).toEqual(4)
    wrapper.find(RecipeHolder).forEach((node, index) => {
      expect(node.prop('recipe')).toEqual(`store${index + 1}`)
    })
  })

  test('should return X RecipeHolder when max recipes specified', () => {
    const wrapper = shallow(
      <RecipeList
        maxRecipesNum={3}
        recipes={recipes}
        menuRecipesStore={menuRecipesStore}
      />,
    )
    expect(wrapper.find(RecipeHolder).length).toEqual(3)
    expect(
      wrapper
        .find(RecipeHolder)
        .last()
        .prop('recipe'),
    ).not.toBeInstanceOf(Immutable.Map)
  })

  test('should call detailsVisibilityChange once clicked if browser not mobile', () => {
    const detailsVisibilityChangeSpy = jest.fn()
    const wrapper = shallow(
      <RecipeList
        recipes={Immutable.Map({ 101: {} })}
        detailVisibilityChange={detailsVisibilityChangeSpy}
      />,
    )
    wrapper.find(RecipeHolder).first().simulate('click')
    expect(detailsVisibilityChangeSpy).toHaveBeenCalled()
  })

  test('should call boxDetailsVisibilityChange once clicked if browser mobile and box details not show', () => {
    const boxDetailsVisibilityChange = jest.fn()
    const wrapper = shallow(
      <RecipeList
        recipes={Immutable.Map({ 101: {} })}
        detailVisibilityChange={() => { }}
        boxDetailsVisibilityChange={boxDetailsVisibilityChange}
        browser='mobile'
        boxSummaryVisible={false}
      />,
    )
    wrapper.find(RecipeHolder).first().simulate('click')
    expect(boxDetailsVisibilityChange).toHaveBeenCalled()
  })

  test('should NOT call boxDetailsVisibilityChange once clicked if browser mobile and box details open', () => {
    const boxDetailsVisibilityChange = jest.fn()
    const wrapper = shallow(
      <RecipeList
        recipes={Immutable.Map({ 101: {} })}
        detailVisibilityChange={() => { }}
        boxDetailsVisibilityChange={boxDetailsVisibilityChange}
        browser='mobile'
        boxSummaryVisible
      />,
    )
    wrapper.find(RecipeHolder).first().simulate('click')
    expect(boxDetailsVisibilityChange).not.toHaveBeenCalled()
  })
})
