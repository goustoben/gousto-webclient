import React from 'react'
import { shallow } from 'enzyme'
import { browserHistory } from 'react-router'
import { client } from 'config/routes'
import * as windowUtils from 'utils/window'
import { RecipeCardContent } from './RecipeCardContent'

describe('The RecipeCardContent component', () => {
  let wrapper

  const TEST_RECIPE = {
    id: '12345',
    title: '',
    ingredients: [],
  }

  const trackRecipeCardClick = jest.fn()
  const trackRecipeCardGetInTouchClick = jest.fn()

  beforeEach(() => {
    wrapper = shallow(
      <RecipeCardContent
        recipe={TEST_RECIPE}
        trackRecipeCardClick={trackRecipeCardClick}
        trackRecipeCardGetInTouchClick={trackRecipeCardGetInTouchClick}
      />
    )
  })

  test('Renders View recipe CTA', () => {
    expect(wrapper.find('CTA').first().html().includes('View recipe')).toBe(true)
  })

  test('Renders Get in touch CTA', () => {
    expect(wrapper.find('CTA').last().html().includes('Get in touch')).toBe(true)
  })

  describe('Clicking the Get in touch CTA', () => {
    beforeEach(() => {
      browserHistory.push = jest.fn()
      wrapper.find('CTA').last().simulate('click')
    })

    afterEach(() => {
      jest.resetAllMocks()
    })

    test('Redirect to the Contact page', () => {
      expect(browserHistory.push).toHaveBeenCalledWith(`${client.getHelp.index}/${client.getHelp.contact}`)
    })

    test('Tracks the click on Get In Touch', () => {
      expect(trackRecipeCardGetInTouchClick).toHaveBeenCalled()
    })
  })

  describe('Clicking the View recipe CTA', () => {
    afterEach(() => {
      jest.resetAllMocks()
    })

    describe('When the View recipe CTA is clicked', () => {
      let windowOpenSpy

      beforeEach(() => {
        windowOpenSpy = jest.spyOn(windowUtils, 'windowOpen')
        wrapper.find('CTA').first().simulate('click')
      })

      afterEach(() => {
        jest.resetAllMocks()
      })

      test('Then the cookbook is opened in a new tab', () => {
        expect(windowOpenSpy).toHaveBeenCalledWith(`/cookbook/recipe-by-id/${TEST_RECIPE.id}`)
      })

      test('Then tracking function is called', () => {
        expect(trackRecipeCardClick).toHaveBeenCalledWith(TEST_RECIPE.id)
      })
    })
  })
})
