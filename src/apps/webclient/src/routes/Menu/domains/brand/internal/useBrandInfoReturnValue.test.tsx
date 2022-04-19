import * as React from 'react'
import useSWR from 'swr'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import Immutable from 'immutable'
import { renderHook } from '@testing-library/react-hooks'
import { useBrandInfo } from './useBrandInfo'

jest.mock('utils/configFromWindow', () => ({
  getClientEnvironment: () => 'local',
}))
jest.mock('swr', () => jest.fn())

const mockedUseSWR = useSWR as jest.MockedFunction<any>

const brandData = {
  roundels: [
    {
      slug: 'gluten-free',
      name: 'Gluten Free',
      images: [
        {
          url: 'https://staging-media.gousto.info/cms/headshot-image/Gluten-Free-Icon-Bigger.png',
          type: 'headshot',
        },
      ],
    },
    {
      slug: 'febyouary',
      name: 'FebYOUary',
      images: [
        {
          url: 'https://staging-media.gousto.info/cms/headshot-image/602_Jan2020_MenuGels_FebYOUary_AW.png',
          type: 'headshot',
        },
      ],
    },
  ],
  foodBrandColours: [
    {
      slug: '10-minute-meals',
      theme: { ribbonColor: '#FB6126', borderColor: '#BB481C', textColor: '#FFFFFF' },
    },
  ],
  tags: [
    {
      type: 'general',
      slug: 'new',
      text: 'New',
      themes: [{ name: 'light', color: '#01A92B', borderColor: '#01A92B' }],
    },
  ],
  carousels: [],
}

describe('useBrandInfo', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('when server response with valid data', () => {
    mockedUseSWR.mockReturnValue({
      data: {
        status: 'ok',
        meta: {},
        data: brandData,
      },
    })

    const mockStore = configureMockStore()
    const store = mockStore({
      auth: Immutable.Map({
        id: 'user one',
        accessToken: 'access token',
      }),
    })

    const wrapper: React.FC = ({ children }) => <Provider store={store}>{children}</Provider>

    it('should should return data in necessary shape', async () => {
      const {
        result: { current },
      } = renderHook(() => useBrandInfo(), { wrapper })

      expect(current).toEqual({
        brand: brandData,
      })
    })
  })
})
