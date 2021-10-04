import React from 'react'
import { mount } from 'enzyme'

import { client as routes } from 'config/routes'
import { IneligibleIngredientsSameDay } from '../IneligibleIngredientsSameDay'

describe('<IneligibleIngredientsSameDay />', () => {
  const TRACK_INGREDIENTS_GO_TO_MY_GOUSTO = jest.fn()
  const HEADER_TEXT = 'Ingredients'

  const wrapper = mount(
    <IneligibleIngredientsSameDay
      trackIngredientsGoToMyGousto={TRACK_INGREDIENTS_GO_TO_MY_GOUSTO}
    />
  )
  const getHelpLayout = wrapper.find('GetHelpLayout2')
  const cardParagraph = getHelpLayout.find('Card p')
  const CTA = getHelpLayout.find('CTA')

  const locationAssignSpy = jest.fn()
  const originalWindowLocation = window.location

  test('header is rendering correctly', () => {
    expect(getHelpLayout.prop('headingText')).toBe(HEADER_TEXT)
  })

  test('hasBackButton is true in the layout', () => {
    expect(getHelpLayout.prop('hasBackButton')).toBe(true)
  })

  test('renders paragrah body inside the Card with the right order number values', () => {
    expect(cardParagraph.at(0).text()).toContain(
      'You have previously complained about this box earlier today')
  })

  test('renders paragrah body text inside the Card', () => {
    expect(cardParagraph.at(1).text()).toContain(
      'Unfortunately you can’t complain about the same box twice in one day but if you have any other issues, please let us know the next day.'
    )
  })

  test('bottom bar buttons are rendering correctly', () => {
    expect(CTA.text()).toBe('Go to My Gousto')
  })

  describe('when the Go to My Gousto is clicked', () => {
    beforeEach(() => {
      delete window.location
      window.location = { assign: locationAssignSpy }

      CTA.simulate('click')
    })

    afterEach(() => {
      window.location = originalWindowLocation

      locationAssignSpy.mockClear()
    })

    test('calls the function passed through trackIngredientsGoToMyGousto ', () => {
      expect(TRACK_INGREDIENTS_GO_TO_MY_GOUSTO).toHaveBeenCalled()
    })

    test('redirects to myGousto page', () => {
      expect(window.location.assign).toHaveBeenCalledWith(routes.myGousto)
    })
  })
})
