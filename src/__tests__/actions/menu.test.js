import Immutable from 'immutable'

import { fetchCollections } from 'apis/collections'

import {
  menuLoadCollections,
} from 'actions/menu'

jest.mock('apis/collections', () => ({
  fetchCollections: jest.fn(),
}))

describe('menu actions', () => {
  const dispatch = jest.fn()
  const getState = jest.fn()

  afterEach(() => {
    dispatch.mockClear()
    getState.mockClear()
  })

  describe('menuLoadCollections', () => {
    describe('when authenticated', () => {
      beforeEach(() => {
        getState.mockReturnValue({
          auth: Immutable.Map({
            accessToken: 'an-access-token',
            isAuthenticated: true 
          }),
        })
      })

      test('should dispatch a fetchCollections request containing jfy experiment', () => {
        menuLoadCollections()(dispatch, getState)

        expect(fetchCollections).toHaveBeenCalledWith(
          'an-access-token',
          '',
          expect.objectContaining({
            experiments: {
              'justforyou_v2': true,
            },
          })
        )
      })
    })
    
    describe('when not authenticated', () => {
      beforeEach(() => {
        getState.mockReturnValue({
          auth: Immutable.Map({
            accessToken: 'an-access-token',
            isAuthenticated: false 
          }),
        })
      })

      test('should dispatch a fetchCollections request without experiments preset', () => {
        menuLoadCollections('a-date')(dispatch, getState)

        expect(fetchCollections).toHaveBeenCalledWith(
          'an-access-token',
          '',
          {
            filters: {
              available_on: 'a-date',
            },
          }
        )
      })
    })
  })
})

