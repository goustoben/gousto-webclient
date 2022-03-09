import React from 'react'
import * as reactRedux from 'react-redux'
import { shallow } from 'enzyme'
import { RecipeDisclaimer } from './RecipeDisclaimer'

describe('RecipeDisclaimer', () => {
  let wrapper
  const claim = {
    disclaimer: 'Iron, magnesium and B vitamins reducing tiredness and fatigue',
    icon: 'health-kitchen-heart',
    theme: {
      color: 'black',
      backgroundColor: 'light-green',
      iconColor: 'green'
    }
  }

  describe('when the recipe contains a disclaimer', () => {
    beforeEach(() => {
      jest.spyOn(reactRedux, 'useSelector').mockImplementation(() => claim)

      wrapper = shallow(
        <RecipeDisclaimer />
      )
    })

    test('should display a paragraph containing the disclaimer', () => {
      expect(wrapper.find('.disclaimerText').exists()).toBe(true)
    })

    test('should display the correct disclaimer text', () => {
      expect(wrapper.find('.disclaimerText').text()).toEqual(claim.disclaimer)
    })

    test('should display a heart icon with the disclaimer', () => {
      expect(wrapper.find('.disclaimerIcon').exists()).toBe(true)
    })
  })

  describe('when there is no disclaimer', () => {
    beforeEach(() => {
      jest.spyOn(reactRedux, 'useSelector').mockImplementation(() => null)
    })

    afterAll(() => jest.clearAllMocks())

    test('should not display the disclaimer', () => {
      wrapper = shallow(
        <RecipeDisclaimer />
      )
      expect(wrapper.find('.disclaimerWrapper').exists()).toBe(false)
    })
  })

  describe('when there is no theme', () => {
    beforeEach(() => {
      jest.spyOn(reactRedux, 'useSelector').mockImplementation(() => null)
    })

    afterAll(() => jest.clearAllMocks())

    test('should not display the disclaimer', () => {
      wrapper = shallow(
        <RecipeDisclaimer />
      )
      expect(wrapper.find('.disclaimerWrapper').exists()).toBe(false)
    })
  })
})
