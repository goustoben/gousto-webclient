import Immutable from 'immutable'
import * as boxSummaryActions from 'actions/boxSummary'
import * as basketActions from 'actions/basket'
import * as menuActions from 'actions/menu'

import { safeJestMock, returnArgumentsFromMock } from '_testing/mocks'
import { menuOverlayClick } from '../menuOverlayClick'

describe('given menuOverlayClick action is called', () => {
  let state
  const dispatch = jest.fn()
  const getState = () => state

  beforeEach(() => {
    state = {
      boxSummaryShow: Immutable.fromJS({ show: false }),
    }
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('when boxSummaryShow is true', () => {
    let boxSummaryVisibilityChange
    let basketRestorePreviousValues

    beforeEach(() => {
      state.boxSummaryShow = state.boxSummaryShow.set('show', true)

      boxSummaryVisibilityChange = safeJestMock(boxSummaryActions, 'boxSummaryVisibilityChange')
      returnArgumentsFromMock(boxSummaryVisibilityChange, 'boxSummaryVisibilityChange')

      basketRestorePreviousValues = safeJestMock(basketActions, 'basketRestorePreviousValues')
      returnArgumentsFromMock(basketRestorePreviousValues, 'basketRestorePreviousValues')
    })

    test('then boxSummaryVisibilityChange should be dispatched 1st', () => {
      menuOverlayClick()(dispatch, getState)

      expect(dispatch.mock.calls[0]).toEqual([['boxSummaryVisibilityChange', [false]]])
    })

    test('then basketRestorePreviousValues should be dispatched 2nd', () => {
      menuOverlayClick()(dispatch, getState)

      expect(dispatch.mock.calls[1]).toEqual([['basketRestorePreviousValues', []]])
    })
  })

  describe('when boxSummaryShow is false', () => {
    beforeEach(() => {
      state.boxSummaryShow = state.boxSummaryShow.set('show', false)
    })

    describe('when menuBrowseCTAShow is true', () => {
      let menuBrowseCTAVisibilityChange

      beforeEach(() => {
        state.menuBrowseCTAShow = true

        menuBrowseCTAVisibilityChange = safeJestMock(menuActions, 'menuBrowseCTAVisibilityChange')
        returnArgumentsFromMock(menuBrowseCTAVisibilityChange, 'menuBrowseCTAVisibilityChange')
      })

      test('then menuBrowseCTAVisibilityChange should be dispatched 1st', () => {
        menuOverlayClick()(dispatch, getState)

        expect(dispatch.mock.calls[0]).toEqual([['menuBrowseCTAVisibilityChange', [false]]])
      })
    })

    describe('when menuBrowseCTAShow is false', () => {
      beforeEach(() => {
        state.menuBrowseCTAShow = false
      })

      test('then nothing should be dispatched', () => {
        menuOverlayClick()(dispatch, getState)

        expect(dispatch).not.toHaveBeenCalled()
      })
    })
  })
})
