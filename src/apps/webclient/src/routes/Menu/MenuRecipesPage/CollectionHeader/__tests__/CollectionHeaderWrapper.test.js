import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import Immutable from 'immutable'
import { act } from 'react-dom/test-utils'
import { CollectionHeaderWrapper } from '../CollectionHeaderWrapper'
import { getCollectionsHeaders } from '../../../selectors/collections'
import { useShouldRemoveMerchandisingBanner } from '../useShouldRemoveMerchandisingBanner'
import { useBrandHeadersInfo } from '../../../domains/brand'
import { WaveLinkHeaderContainer } from '../LinkHeaderContainer'
import { GradientInfoHeader } from '../GradientInfoHeader'

const mockStore = configureMockStore()

const store = mockStore({
  routing: Immutable.fromJS({
    locationBeforeTransitions: {
      query: {
        collection: null,
      },
    },
  }),
  auth: Immutable.fromJS({
    isAuthenticated: false,
  }),
})

const defaultProps = {
  id: 'header-id',
  type: 'wave-link-header',
  attributes: {
    link: {
      collectionSlug: null,
    },
    headerImage: [
      {
        url: '',
        width: 100,
        height: 50,
      },
    ],
    waveColor: '#fff',
  },
}

jest.mock('utils/configFromWindow', () => ({
  getClientEnvironment: () => 'local',
  getClientDomain: () => 'gousto.local',
}))

jest.mock('../useShouldRemoveMerchandisingBanner', () => ({
  useShouldRemoveMerchandisingBanner: jest.fn(),
}))

jest.mock('../../../selectors/collections', () => ({
  ...jest.requireActual('../../../selectors/collections'),
  getCollectionsHeaders: jest.fn(),
}))

jest.mock('../../../domains/brand', () => ({
  useBrandHeadersInfo: jest.fn(),
}))

describe('CollectionHeaderWrapper', () => {
  let wrapper

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('when collectionsHeaders is null', () => {
    beforeEach(async () => {
      useShouldRemoveMerchandisingBanner.mockReturnValue(false)
      useBrandHeadersInfo.mockReturnValue({})
      getCollectionsHeaders.mockReturnValue({})

      await act(async () => {
        wrapper = mount(
          <Provider store={store}>
            <CollectionHeaderWrapper store={store} />
          </Provider>,
        )
      })
    })

    test('should return null', () => {
      expect(wrapper.find('WaveLinkHeaderContainer')).toHaveLength(0)
      expect(wrapper.find('GradientInfoHeader')).toHaveLength(0)
    })
  })

  describe('when collectionsHeaders is not defined type', () => {
    beforeEach(async () => {
      const props = {
        ...defaultProps,
        ...{
          type: 'unknown',
        },
      }

      useShouldRemoveMerchandisingBanner.mockReturnValue(false)
      useBrandHeadersInfo.mockReturnValue(props)
      getCollectionsHeaders.mockReturnValue(props)

      await act(async () => {
        wrapper = mount(
          <Provider store={store}>
            <CollectionHeaderWrapper store={store} />
          </Provider>,
        )
      })
    })

    test('should return null', () => {
      expect(wrapper.find(WaveLinkHeaderContainer)).toHaveLength(0)
      expect(wrapper.find(GradientInfoHeader)).toHaveLength(0)
    })
  })

  describe('when collectionsHeaders is gradient-info-header', () => {
    beforeEach(() => {
      const props = {
        ...defaultProps,
        ...{
          type: 'gradient-info-header',
        },
      }

      useShouldRemoveMerchandisingBanner.mockReturnValue(false)
      useBrandHeadersInfo.mockReturnValue(props)
      getCollectionsHeaders.mockReturnValue(props)

      wrapper = mount(
        <Provider store={store}>
          <CollectionHeaderWrapper store={store} />
        </Provider>,
      )
    })

    test('should return GradientInfoHeader', () => {
      expect(wrapper.find(GradientInfoHeader)).toHaveLength(1)
      expect(wrapper.find(WaveLinkHeaderContainer)).toHaveLength(0)
    })
  })

  describe('when collectionsHeaders is wave-link-header', () => {
    beforeEach(() => {
      useShouldRemoveMerchandisingBanner.mockReturnValue(false)
      useBrandHeadersInfo.mockReturnValue(defaultProps)
      getCollectionsHeaders.mockReturnValue(defaultProps)

      wrapper = mount(
        <Provider store={store}>
          <CollectionHeaderWrapper store={store} />
        </Provider>,
      )
    })

    test('should return WaveLinkHeaderContainer', () => {
      expect(wrapper.find(WaveLinkHeaderContainer)).toHaveLength(1)
      expect(wrapper.find(GradientInfoHeader)).toHaveLength(0)
    })
  })

  describe('when collectionsHeaders is hidden by an experiment for the prospects for all the categories', () => {
    beforeEach(() => {
      useShouldRemoveMerchandisingBanner.mockReturnValue(true)
      getCollectionsHeaders.mockReturnValue(defaultProps)
      useBrandHeadersInfo.mockReturnValue(defaultProps)

      wrapper = mount(
        <Provider store={store}>
          <CollectionHeaderWrapper store={store} />
        </Provider>,
      )
    })

    test('should be hidden', async () => {
      expect(wrapper.find(WaveLinkHeaderContainer)).toHaveLength(0)
      expect(wrapper.find(GradientInfoHeader)).toHaveLength(0)
    })
  })
})
