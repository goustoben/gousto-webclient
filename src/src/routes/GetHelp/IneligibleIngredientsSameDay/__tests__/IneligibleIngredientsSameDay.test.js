import React from 'react'
import { mount } from 'enzyme'
import { client as routes } from 'config/routes'
import { IneligibleIngredientsSameDay } from '../IneligibleIngredientsSameDay'

describe('<IneligibleIngredientsSameDay />', () => {
  const TRACK_INGREDIENTS_GO_TO_MY_GOUSTO = jest.fn()
  const trackIngredientsGetInTouchClick = jest.fn()
  const trackViewCreditClick = jest.fn()

  const HEADER_TEXT = 'Ingredients'
  let wrapper
  let CTAs
  let getHelpLayout

  beforeEach(() => {
    wrapper = mount(
      <IneligibleIngredientsSameDay
        ssrTwoComplaintsSameDay={false}
        trackIngredientsGoToMyGousto={TRACK_INGREDIENTS_GO_TO_MY_GOUSTO}
        trackIngredientsGetInTouchClick={trackIngredientsGetInTouchClick}
        trackViewCreditClick={trackViewCreditClick}
      />
    )
    getHelpLayout = wrapper.find('GetHelpLayout2')
  })

  const locationAssignSpy = jest.fn()
  const originalWindowLocation = window.location

  test('header is rendering correctly', () => {
    expect(getHelpLayout.prop('headingText')).toBe(HEADER_TEXT)
  })

  test('CTABack is pointing to My Gousto', () => {
    expect(getHelpLayout.find('CTABack').prop('url')).toBe(routes.myGousto)
  })

  describe('when ssrTwoComplaintsSameDay feature flag is set to false', () => {
    beforeEach(() => {
      wrapper.setProps({ ssrTwoComplaintsSameDay: false })
    })

    test('renders paragrah body inside the Card with the right order number values', () => {
      expect(wrapper.find('Card h2').text()).toContain(
        'You have previously complained about this box earlier today')
    })

    test('renders paragrah body text inside the Card', () => {
      expect(wrapper.find('Card p').text()).toContain(
        'Unfortunately you can’t complain about the same box twice in one day but if you have any other issues, please let us know the next day.'
      )
    })

    test('renders only "Go to My Gousto" CTA', () => {
      const CTA = getHelpLayout.find('CTA')

      expect(CTA).toHaveLength(1)
      expect(CTA.text()).toBe('Go to My Gousto')
    })

    describe('when "Go to My Gousto" CTA is clicked', () => {
      beforeEach(() => {
        delete window.location
        window.location = { assign: locationAssignSpy }

        getHelpLayout.find('CTA').simulate('click')
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

  describe('when ssrTwoComplaintsSameDay feature flag is set to true', () => {
    beforeEach(() => {
      wrapper.setProps({ ssrTwoComplaintsSameDay: true })
      CTAs = wrapper.find('GetHelpLayout2').find('CTA')
    })

    test('renders correct h2 heading', () => {
      expect(wrapper.find('h2').text())
        .toBe('We’re so sorry to hear you have another ingredient issue with this box')
    })

    test('renders correct copy inside the Card', () => {
      expect(wrapper.find('Card p').at(0).text())
        .toBe('If you’re trying to find your credit for an ingredient issue you reported earlier today, then you can view your credit here.')

      expect(wrapper.find('Card p').at(1).text())
        .toBe('If you’ve had another issue, please contact us through the \'Get in touch\' button below as we’ll be happy to help. Otherwise, you can report it via our website tomorrow.')
    })

    test('renders a link to My Details page', () => {
      expect(wrapper.find('GoustoLink').find('a').prop('href')).toBe('/my-details')
    })

    test('the link to My Details page has correct tracking', () => {
      expect(wrapper.find('GoustoLink').prop('tracking'))
        .toBe(trackViewCreditClick)
    })

    test('renders "Go to My Gousto" and "Get in Touch" CTAs', () => {
      expect(CTAs).toHaveLength(2)
      expect(CTAs.at(0).text()).toBe('Get in touch')
      expect(CTAs.at(1).text()).toBe('Go to My Gousto')
    })

    describe('when "Get in touch" CTA is clicked', () => {
      beforeEach(() => {
        delete window.location
        window.location = { assign: locationAssignSpy }

        const getInTouchCTA = CTAs.at(0)
        getInTouchCTA.simulate('click')
      })

      afterEach(() => {
        window.location = originalWindowLocation
        locationAssignSpy.mockClear()
      })

      test('calls the trackIngredientsGetInTouchClick', () => {
        expect(trackIngredientsGetInTouchClick).toHaveBeenCalled()
      })

      test('redirects to Contact us page', () => {
        expect(window.location.assign).toHaveBeenCalledWith(routes.getHelp.contact)
      })
    })
  })
})
