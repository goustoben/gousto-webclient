import React from 'react'
import { shallow } from 'enzyme'

import { AwinPixel } from 'AwinPixel'

describe('AwinPixel', () => {
  let wrapper

  test('should render nothing by default', () => {
    wrapper = shallow(<AwinPixel />)

    expect(wrapper.type()).toEqual(null)
  })

  describe('when show is true', () => {
    test('should render an image pixel', () => {
      wrapper = shallow(<AwinPixel show />)

      expect(wrapper.type()).toEqual('img')
    })
  })

  describe('with props', () => {
    let orderId, total, commissionGroup, promoCode

    beforeEach(() => {
      orderId = "9010320"
      total = '34.99'
      commissionGroup = 'EXISTING'
      promoCode = ''
    })

    test('should render an image pixel with the correct target', () => {
      wrapper = shallow(
        <AwinPixel
          show
          total={total}
          orderId={orderId}
          promoCode={promoCode}
          commissionGroup={commissionGroup}
        />
      )

      const { searchParams } = new URL(wrapper.prop('src'))

      expect(searchParams.get('ref')).toEqual(orderId)
      expect(searchParams.get('amount')).toEqual(total)
      expect(searchParams.get('vc')).toEqual(null)
      expect(searchParams.get('parts')).toEqual(`${commissionGroup}:${total}`)
    })

    describe('including promoCode', () => {
      beforeEach(() => {
        promoCode = 'TEST-9999'
      })

      test('should render an image pixel with the correct target including a vc query parameter', () => {
        wrapper = shallow(
          <AwinPixel
            show
            total={total}
            orderId={orderId}
            promoCode={promoCode}
            commissionGroup={commissionGroup}
          />
        )

        const { searchParams } = new URL(wrapper.prop('src'))

        expect(searchParams.get('ref')).toEqual(orderId)
        expect(searchParams.get('amount')).toEqual(total)
        expect(searchParams.get('vc')).toEqual('TEST-9999')
        expect(searchParams.get('parts')).toEqual(`${commissionGroup}:${total}`)
      })
    })
  })
})
