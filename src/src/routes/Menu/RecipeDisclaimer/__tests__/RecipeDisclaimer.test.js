import React from 'react'
import { shallow } from 'enzyme'
import { RecipeDisclaimer } from '../RecipeDisclaimer.js'

describe('RecipeDisclaimer', () => {
  let wrapper
  describe('when the recipe contains a disclaimer', () => {
    const disclaimer = "Iron, magnesium and B vitamins reducing tiredness and fatigue"
    beforeEach(() => {
      wrapper = shallow(
        <RecipeDisclaimer
          disclaimer={disclaimer}
        />
      )
    })

    test('should display a paragraph containing the disclaimer', () => {
      expect(wrapper.find('.disclaimerText').exists()).toBe(true)
    })

    test('should display the correct disclaimer text', () => {
      expect(wrapper.find('.disclaimerText').text()).toEqual(disclaimer)
    })

    test('should display a heart icon with the disclaimer', () => {
      expect(wrapper.find('.disclaimerIcon').exists()).toBe(true)
    })
  })

  describe('when there is no disclaimer', () => {
    test('should not display the disclaimer', () => {
      wrapper = shallow(
        <RecipeDisclaimer
          disclaimer={null}
        />
      )
      expect(wrapper.find('.disclaimerWrapper').exists()).toBe(false)
    })
  })
})
