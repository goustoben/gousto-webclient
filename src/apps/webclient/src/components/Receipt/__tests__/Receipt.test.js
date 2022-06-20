import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'

import { Receipt } from '../Receipt'
import { ReceiptLine } from '../ReceiptLine'
import { DeliveryDetails } from '../DeliveryDetails'

describe('Receipt', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(
      <Receipt
        numRecipes={3}
        recipeTotalPrice="29.99"
        recipeDiscountAmount="15.00"
        recipeDiscountPercent="50"
        extrasTotalPrice="2.00"
        shippingAddress={Immutable.fromJS({
          line1: '1 Example Street',
          line2: 'Zone 2',
          line3: 'Neverland',
          town: 'London',
          postcode: 'F4 K3',
        })}
        surcharges={[1]}
        surchargeTotal="4.99"
        prices={Immutable.fromJS({
          extrasTotalPrice: '2.00',
        })}
      >
        <div>Child</div>
      </Receipt>,
    )
  })

  test('show correct number of recipes', () => {
    const receiptLine = wrapper.find(ReceiptLine).first()
    expect(receiptLine.prop('label')).toBe('Recipes (3)')
    expect(receiptLine.prop('children')).toEqual('£29.99')
  })

  test('show recipe discount if any', () => {
    const receiptLine = wrapper.find(ReceiptLine).at(1)
    expect(receiptLine.prop('label')).toBe('50% discount')
    expect(receiptLine.prop('children')).toEqual('-£15.00')
  })

  test('should show recipe surcharges if any', () => {
    const receiptLine = wrapper.find(ReceiptLine).at(2)
    expect(receiptLine.prop('label')).toBe('Recipe surcharge (1)')
    expect(receiptLine.prop('children')).toEqual('£4.99')
  })

  test('should show "Sides and market items" price if extrasPrice is passed in', () => {
    const receiptLine = wrapper.find(ReceiptLine).at(3)
    expect(receiptLine.prop('label')).toBe('Sides and market items')
    expect(receiptLine.prop('children')).toEqual('£2.00')
  })

  test('should total price of the order', () => {
    const receiptLine = wrapper.find(ReceiptLine).at(5)
    expect(receiptLine.prop('label')).toBe('Total')
  })

  test('should display children', () => {
    expect(wrapper.contains(<div>Child</div>)).toBeTruthy()
  })

  describe('delivery and order number', () => {
    beforeEach(() => {
      wrapper.setProps({
        deliveryDate: '2016-05-06',
        deliverySlot: Immutable.fromJS({
          deliveryStart: '09:00:00',
          deliveryEnd: '16:59:59',
        }),
        orderNumber: '6283494',
      })
    })

    test('show delivery label', () => {
      const receiptLine = wrapper.find(ReceiptLine).at(6)
      expect(receiptLine.prop('label')).toBe('Delivery')
    })

    test('should contain a DeliveryDetails with address', () => {
      const deliveryDetails = wrapper.find(DeliveryDetails).first()
      expect(deliveryDetails.prop('address').toJS()).toEqual({
        line1: '1 Example Street',
        line2: 'Zone 2',
        line3: 'Neverland',
        town: 'London',
        postcode: 'F4 K3',
      })
    })

    test('should contain a DeliveryDetails with date', () => {
      const deliveryDetails = wrapper.find(DeliveryDetails).first()
      expect(deliveryDetails.prop('date')).toEqual('2016-05-06')
    })

    test('should contain a DeliveryDetails with slot', () => {
      const deliveryDetails = wrapper.find(DeliveryDetails).first()
      expect(deliveryDetails.prop('slot').toJS()).toEqual({
        deliveryStart: '09:00:00',
        deliveryEnd: '16:59:59',
      })
    })

    test('should show order number', () => {
      const receiptLine = wrapper.find(ReceiptLine).at(7)
      expect(receiptLine.prop('label')).toBe('Order number')
      expect(receiptLine.prop('children')).toEqual('6283494')
    })
  })

  describe('surcharges', () => {
    describe('when surcharges total is 0.00', () => {
      beforeEach(() => {
        wrapper.setProps({ surchargeTotal: '0.00' })
      })

      describe('and surcharges array is empty', () => {
        beforeEach(() => {
          wrapper.setProps({
            surcharges: [],
          })
        })

        test('should NOT show surcharges', () => {
          expect(
            wrapper.findWhere(
              element =>
                element.type() === ReceiptLine
                && element.prop('label').includes('Recipe surcharge'),
            ).length,
          ).toBe(0)
        })
      })

      describe('and surcharges array is not empty', () => {
        beforeEach(() => {
          wrapper.setProps({
            surcharges: [1, 2, 3],
          })
        })

        test('should show surcharges', () => {
          expect(
            wrapper.findWhere(
              element =>
                element.type() === ReceiptLine
                && element.prop('label').includes('Recipe surcharge'),
            ).length,
          ).toBe(0)
        })
      })
    })

    describe('when surcharges total is greater than zero', () => {
      beforeEach(() => {
        wrapper.setProps({
          surchargeTotal: '0.45',
        })
      })

      describe('and surcharges array is empty', () => {
        beforeEach(() => {
          wrapper.setProps({
            surcharges: [],
          })
        })

        test('should NOT show surcharges', () => {
          expect(
            wrapper.findWhere(
              element =>
                element.type() === ReceiptLine
                && element.prop('label').includes('Recipe surcharge'),
            ).length,
          ).toBe(0)
        })
      })

      describe('and surcharges array is not empty', () => {
        beforeEach(() => {
          wrapper.setProps({
            surcharges: [1, 2, 3],
          })
        })

        test('should show surcharges', () => {
          const results = wrapper.findWhere(
            element =>
              element.type() === ReceiptLine
              && element.prop('label').includes('Recipe surcharge'),
          )

          expect(results.length).toBe(1)
          expect(results.first().prop('label')).toContain('(3)')
          expect(
            results
              .first()
              .children()
              .text(),
          ).toContain('£0.45')
        })
      })
    })
  })
})
