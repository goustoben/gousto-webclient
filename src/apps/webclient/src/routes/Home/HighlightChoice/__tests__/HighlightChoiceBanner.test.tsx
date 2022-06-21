import React from 'react'

import { render, screen, fireEvent } from '@testing-library/react'
import * as Redux from 'react-redux'
import configureMockStore from 'redux-mock-store'

import { actionTypes } from 'actions/actionTypes'

import { HighlightChoiceBanner } from '../HighlightChoiceBanner'

const mockStore = configureMockStore()
const mockedStore = mockStore({})
const dispatchMock = jest.fn()

jest.spyOn(Redux, 'useDispatch').mockImplementation(() => dispatchMock)

jest.mock('containers/OptimizelyRollouts', () => ({
  useIsOptimizelyFeatureEnabled: jest
    .fn()
    .mockImplementationOnce(() => true)
    .mockImplementationOnce(() => false)
    .mockImplementationOnce(() => true),
}))

describe('Given: <HighlightChoiceBanner /> from <HightlightChoice />', () => {
  beforeEach(() => {
    render(
      <Redux.Provider store={mockedStore}>
        <HighlightChoiceBanner />
      </Redux.Provider>,
    )
  })

  describe('When: experiment is on', () => {
    test('Component should be rendered', () => {
      expect(screen.getByTestId('HighlightChoiceBannerContainer')).toBeDefined()
      expect(screen.getByTestId('meals_per_box')).toBeDefined()
      expect(screen.getByText('28+ veggie and 10+ vegan recipes')).toBeDefined()
    })
  })

  describe('When: experiment is off', () => {
    test('Component should not be rendered', () => {
      expect(document.querySelector('[data-testid="HighlightChoiceBannerContainer"]')).toBeNull()
    })
  })

  describe('When: experiment is on and banner being clicked', () => {
    test('dispatch should be called with exact args', () => {
      fireEvent(
        screen.getByTestId('HighlightChoiceBannerContainer'),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      )

      const dispatchCallArgs = {
        type: actionTypes.TRACKING,
        trackingData: {
          actionType: 'click_subheading_banner',
        },
      }

      expect(dispatchMock).toHaveBeenCalledWith(dispatchCallArgs)
    })
  })
})
