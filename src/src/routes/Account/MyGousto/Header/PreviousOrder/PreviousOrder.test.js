import React from 'react'
import Immutable from 'immutable'
import { mount } from 'enzyme'
import { PreviousOrder } from './PreviousOrder'

describe('the PreviousOrder component', () => {
  let wrapper
  const trackClickGetHelpWithThisBox = jest.fn()
  const order = Immutable.fromJS({
    humanDeliveryDate: 'Tuesday 12 June',
    id: '100',
    phase: 'delivered',
    prices: {
      total: '23.00'
    },
    recipeItems: [{
      title: 'Lentil Enchiladas With Roasted Pepper & Cashew Crema',
      media: [
        {
          type: 'mood-image',
          urls: [ { src: '50px-url-lentils-enchiladas' }, { src: '200px-url-lentils-enchiladas' }, { src: '400px-url-lentils-enchiladas' }],
        },
        {
          type: 'range-main-image',
        }
      ]
    }]
  })

  beforeEach(() => {
    wrapper = mount(
      <PreviousOrder
        hasDeliveryToday={false}
        hasTooltip
        order={order}
        trackClickGetHelpWithThisBox={trackClickGetHelpWithThisBox}
      />
    )
  })

  test('renders without crashing', () => {})

  test('renders correct Heading', () => {
    expect(wrapper.find('Heading').contains('Last delivery')).toBe(true)
  })

  test('renders OrderDetails with correct props', () => {
    expect(wrapper.find('OrderDetails').prop('deliveryDate')).toBe('Tuesday 12 June')
    expect(wrapper.find('OrderDetails').prop('orderState')).toBe('delivered')
    expect(wrapper.find('OrderDetails').prop('price')).toBe('23.00')
    expect(wrapper.find('OrderDetails').prop('recipeImages')).toEqual(
      [{ alt: 'Lentil Enchiladas With Roasted Pepper & Cashew Crema', src: '200px-url-lentils-enchiladas'}]
    )
  })

  test('redirects to the correct url', () => {
    expect(wrapper.find('GoustoLink').prop('to')).toBe('/get-help?orderId=100')
  })

  describe('When hasTooltip is true', () => {
    beforeEach(() => {
      wrapper.setProps({ hasTooltip: true })
    })

    test('renders InfoTip', () => {
      expect(wrapper.find('Card').find('InfoTip').exists()).toBe(true)
    })
  })

  describe('When hasTooltip is false', () => {
    beforeEach(() => {
      wrapper.setProps({ hasTooltip: false })
    })

    test('does not render InfoTip', () => {
      expect(wrapper.find('Card').find('InfoTip').exists()).toBe(false)
    })
  })

  describe('When the CTA is clicked', () => {
    beforeEach(() => {
      wrapper.find('CTA').prop('onClick')()
    })

    afterEach(() => {
      jest.clearAllMocks()
    })

    test('calls trackClick with orderId', () => {
      expect(trackClickGetHelpWithThisBox).toHaveBeenCalledWith(order.get('id'))
    })
  })
})
