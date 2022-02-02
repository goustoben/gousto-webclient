import * as React from 'react'
import useSWR from 'swr'
import { Provider } from 'react-redux'
import { renderHook } from '@testing-library/react-hooks'
import { createMockStore } from 'routes/Menu/_testing/createMockStore'
import { useBrandHeadersInfo } from './useBrandHeadersInfo'

jest.mock('swr', () => jest.fn())

const mockedUseSWR = useSWR as jest.MockedFunction<any>

const collectionsPerMenu = [
  {
    type: 'menu',
    id: '457',
    relationships: {
      collections: {
        data: [
          {
            type: 'collection',
            id: 'ea2a2dbc-830e-11eb-97aa-02580d10aa81',
            header: '4f3a8414-6667-4b30-8a4c-1dbfe23eb55f',
          },
        ],
      },
    },
  },
  {
    type: 'menu',
    id: '458',
    relationships: {
      collections: {
        data: [
          {
            type: 'collection',
            id: '97270056-cd65-11e8-a2d2-067a72dd5dba',
            header: 'fc168185-95de-4dce-ac8f-87610ee69118',
          },
          {
            type: 'collection',
            id: 'ca8f71be-63ac-11e6-a693-068306404bab',
            header: 'fc168185-95de-4dce-ac8f-87610ee69118',
          },
          {
            type: 'collection',
            id: '6067fb3e-afbe-11e8-8ee6-0645394f11ea',
            header: '51764e1e-41cd-4638-be4d-9b426b5144a2',
          },
          {
            type: 'collection',
            id: 'ea2a2dbc-830e-11eb-97aa-02580d10aa81',
            header: '4f3a8414-6667-4b30-8a4c-1dbfe23eb55f',
          },
        ],
      },
    },
  },
]

const headers = [
  {
    id: '4f3a8414-6667-4b30-8a4c-1dbfe23eb55f',
    type: 'gradient-info-header',
    attributes: {
      headerImage: [
        {
          width: 175,
          height: 14,
          url: 'https://production-media.gousto.co.uk/merchandising/header/ultra_health_header.png',
          altText: 'calorie controlled',
        },
      ],
      description: 'Veg-packed meals with less than 600 calories (see Help Section for details).',
      color: '#333D47',
      gradientColor: '#FFFFFF',
      image: [
        {
          width: 750,
          height: 431,
          url: 'https://production-media.gousto.co.uk/merchandising/header/ultra_health_header_image_small.png',
          altText: 'calorie controlled',
        },
        {
          width: 1000,
          height: 575,
          url: 'https://production-media.gousto.co.uk/merchandising/header/ultra_health_header_image_medium.png',
          altText: 'calorie controlled',
        },
        {
          width: 1500,
          height: 862,
          url: 'https://production-media.gousto.co.uk/merchandising/header/ultra_health_header_image_large.png',
          altText: 'calorie controlled',
        },
      ],
      imageLocation: 'right',
    },
  },
  {
    id: 'fc168185-95de-4dce-ac8f-87610ee69118',
    type: 'wave-link-header',
    attributes: {
      link: {
        collectionSlug: 'joe-wicks-picks',
        collectionId: '6067fb3e-afbe-11e8-8ee6-0645394f11ea',
      },
      headerImage: [
        {
          width: 290,
          height: 23,
          url: 'https://production-media.gousto.co.uk/merchandising/header/1428_January_MenuBanner-allrecipes.png',
          altText: 'healthy choices',
        },
      ],
      description: 'Discover Joe’s top healthy, veg-packed dinners from this week’s menu',
      color: '#FFFFFF',
      backgroundColor: '#05594c',
      waveColor: '#05594c',
    },
  },
]

describe('useBrandHeadersInfo', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('when server response with valid data', () => {
    mockedUseSWR.mockReturnValue({
      data: {
        status: 'ok',
        meta: {},
        data: collectionsPerMenu,
        included: headers,
      },
    })

    const store = createMockStore({
      auth: {
        id: 'user one',
        accessToken: 'access token',
      },
    })

    const wrapper: React.FC = ({ children }) => <Provider store={store}>{children}</Provider>

    it('should should return data in necessary shape', async () => {
      const {
        result: { current },
      } = renderHook(() => useBrandHeadersInfo(), { wrapper })

      expect(current).toEqual({
        collectionsPerMenu,
        headers,
      })
    })
  })
})
