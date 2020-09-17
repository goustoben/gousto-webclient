import React from 'react'
import { shallow } from 'enzyme'
import { CategoriesShortcutsContainer } from './CategoriesShortcutsContainer'

describe('CategoriesShortcutsContainer', () => {
  let wrapper

  beforeEach(() => {
    const state = {}
    wrapper = shallow(<CategoriesShortcutsContainer />, {
      context: {
        store: {
          getState: () => state,
          dispatch: () => {},
          subscribe: () => {}
        }
      }
    })
  })
  test('should pass down correct props', () => {
    expect(wrapper.find('CategoriesShortcuts').props()).toEqual({
      collectionFilterChange: expect.any(Function),
      showCategoriesModal: expect.any(Function),
    })
  })
})
