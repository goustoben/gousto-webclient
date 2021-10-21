import React from 'react'
import Immutable from 'immutable'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
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

  const mockStore = configureMockStore()
  const store = mockStore(state)

  beforeEach(() => {
    wrapper = shallow(<ShowcaseMenuContainer store={store} />)
  })

  test('then it should pass the correct props', () => {
    expect(wrapper.find('ShowcaseMenu').prop('collectionDescriptorsInLines')).toEqual(
      expect.any(Object)
    )
    expect(wrapper.find('ShowcaseMenu').prop('collectionDescriptorsSingleLine')).toEqual(
      expect.any(Array)
    )
    expect(wrapper.find('ShowcaseMenu').prop('currentCollectionId')).toBe(null)
    expect(wrapper.find('ShowcaseMenu').prop('recipes')).toEqual(expect.any(Immutable.List))
    expect(wrapper.find('ShowcaseMenu').prop('proceed')).toEqual(expect.any(Function))
    expect(wrapper.find('ShowcaseMenu').prop('changeCollection')).toEqual(expect.any(Function))
    expect(wrapper.find('ShowcaseMenu').prop('openRecipeDetails')).toEqual(expect.any(Function))
  })
})
