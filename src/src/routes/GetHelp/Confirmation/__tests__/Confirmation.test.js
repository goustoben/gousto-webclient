import React from 'react'
import { mount } from 'enzyme'

import { client as routes } from 'config/routes'
import { Confirmation } from '../Confirmation'

describe('<Confirmation />', () => {
  const TRACK_CONFIRMATION_CTA_FUNCTION = jest.fn()
  const TRACK_REFUND_FAQ_CLICK = jest.fn()
  const USER_NAME = 'Batman'
  const ISSUES_IDS = ['1', '2', '3']
  const CREDIT = 2

  const wrapper = mount(
    <Confirmation
      creditAmount={CREDIT}
      isMultiComplaints={false}
      issuesIDs={ISSUES_IDS}
      nameFirst={USER_NAME}
      trackConfirmationCTA={TRACK_CONFIRMATION_CTA_FUNCTION}
      trackRefundFAQClick={TRACK_REFUND_FAQ_CLICK}
    />
  )
  const getHelpLayout = wrapper.find('GetHelpLayout2')
  const BottomBar = getHelpLayout.find('BottomFixedContent')
  const Button1 = BottomBar.find('CTA')

  const locationAssignSpy = jest.fn()
  const originalWindowLocation = window.location

  test('header is rendering correctly', () => {
    expect(getHelpLayout.prop('headingText')).toBe(`${USER_NAME}, thanks for your feedback`)
  })

  test('hasBackButton is false in the layout', () => {
    expect(getHelpLayout.prop('hasBackButton')).toBe(false)
  })

  test('renders the copy inside the Card', () => {
    expect(getHelpLayout.find('Card').at(0).text()).toContain(
      'We really appreciate you letting us know about the issue. Credit will be automatically taken off your next order as an apology.'
    )
  })

  describe('renders an alert inside the Card', () => {
    let alert

    beforeEach(() => {
      alert = getHelpLayout.find('Card').at(0).find('Alert')
    })

    test('of type success', () => {
      expect(alert.prop('type')).toBe('success')
    })

    test('without the default icon', () => {
      expect(alert.prop('hasIcon')).toBe(false)
    })

    test('with a custom icon', () => {
      expect(alert.find('.alertIcon').exists()).toBe(true)
    })

    test('with the credit amount', () => {
      expect(alert.text()).toBe('£2 credit added')
    })

    describe('when it is part of multiple complaints on the same order', () => {
      beforeEach(() => {
        wrapper.setProps({ isMultiComplaints: true })
      })

      test('renders the word Extra', () => {
        expect(alert.text()).toBe('Extra £2 credit added')
      })
    })
  })

  test('renders a copy about credit inside the Card', () => {
    expect(getHelpLayout.find('Card').at(0).text()).toContain(
      'Credit can take up to 1 hour to appear in your account.'
    )
  })

  test('renders GetHelpFAQ, passing the issues IDs', () => {
    expect(getHelpLayout.find('GetHelpFAQ').prop('issuesIDs')).toBe(ISSUES_IDS)
  })

  describe('when GetHelpFAQ onClick prop is called', () => {
    const ARTICLE_NAME = 'An article name'

    beforeEach(() => {
      getHelpLayout.find('GetHelpFAQ').prop('onClick')(ARTICLE_NAME)
    })

    test('trackRefundFAQClick is called with the right data', () => {
      expect(TRACK_REFUND_FAQ_CLICK).toHaveBeenCalledWith({
        articleName: ARTICLE_NAME,
        compensationAmount: CREDIT,
        isAutoAccept: false,
        isMultiComplaints: false,
      })
    })
  })

  test('bottom bar buttons are rendering correctly', () => {
    expect(Button1.text()).toBe('Done')
  })

  describe('when the CTA is clicked', () => {
    beforeEach(() => {
      delete window.location
      window.location = { assign: locationAssignSpy }

      Button1.simulate('click')
    })

    afterEach(() => {
      window.location = originalWindowLocation

      locationAssignSpy.mockClear()
    })

    test('calls the function passed through trackConfirmationCTA ', () => {
      expect(TRACK_CONFIRMATION_CTA_FUNCTION).toHaveBeenCalled()
    })

    test('redirects to My Gousto', () => {
      expect(window.location.assign).toHaveBeenCalledWith(routes.myGousto)
    })
  })
})
