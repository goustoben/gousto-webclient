import React from 'react'
import { mount } from 'enzyme'
import { browserHistory } from 'react-router'
import { client as routes } from 'config/routes'
import { RepetitiveIngredientsIssues } from '../RepetitiveIngredientsIssues'

describe('<RepetitiveIngredientsIssues />', () => {
  const TRACK_INGREDIENTS_GET_IN_TOUCH = jest.fn()
  const TRACK_INGREDIENTS_CONTINUE_ON_WEB = jest.fn()
  const UPDATE_HAS_REPETITIVE_ISSUES_SCREEN = jest.fn()
  const VALIDATE_LATEST_ORDER = jest.fn()

  const ORDER_ID = '123456'
  const USER_ID = '7891011'
  const NUM_ORDERS_CHECKED = 1
  const NUM_ORDERS_COMPENSATED = 1
  const PARAMS = {
    userId: USER_ID,
    orderId: ORDER_ID
  },
  const FIRST_NAME = 'Gousto'
  const originalBrowserHistory = browserHistory

  const wrapper = mount(
    <RepetitiveIngredientsIssues
      numOrdersChecked={NUM_ORDERS_CHECKED}
      numOrdersCompensated={NUM_ORDERS_COMPENSATED}
      params={PARAMS}
      firstName={FIRST_NAME}
      trackIngredientsGetInTouchClick={TRACK_INGREDIENTS_GET_IN_TOUCH}
      trackContinueToSsrClick={TRACK_INGREDIENTS_CONTINUE_ON_WEB}
      updateHasSeenRepetitiveIssuesScreen={UPDATE_HAS_REPETITIVE_ISSUES_SCREEN}
      validateLatestOrder={VALIDATE_LATEST_ORDER}
    />
  )

  test('hasBackButton is true in the layout', () => {
    expect(wrapper.find('CTABack').prop('url')).toBe(routes.myGousto)
  })

  test('bottom bar buttons are rendering correctly', () => {
    expect(wrapper.find('CTA').at(0).text()).toBe('Get in touch')
  })

  test('bottom bar buttons are rendering correctly', () => {
    expect(wrapper.find('CTA').at(1).text()).toBe('Continue on web')
  })

  test('calls updateHasSeenRepetitiveIssuesScreen with true', () => {
    expect(UPDATE_HAS_REPETITIVE_ISSUES_SCREEN).toHaveBeenCalledWith(true)
  })

  test('calls validateLatestOrder with params', () => {
    expect(VALIDATE_LATEST_ORDER).toHaveBeenCalledWith({ orderId: ORDER_ID, costumerId: USER_ID})
  })

  describe('when the Get in touch CTA is clicked', () => {
    beforeEach(() => {
      browserHistory.push = jest.fn()
      wrapper.find('CTA').at(0).simulate('click')
    })

    afterEach(() => {
      jest.clearAllMocks()
      browserHistory.push = originalBrowserHistory.push
    })

    test('calls the function passed through trackIngredientsGetInTouchClick ', () => {
      expect(TRACK_INGREDIENTS_GET_IN_TOUCH).toHaveBeenCalled()
    })

    test('redirects contact us page', () => {
      expect(browserHistory.push).toHaveBeenCalledWith(`${routes.getHelp.index}/${routes.getHelp.contact}`)
    })
  })

  describe('when the continue on web CTA is clicked', () => {
    beforeEach(() => {
      browserHistory.push = jest.fn()
      wrapper.find('CTA').at(1).simulate('click')
    })

    afterEach(() => {
      jest.clearAllMocks()
      browserHistory.push = originalBrowserHistory.push
    })

    test('calls the function passed through trackContinueToSsrClick ', () => {
      expect(TRACK_INGREDIENTS_CONTINUE_ON_WEB).toHaveBeenCalled()
    })

    test('redirects ingredients page', () => {
      expect(browserHistory.push).toHaveBeenCalledWith(`${routes.getHelp.ingredients({ userId: USER_ID, orderId: ORDER_ID })}`)
    })
  })

  describe('numOrders checked & numOrdersCompensated are both equal to 1', () => {
    test('header is rendering with correct text and value', () => {
      expect(wrapper.find('GetHelpLayout2').prop('headingText')).toBe(

        `${FIRST_NAME}, it looks like you've had issues with your previous box too`)
    })
    test('body is rendering with the correct text and value', () => {
      expect(wrapper.find('Card').text()).toEqual('We see that you’ve had issues with your previous box too. We’d love to speak to you to get to the bottom of your repetitive issues and make things right.')
    })
  })

  describe('numOrders checked & numOrdersCompensated are both greater than 1 and equal', () => {
    const NEW_NUM_ORDERS_COMPENSATED = 2
    const NEW_NUM_ORDERS_CHECKED = 2
    beforeEach(() => {
      wrapper.setProps({ numOrdersChecked: NEW_NUM_ORDERS_CHECKED, numOrdersCompensated: NEW_NUM_ORDERS_COMPENSATED })
    })

    test('header is rendering with correct text and value', () => {
      expect(wrapper.find('GetHelpLayout2').prop('headingText')).toBe(

        `${FIRST_NAME}, it looks like you've had issues with all of your last ${NEW_NUM_ORDERS_COMPENSATED} boxes`)
    })
    test('body is rendering with the correct text and value', () => {
      expect(wrapper.find('Card').text()).toEqual(`We see that all of your last ${NEW_NUM_ORDERS_CHECKED} boxes have had issues.
      We’d love to speak to you to get to the bottom of your repetitive issues and make things right.`)
    })
  })
  describe('numOrders checked & numOrdersCompensated are both greater than 1 and are not equal', () => {
    const NEW_NUM_ORDERS_COMPENSATED = 2
    const NEW_NUM_ORDERS_CHECKED = 4
    beforeEach(() => {
      wrapper.setProps({ numOrdersChecked: NEW_NUM_ORDERS_CHECKED, numOrdersCompensated: NEW_NUM_ORDERS_COMPENSATED })
    })

    test('header is rendering with correct text and value', () => {
      expect(wrapper.find('GetHelpLayout2').prop('headingText')).toBe(

        `${FIRST_NAME}, it looks like you've had issues with ${NEW_NUM_ORDERS_COMPENSATED} of your last ${NEW_NUM_ORDERS_CHECKED} boxes`)
    })
    test('body is rendering with the correct text and value', () => {
      expect(wrapper.find('Card').text()).toEqual(`We see that ${NEW_NUM_ORDERS_COMPENSATED} out of your last ${NEW_NUM_ORDERS_CHECKED} boxes have had issues.
      We’d love to speak to you to get to the bottom of your repetitive issues and make things right.`)
    })
  })
})

