import React from 'react'
import { mount } from 'enzyme'

import { client as routes } from 'config/routes'
import { Confirmation } from '../Confirmation'

describe('<Confirmation />', () => {
  const TRACK_CONFIRMATION_CTA_FUNCTION = jest.fn()

  const wrapper = mount(<Confirmation trackConfirmationCTA={TRACK_CONFIRMATION_CTA_FUNCTION} />)
  const getHelpLayout = wrapper.find('GetHelpLayout2')
  const BottomBar = getHelpLayout.find('BottomFixedContent')
  const Button1 = BottomBar.find('CTA')

  describe('rendering', () => {
    const locationAssignSpy = jest.fn()
    const originalWindowLocation = window.location

    test('header is rendering correctly', () => {
      expect(getHelpLayout.prop('headingText')).toBe('Thanks for your feedback')
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

      test('calls the function passed through trackConfirmationCTA prop', () => {
        expect(TRACK_CONFIRMATION_CTA_FUNCTION).toHaveBeenCalledTimes(1)
      })

      test('redirects to the URL passed as prop', () => {
        expect(window.location.assign).toHaveBeenCalledWith(routes.myGousto)
      })
    })
  })
})
