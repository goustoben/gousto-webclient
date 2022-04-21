import globals from 'config/globals'
import { push, replace } from 'react-router-redux'

import * as windowUtils from 'utils/window'
import { canUseWindow } from 'utils/browserEnvironment'
import { isServer } from '../../../server/utils/serverEnvironment'
import redirectUtils, { redirect } from '../redirect'
import { actionTypes } from '../actionTypes'

jest.mock('react-router-redux')
jest.mock('utils/browserEnvironment')
jest.mock('../../../server/utils/serverEnvironment')
jest.mock('config/globals')
jest.mock('utils/window')

const mockUrl = 'mock-url'

describe('redirect actions', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  describe('redirect', () => {
    describe('when window is available', () => {
      beforeEach(() => {
        ;(canUseWindow as jest.Mock).mockReturnValue(true)
      })

      test('invokes react-router method "push"', () => {
        redirect(mockUrl)

        expect(push).toHaveBeenCalledWith(mockUrl)
      })
    })

    describe('when window is not available', () => {
      beforeEach(() => {
        ;(canUseWindow as jest.Mock).mockReturnValue(false)
        ;(isServer as jest.Mock).mockReturnValue(true)
      })

      test('does not push new route to react-router', () => {
        redirect(mockUrl)

        expect(push).not.toHaveBeenCalledWith()
      })

      test('returns the expected action if clearCookies = true', () => {
        const clearCookiesVal = true
        const action = redirect(mockUrl, clearCookiesVal)

        expect(action).toEqual({
          type: actionTypes.SERVER_REDIRECT,
          url: mockUrl,
          clearCookies: clearCookiesVal,
        })
      })

      test('returns the expected action if clearCookies = false', () => {
        const clearCookiesVal = false
        const action = redirect(mockUrl, clearCookiesVal)

        expect(action).toEqual({
          type: actionTypes.SERVER_REDIRECT,
          url: mockUrl,
          clearCookies: clearCookiesVal,
        })
      })
    })

    describe('for legacy bundle', () => {
      beforeEach(() => {
        ;(canUseWindow as jest.Mock).mockReturnValue(true)
        ;(isServer as jest.Mock).mockReturnValue(false)
        globals.legacy = () => true
      })

      test('redirects using window util', () => {
        redirect(mockUrl)

        expect(windowUtils.redirect).toHaveBeenCalledWith(mockUrl)
      })

      test('returns VOID action', () => {
        const action = redirect(mockUrl)

        expect(action).toEqual({
          type: actionTypes.VOID,
        })
      })
    })
  })

  describe('replace', () => {
    describe('when window is available', () => {
      beforeEach(() => {
        ;(canUseWindow as jest.Mock).mockReturnValue(true)
        globals.legacy = () => false
      })

      test('invokes react-router method "replace"', () => {
        redirectUtils.replace(mockUrl)

        expect(replace).toHaveBeenCalledWith(mockUrl)
      })
    })

    describe('when window is not available', () => {
      beforeEach(() => {
        ;(canUseWindow as jest.Mock).mockReturnValue(false)
        ;(isServer as jest.Mock).mockReturnValue(true)
      })

      test('does not invoke react-router method "replace"', () => {
        redirectUtils.replace(mockUrl)

        expect(replace).not.toHaveBeenCalled()
      })

      test('returns the expected action', () => {
        const action = redirectUtils.replace(mockUrl)

        expect(action).toEqual({
          type: actionTypes.SERVER_REPLACE,
          url: mockUrl,
        })
      })
    })

    describe('for legacy bundle', () => {
      beforeEach(() => {
        ;(canUseWindow as jest.Mock).mockReturnValue(true)
        ;(isServer as jest.Mock).mockReturnValue(false)
        globals.legacy = () => true
      })

      test('replaces url using windowUtils', () => {
        redirectUtils.replace(mockUrl)

        expect(windowUtils.replace).toHaveBeenCalledWith(mockUrl)
      })

      test('returns VOID action', () => {
        const action = redirectUtils.replace(mockUrl)

        expect(action).toEqual({
          type: actionTypes.VOID,
        })
      })
    })
  })
})
