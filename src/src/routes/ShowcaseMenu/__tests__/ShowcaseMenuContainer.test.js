import React from 'react'
import Immutable from 'immutable'
import { shallow } from 'enzyme'
import { ShowcaseMenuContainer } from '../ShowcaseMenuContainer'

describe('ShowcaseMenuContainer', () => {
  let wrapper

  const state = {
    basket: Immutable.fromJS({}),
    menu: Immutable.fromJS({
      menuVariants: Immutable.fromJS({}),
    }),
    menuCollections: Immutable.fromJS([]),
    recipes: Immutable.fromJS([]),
    menuRecipes: Immutable.fromJS([]),
  }

  const store = {
    getState: () => state,
    dispatch: jest.fn(),
    subscribe: jest.fn(),
  }

  beforeEach(() => {
    wrapper = shallow(<ShowcaseMenuContainer store={store} />)
  })

  test('then it should pass the correct props', () => {
    expect(wrapper.prop('collectionDescriptorsInLines')).toEqual(expect.any(Object))
    expect(wrapper.prop('collectionDescriptorsSingleLine')).toEqual(expect.any(Array))
    expect(wrapper.prop('currentCollectionId')).toBe(null)
    expect(wrapper.prop('recipes')).toEqual(expect.any(Immutable.List))
    expect(wrapper.prop('proceed')).toEqual(expect.any(Function))
    expect(wrapper.prop('changeCollection')).toEqual(expect.any(Function))
    expect(wrapper.prop('openRecipeDetails')).toEqual(expect.any(Function))
  })
})
