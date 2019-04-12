import Immutable from 'immutable' /* eslint-disable new-cap */

import actionTypes from 'actions/actionTypes'
import { fetchContentBySlug } from 'apis/content'
import { contentLoadContentByPageSlug, loadContentVariants } from 'actions/content'

jest.mock('apis/content', () => ({
  fetchContentBySlug: jest.fn(),
}))

describe('content actions', () => {
  const dispatch = jest.fn()

  describe('contentLoadContentByPageSlug', () => {
    const getState = jest.fn().mockReturnValue({
      auth: Immutable.fromJS({ accessToken: 'accessToken' }),
      content: {},
    })

    beforeEach(() => {
      fetchContentBySlug.mockReturnValueOnce(
        Promise.resolve({
          data: [
            'welcome',
            ['sections', ['components', ['fields', ['attributes']]]],
          ],
        }),
      )
      dispatch.mockClear()
      getState.mockClear()
      fetchContentBySlug.mockClear()
    })

    test('should fetch content for the specified page and variation', async () => {
      await contentLoadContentByPageSlug(
        'welcome',
        'variation-a',
      )(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({
        key: actionTypes.CONTENT_RECEIVE,
        type: 'PENDING',
        value: true,
      })
      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.CONTENT_RECEIVE,
        content: [
          'welcome',
          ['sections', ['components', ['fields', ['attributes']]]],
        ],
      })
      expect(dispatch).toHaveBeenCalledWith({
        key: actionTypes.CONTENT_RECEIVE,
        type: 'PENDING',
        value: false,
      })

      expect(fetchContentBySlug).toHaveBeenCalledWith(
        'accessToken',
        'welcome',
        { vars: 'variation-a' }
      )
    })

    test('should fetch content for the specified page with the default variation', async () => {
      await contentLoadContentByPageSlug('welcome_default')(
        dispatch,
        getState,
      )

      expect(dispatch).toHaveBeenCalledWith({
        key: actionTypes.CONTENT_RECEIVE,
        type: 'PENDING',
        value: true,
      })

      expect(fetchContentBySlug).toHaveBeenCalledWith(
        'accessToken',
        'welcome_default',
        { vars: 'default' }
      )
    })
  })

  describe('loadContentVariants', () => {
    beforeEach(() => {
      dispatch.mockClear()
    })

    test('should dispatch given variants as a CONTENT_VARIANTS_RECIEVE action', () => {
      const variants = {
        homepage: 'default',
        'my-gousto': 'osr-b',
      }

      loadContentVariants(variants)(dispatch)

      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.CONTENT_VARIANTS_RECEIVE,
        variants,
      })
    })
  })
})
