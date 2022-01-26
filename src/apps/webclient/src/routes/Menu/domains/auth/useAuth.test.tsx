import * as React from 'react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import Immutable from 'immutable'
import { renderHook } from '@testing-library/react-hooks'
import { useAuth } from './useAuth'

describe('useAuth', () => {
  describe('when there access token', () => {
    it('should return the token', () => {
      const { result: { current }} = hookRenderer({accessToken: 'some token'})
      expect(current.accessToken).toEqual('some token')
    })
  })

  describe('when there is no access token', () => {
    it('should return the undefined', () => {
      const { result: { current }} = hookRenderer()
      expect(current.accessToken).toEqual(undefined)
    })
  })

  describe('when there is authenticated user ID', () => {
    it('should return the id of authenticated user', () => {
      const { result: { current }} = hookRenderer({authUserId: 'some user ID'})
      expect(current.authUserId).toEqual('some user ID')
    })
  })

  describe('when there is no authenticated user ID', () => {
    it('should return the undefined value', () => {
      const { result: { current }} = hookRenderer()
      expect(current.authUserId).toEqual(undefined)
    })
  })
})

const hookRenderer = ({authUserId, accessToken}: {authUserId?: string, accessToken?: string} = {}) => {
  const mockStore = configureMockStore()

  const store = mockStore({
    auth: Immutable.Map({
      ...(authUserId && {id: authUserId}),
      ...(accessToken && {accessToken}),
    }),
  })

  const wrapper: React.FC = ({ children }) => <Provider store={store}>{children}</Provider>

  return renderHook(() => useAuth(), { wrapper })
}
