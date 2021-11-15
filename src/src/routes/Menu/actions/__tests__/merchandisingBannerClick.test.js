import { safeJestMock, returnArgumentsFromMock } from '_testing/mocks'
import * as filterActions from 'actions/filters'
import { actionTypes } from 'actions/actionTypes'
import { clickMerchandisingBanner } from 'actions/trackingKeys'

import { merchandisingBannerClick } from '../merchandisingBannerClick/merchandisingBannerClick'
import * as collectionSelectors from '../../selectors/collections'

describe('given merchandisingBannerClick action is called', () => {
  const dispatch = jest.fn()
  const getState = () => ({})

  const currentCollectionId = '456'

  let getCurrentCollectionId
  let changeCollectionById

  beforeEach(() => {
    getCurrentCollectionId = safeJestMock(collectionSelectors, 'getCurrentCollectionId')
    getCurrentCollectionId.mockReturnValue(currentCollectionId)

    changeCollectionById = safeJestMock(filterActions, 'changeCollectionById')
    returnArgumentsFromMock(changeCollectionById, 'changeCollectionById')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should dispatch changeCollectionById action with target id', () => {
    const targetCollectionId = '123'

    merchandisingBannerClick(targetCollectionId)(dispatch, getState)

    expect(dispatch.mock.calls[0]).toEqual([['changeCollectionById', [targetCollectionId]]])
  })

  test('should dispatch tracking action with source id target id', () => {
    const targetCollectionId = '123'

    merchandisingBannerClick(targetCollectionId)(dispatch, getState)

    expect(dispatch.mock.calls[1]).toEqual([{
      type: actionTypes.TRACKING,
      trackingData: {
        actionType: clickMerchandisingBanner,
        collection_id: targetCollectionId,
        click_collection_id: currentCollectionId
      }
    }])
  })
})
