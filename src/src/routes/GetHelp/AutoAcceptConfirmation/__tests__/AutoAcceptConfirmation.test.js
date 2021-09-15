import React from 'react'
import { mount } from 'enzyme'

import { client } from 'config/routes'
import { AutoAcceptConfirmation } from '../AutoAcceptConfirmation'

describe('<AutoAcceptConfirmation />', () => {
  let wrapper
  let getHelpLayout
  const locationAssignSpy = jest.fn()
  const TRACK_CONFIRMATION_CTA_FUNCTION = jest.fn()
  const TRACK_INGREDIENTS_GET_IN_TOUCH = jest.fn()
  const TRACK_REFUND_FAQ_CLICK = jest.fn()
  const originalWindowLocation = window.location

  const USER_NAME = 'Batman'
  const ISSUES_IDS = ['1', '2', '3']
  const CREDIT = 2

  beforeEach(() => {
    wrapper = mount(
      <AutoAcceptConfirmation
        creditAmount={CREDIT}
        totalCreditAmount={0}
        issuesIDs={ISSUES_IDS}
        nameFirst={USER_NAME}
        trackConfirmationCTA={TRACK_CONFIRMATION_CTA_FUNCTION}
        trackIngredientsGetInTouchClick={TRACK_INGREDIENTS_GET_IN_TOUCH}
        trackRefundFAQClick={TRACK_REFUND_FAQ_CLICK}
      />
    )

    getHelpLayout = wrapper.find('GetHelpLayout2')
  })

  test('hasBackButton is false in the layout', () => {
    expect(getHelpLayout.prop('hasBackButton')).toBe(false)
  })

  test('renders the copy with the customer name and credit amount inside the Card component', () => {
    expect(wrapper.find('Card').at(0).text()).toContain(
      `${USER_NAME}, we’ve gone ahead and added £${CREDIT} credit to your account as an apology. This will be automatically taken off your next order.`
    )
  })

  test('renders a copy about credit inside the Card', () => {
    expect(getHelpLayout.find('Card').at(0).text()).toContain(
      'Credit can take up to 1 hour to appear in your account.'
    )
  })

  describe('when there is an issue with only one ingredient', () => {
    beforeEach(() => {
      wrapper.setProps({ issuesIDs: ['3'] })
    })

    test('renders the header without specifying the number of ingredients', () => {
      expect(wrapper.find('GetHelpLayout2').prop('headingText'))
        .toBe('We’re so sorry to hear about your issue with your ingredient')
    })
  })

  describe('when there is an issue with more than one ingredient', () => {
    beforeEach(() => {
      wrapper.setProps({ issuesIDs: ISSUES_IDS })
    })

    test('renders the header specifying the number of ingredients', () => {
      expect(wrapper.find('GetHelpLayout2').prop('headingText'))
        .toBe('We’re so sorry to hear about your 3 issues with your ingredients')
    })
  })

  describe('when this is a multicomplaint', () => {
    beforeEach(() => {
      wrapper.setProps({ totalCreditAmount: 2 })
    })

    test('renders additional text', () => {
      expect(wrapper.find('Card').at(0).text()).toContain(
        `${USER_NAME}, we’ve gone ahead and added an additional £${CREDIT} credit to your account as an apology, bringing your total compensation to £2. This will be automatically taken off your next order.`
      )
    })

    test('renders Extra text on the alert', () => {
      expect(wrapper.find('Alert').text()).toContain(
        `Extra £${CREDIT} credit added`
      )
    })
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
        isAutoAccept: true,
      })
    })
  })

  test('bottom bar buttons are rendering correctly', () => {
    const button = getHelpLayout.find('BottomFixedContent').find('CTA')

    expect(button.text()).toBe('Done')
  })

  describe('when the CTA is clicked', () => {
    beforeEach(() => {
      const button = getHelpLayout.find('BottomFixedContent').find('CTA')
      delete window.location
      window.location = { assign: locationAssignSpy }

      button.simulate('click')
    })

    afterEach(() => {
      window.location = originalWindowLocation

      locationAssignSpy.mockClear()
    })

    test('calls the function passed through trackConfirmationCTA prop with isAutoAccept set to true', () => {
      expect(TRACK_CONFIRMATION_CTA_FUNCTION).toHaveBeenCalledWith()
    })

    test('redirects to My Gousto', () => {
      expect(window.location.assign).toHaveBeenCalledWith(client.myGousto)
    })
  })

  test('renders a Need More Help copy', () => {
    expect(getHelpLayout.find('.extraInfo').find('p').text()).toBe(
      'Need more help? If you have any further questions please get in touch with our team.'
    )
  })

  test('renders a Get in touch link', () => {
    expect(getHelpLayout.find('GoustoLink').text()).toBe('Get in touch')
  })

  test('the Get in touch link points to Contact Us page', () => {
    expect(getHelpLayout.find('GoustoLink').prop('to')).toBe(`${client.getHelp.index}/${client.getHelp.contact}`)
  })

  describe('when clicking the Get in touch link', () => {
    beforeEach(() => {
      getHelpLayout.find('GoustoLink').simulate('click')
    })

    test('calls the function passed through trackConfirmationCTA prop with the right amount and isAutoAccept set to true', () => {
      expect(TRACK_INGREDIENTS_GET_IN_TOUCH).toHaveBeenCalled()
    })
  })
})
