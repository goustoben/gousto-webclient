import React from 'react'
import { mount } from 'enzyme'

import { client as routes } from 'config/routes'
import { IneligibleIngredients } from '../IneligibleIngredients'

describe('<IneligibleIngredients />', () => {
  const TRACK_INGREDIENTS_GET_IN_TOUCH = jest.fn()
  const TRACK_INGREDIENTS_GO_TO_MY_GOUSTO = jest.fn()
  const HEADER_TEXT = 'Ingredients'
  const NUM_ORDERS = 2
  const NUM_ORDERS_COMPENSATED = 4

  const wrapper = mount(
    <IneligibleIngredients
      ineligibilityCriteria={{
        numOrders: NUM_ORDERS,
        numOrdersCompensated: NUM_ORDERS_COMPENSATED
      }}
      trackIngredientsGetInTouchClick={TRACK_INGREDIENTS_GET_IN_TOUCH}
      trackIngredientsGoToMyGousto={TRACK_INGREDIENTS_GO_TO_MY_GOUSTO}
    />
  )
  const getHelpLayout = wrapper.find('GetHelpLayout2')
  const cardParagraph = getHelpLayout.find('Card p')
  const CTA1 = getHelpLayout.find('CTA').at(0)
  const CTA2 = getHelpLayout.find('CTA').at(1)

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
      `You have had issues with ${NUM_ORDERS_COMPENSATED} of your last ${NUM_ORDERS} boxes`)
  })

  test('renders paragrah body text inside the Card', () => {
    expect(cardParagraph.at(1).text()).toContain(
      'We’re so sorry to hear that you’re experiencing so many issues with your boxes. We just wanted to let you know we’re looking into this to ensure they don’t continue to happen. If you’re experiencing more issues with your boxes do not hesitate to get in touch with us.'
    )
  })

  test('bottom bar buttons are rendering correctly', () => {
    expect(CTA1.text()).toBe('Get in Touch')
  })

  test('bottom bar buttons are rendering correctly', () => {
    expect(CTA2.text()).toBe('Go to My Gousto')
  })

  describe('when the getInTouch CTA is clicked', () => {
    beforeEach(() => {
      delete window.location
      window.location = { assign: locationAssignSpy }

      CTA1.simulate('click')
    })

    afterEach(() => {
      window.location = originalWindowLocation

      locationAssignSpy.mockClear()
    })

    test('calls the function passed through trackIngredientsGetInTouchClick ', () => {
      expect(TRACK_INGREDIENTS_GET_IN_TOUCH).toHaveBeenCalled()
    })

    test('redirects to contact us page', () => {
      expect(window.location.assign).toHaveBeenCalledWith(routes.getHelp.contact)
    })
  })

  describe('when the Go to My Gousto is clicked', () => {
    beforeEach(() => {
      delete window.location
      window.location = { assign: locationAssignSpy }

      CTA2.simulate('click')
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
