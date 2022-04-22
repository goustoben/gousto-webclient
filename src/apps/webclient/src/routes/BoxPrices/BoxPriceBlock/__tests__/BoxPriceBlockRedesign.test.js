import React from 'react'
import { mount } from 'enzyme'
import * as Redux from 'react-redux'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import { BoxPriceBlock } from '../BoxPriceBlockRedesign'

jest.mock('containers/OptimizelyRollouts', () => ({
  isOptimizelyFeatureEnabledFactory: jest.fn().mockImplementation(() => async () => false),
  useIsOptimizelyFeatureEnabled: jest.fn().mockReturnValue(false),
  OptimizelyFeature: () => null,
}))

describe('Given BoxPriceBlockRedesign', () => {
  let wrapper
  const boxPricesBoxSizeSelected = jest.fn()
  const boxPriceMock = [
    {
      num_portions: 2,
      price_per_portion: '6.25',
      total: '24.99',
    },
    {
      num_portions: 3,
      price_per_portion: '5.00',
      total: '29.99',
    },
    {
      num_portions: 4,
      price_per_portion: '5.00',
      total: '29.99',
    },
  ]
  const trackUTMAndPromoCode = jest.fn()

  beforeEach(() => {
    const mockStore = configureMockStore()
    const mockedStore = mockStore({
      features: {},
    })
    const dispatch = jest.fn()
    jest.spyOn(Redux, 'useDispatch').mockImplementation(() => dispatch)
    jest.spyOn(Redux, 'useSelector').mockImplementation(() => false)
    wrapper = mount(
      <Provider store={mockedStore}>
        <BoxPriceBlock
          boxInfo={boxPriceMock}
          numPersons={2}
          selectedBox={2}
          boxPricesBoxSizeSelected={boxPricesBoxSizeSelected}
          trackUTMAndPromoCode={trackUTMAndPromoCode}
        />
      </Provider>,
    )
  })

  afterEach(() => {
    trackUTMAndPromoCode.mockClear()
    boxPricesBoxSizeSelected.mockClear()
  })

  test('should be rendered correctly', () => {
    expect(wrapper.find('.containerRedesignActive').exists()).toBeTruthy()
    expect(wrapper.find('.carouselItem').exists()).toBeTruthy()
    expect(wrapper.find('.itemHeading').exists()).toBeTruthy()
    expect(wrapper.find('.select').exists()).toBeTruthy()
    expect(wrapper.find('.buttonGroup').exists()).toBeTruthy()
    expect(wrapper.find('.boxSizeButtonActive').exists()).toBeTruthy()
    expect(wrapper.find('.boxSizeButton').exists()).toBeTruthy()
    expect(wrapper.find('.selectItem')).toHaveLength(2)
    expect(wrapper.find('.amount')).toHaveLength(2)
    expect(wrapper.find('h2').exists()).toBeTruthy()
    expect(wrapper.find('CTA').exists()).toBeTruthy()
  })

  test('boxPricesBoxSizeSelected should be called', () => {
    wrapper.find('CTA').simulate('click')
    expect(boxPricesBoxSizeSelected).toHaveBeenCalled()
  })

  test('should track trackUTMAndPromoCode if box size is clicked', () => {
    wrapper.find('.boxSizeButtonActive').simulate('click')
    expect(trackUTMAndPromoCode).toHaveBeenCalled()
  })
})
