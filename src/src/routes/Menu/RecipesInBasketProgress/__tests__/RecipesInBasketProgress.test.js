import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'

import { RecipesInBasketProgress } from '..'

describe('RecipesInBasketProgress Component', () => {
  let wrapper
  let PROPS = {
    isAuthenticated: false,
    selectedRecipesCount: 0,
  }

  beforeEach(() => {
    wrapper = mount(
      <RecipesInBasketProgress {...PROPS} />
    )
  })

  test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<RecipesInBasketProgress {...PROPS} />, div)
  })

  describe('when no recipes are selected', () => {
    beforeEach(() => {
      wrapper.setProps({ selectedRecipesCount: 0 })
    })

    test('it does not render', () => {
      expect(wrapper.html()).toBeNull()
    })
  })

  describe('when more than one recipe is selected', () => {
    beforeEach(() => {
      wrapper.setProps({ selectedRecipesCount: 1 })
    })

    describe('FloatCard renders correctly', () => {
      test('it renders a FloatCard', () => {
        expect(wrapper.find('FloatCard')).toHaveLength(1)
      })

      test('the FloatCard close icon only shows in mobile', () => {
        expect(wrapper.find('FloatCard').prop('closeIcon'))
          .toBe('small-screens-only')
      })

      test('the FloatCard has the right offset', () => {
        expect(wrapper.find('FloatCard').prop('offsetVertical')).toBe('8rem')
      })

      test('it renders a RecipesInBasketProgressContent inside the FloatCard', () => {
        expect(wrapper.find('FloatCard').find('RecipesInBasketProgressContent'))
          .toHaveLength(1)
      })
    })

    test('does not render the ExtraInfo component', () => {
      expect(wrapper.find('ExtraInfo').exists()).toBe(false)
    })

    describe('and isAuthenticated is set to false', () => {
      beforeEach(() => {
        wrapper.setProps({ isAuthenticated: false })
      })

      test('does not render the ExtraInfo component', () => {
        expect(wrapper.find('ExtraInfo').exists()).toBe(false)
      })

      test('renders the RecipesInBasketProgressContent inside FloatCard', () => {
        expect(wrapper.find('FloatCard').find('RecipesInBasketProgressContent').exists()).toBe(true)
      })
    })

    describe('and isAuthenticated is set to true', () => {
      beforeEach(() => {
        wrapper.setProps({ isAuthenticated: true })
      })

      test('renders the ExtraInfo component inside the FloatCard', () => {
        expect(wrapper.find('FloatCard').find('ExtraInfo').exists()).toBe(true)
      })

      test('renders the RecipesInBasketProgressContent component inside ExtraInfoMain', () => {
        expect(wrapper.find('ExtraInfoMain').find('RecipesInBasketProgressContent').exists()).toBe(true)
      })

      test('does not render the RecipesInBasketProgressContent outside ExtraInfo', () => {
        expect(wrapper.find('RecipesInBasketProgressContent').length).toBe(1)
      })
    })
  })
})
