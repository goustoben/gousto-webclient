import { shallow } from 'enzyme'
import React from 'react'
import Immutable from 'immutable'
import { PromoCode } from 'routes/Checkout/Components/PromoCode/PromoCode'

describe('PromoCode', () => {
  const promoCode = ''
  let basketPromoCodeChange
  let basketPromoCodeAppliedChange
  let trackPromocodeChange
  let loadPrices
  let wrapper
  const previewOrderId = '123'

  beforeEach(() => {
    basketPromoCodeChange = jest.fn()
    basketPromoCodeAppliedChange = jest.fn()
    trackPromocodeChange = jest.fn()
    loadPrices = jest.fn().mockReturnValue(
      new Promise((resolve) => {
        resolve()
      })
    )
    wrapper = shallow(
      <PromoCode
        promoCode={promoCode}
        previewOrderId={previewOrderId}
        basketPromoCodeChange={basketPromoCodeChange}
        basketPromoCodeAppliedChange={basketPromoCodeAppliedChange}
        loadPrices={loadPrices}
        trackPromocodeChange={trackPromocodeChange}
      />
    )
    wrapper.setState({
      pending: false,
      errorMsg: '',
      successMsg: '',
    })
  })

  afterEach(() => {
    loadPrices.mockClear()
  })

  describe('rendering', () => {
    it('should return a div', () => {
      expect(wrapper.type()).toEqual('div')
    })

    it('should have one input', () => {
      expect(wrapper.find('input').length).toEqual(1)
    })

    it('should render a <div> with no props', () => {
      wrapper = shallow(<PromoCode />)
      expect(wrapper.type()).toEqual('div')
    })
  })

  describe('with promocode prop', () => {
    beforeEach(() => {
      wrapper = shallow(
        <PromoCode
          promoCode="10perm"
          promoCodeApplied
          previewOrderId={previewOrderId}
          basketPromoCodeChange={basketPromoCodeChange}
          basketPromoCodeAppliedChange={basketPromoCodeAppliedChange}
          loadPrices={loadPrices}
          trackPromocodeChange={trackPromocodeChange}
        />
      )
    })

    it('on update, should call loadPrices and revalidate the promocode', async () => {
      jest.clearAllMocks()
      wrapper.setProps({ promoCode: 'Promocode' })

      expect(basketPromoCodeAppliedChange).toHaveBeenCalledTimes(1)
      await expect(loadPrices).toHaveBeenCalledTimes(1)
    })

    it('should handle promo code change, update promoCode in the store', () => {
      const collection = wrapper.find({ name: 'promoCode' })
      expect(collection.length).toBe(1)
      collection.forEach((node) => {
        node.simulate('input', { target: { value: 'promo' } })
        node.simulate('keyup', { keyCode: 13 })
        expect(basketPromoCodeChange).toHaveBeenCalledTimes(2)
        expect(basketPromoCodeAppliedChange).toHaveBeenCalled()
      })
    })

    describe('handleInput', () => {
      let value
      beforeEach(() => {
        value = 'test'
      })

      it("shouldn't run if no event target is passed", () => {
        wrapper.find('input').simulate('input')

        expect(basketPromoCodeChange).not.toHaveBeenCalled()
      })

      it('should pass value to basketPromoCodeChange', () => {
        wrapper.find('input').simulate('input', { target: { value } })

        expect(basketPromoCodeChange).toHaveBeenCalledWith(value)
      })
    })

    describe('handleKeyUp', () => {
      let value
      beforeEach(() => {
        value = 'test'
      })

      it('should call loadPrices and trackPromocodeChange when press enter', async () => {
        wrapper.find('input').simulate('input', { target: { value } })
        wrapper.find('input').simulate('keyup', { keyCode: 13 })

        await expect(loadPrices).toHaveBeenCalled()
        expect(trackPromocodeChange).toHaveBeenCalled()
      })

      it('should call loadPrices and trackPromocodeChange when press space', async () => {
        wrapper.find('input').simulate('input', { target: { value } })
        wrapper.find('input').simulate('keyup', { keyCode: 32 })

        await expect(loadPrices).toHaveBeenCalled()
        expect(trackPromocodeChange).toHaveBeenCalled()
      })

      it('should NOT apply new promocode if shift pressed', () => {
        wrapper.find('input').simulate('input', { target: { value } })
        wrapper.find('input').simulate('keyUp', { keyCode: 16 })
        expect(loadPrices).not.toHaveBeenCalled()
        expect(trackPromocodeChange).not.toHaveBeenCalled()
      })
    })

    describe('when promoCodeValid is true', () => {
      beforeEach(() => {
        wrapper.setProps({
          prices: Immutable.fromJS({
            promoCodeValid: true,
          }),
        })
        wrapper.instance().promoCodeValidation()
      })

      test('then component state should be updated properly', () => {
        expect(wrapper.state().errorMsg).toBe('')
        expect(wrapper.state().successMsg).toBe('Promocode added')
      })
    })

    describe('when promoCodeValid is false', () => {
      beforeEach(() => {
        wrapper.setProps({
          prices: Immutable.fromJS({
            promoCodeValid: false,
          }),
        })
        wrapper.instance().promoCodeValidation()
      })

      test('then component state should be updated properly', () => {
        expect(wrapper.state().errorMsg).toBe('This promocode is not valid')
      })
    })
  })
})
