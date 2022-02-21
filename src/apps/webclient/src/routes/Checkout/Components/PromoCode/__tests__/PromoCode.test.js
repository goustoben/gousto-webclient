import { mount } from 'enzyme'
import React from 'react'
import { PromoCode } from 'routes/Checkout/Components/PromoCode/PromoCode'

jest.useFakeTimers()

describe('PromoCode', () => {
  const emptyPromoCode = ''
  const validPromoCode = 'JOEWICKSGOUSTO'
  const newPromoCode = 'NEW-PROMO-CODE'

  const basketPromoCodeChange = jest.fn()
  const basketPromoCodeAppliedChange = jest.fn()
  const trackPromocodeChange = jest.fn()
  const sendRequestToUpdateOrderSummaryPrices = jest.fn(() => Promise.resolve())
  let wrapper

  beforeEach(() => {
    wrapper = mount(
      <PromoCode
        promoCode={emptyPromoCode}
        promoCodeApplied={false}
        basketPromoCodeChange={basketPromoCodeChange}
        basketPromoCodeAppliedChange={basketPromoCodeAppliedChange}
        trackPromocodeChange={trackPromocodeChange}
        promoCodeValid={false}
        sendRequestToUpdateOrderSummaryPrices={sendRequestToUpdateOrderSummaryPrices}
      />
    )
    jest.clearAllMocks()
  })

  describe('when promo code is non-empty and valid', () => {
    beforeEach(() => {
      wrapper = mount(
        <PromoCode
          promoCode={validPromoCode}
          promoCodeApplied
          basketPromoCodeChange={basketPromoCodeChange}
          basketPromoCodeAppliedChange={basketPromoCodeAppliedChange}
          trackPromocodeChange={trackPromocodeChange}
          promoCodeValid
          sendRequestToUpdateOrderSummaryPrices={sendRequestToUpdateOrderSummaryPrices}
        />
      )
    })

    test('should display the success icon', () => {
      expect(wrapper.find('Field').text().includes('Success icon')).toBe(true)
    })

    describe('when edited', () => {
      beforeEach(() => {
        wrapper.find('input').simulate('change', { target: { value: newPromoCode } })
        jest.runAllTimers()
      })
      test('then it should schedule the update and verification', () => {
        expect(basketPromoCodeAppliedChange).toHaveBeenCalledWith(true)
        expect(basketPromoCodeChange).toHaveBeenCalledWith(newPromoCode)
        expect(sendRequestToUpdateOrderSummaryPrices).toHaveBeenCalledWith()
        expect(trackPromocodeChange).toHaveBeenCalledWith(newPromoCode, true)
      })
    })

    describe('when verification request fails', () => {
      beforeEach(() => {
        sendRequestToUpdateOrderSummaryPrices.mockImplementation(() => Promise.reject())
        wrapper.find('input').simulate('change', { target: { value: newPromoCode } })
        jest.runAllTimers()
      })
      afterEach(() => {
        sendRequestToUpdateOrderSummaryPrices.mockImplementation(() => Promise.resolve())
      })
      test('then it should display error', () => {
        expect(wrapper.find('Field').text().includes('Error icon')).toBe(true)
        expect(wrapper.find('Field').text().includes('This discount code is not valid')).toBe(true)
      })
    })

    describe('when edited to an empty value (i.e. removed)', () => {
      beforeEach(() => {
        wrapper.find('input').simulate('change', { target: { value: emptyPromoCode } })
        jest.runAllTimers()
      })
      test('then it should track removal', () => {
        expect(trackPromocodeChange).toHaveBeenCalledWith(validPromoCode, false)
      })
    })
  })

  describe('when the promo code is non-empty and invalid', () => {
    beforeEach(() => {
      wrapper = mount(
        <PromoCode
          promoCode="ZZZ"
          promoCodeApplied
          basketPromoCodeChange={basketPromoCodeChange}
          basketPromoCodeAppliedChange={basketPromoCodeAppliedChange}
          trackPromocodeChange={trackPromocodeChange}
          promoCodeValid={false}
          sendRequestToUpdateOrderSummaryPrices={sendRequestToUpdateOrderSummaryPrices}
        />
      )
    })

    test('should display the error icon and message', () => {
      expect(wrapper.find('Field').text().includes('Error icon')).toBe(true)
      expect(wrapper.find('Field').text().includes('This discount code is not valid')).toBe(true)
    })
  })
})
