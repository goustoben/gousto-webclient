import { shallow, render } from 'enzyme'
import React from 'react'

import sinon from 'sinon'

import Immutable from 'immutable' /* eslint-disable new-cap */
import Receipt from 'Receipt/Receipt'
import PromoCode from 'routes/Checkout/Components/PromoCode'
import ReceiptLine from 'Receipt/ReceiptLine'
import DeliveryDetails from 'Receipt/DeliveryDetails'

describe('Receipt', () => {
	let wrapper

	beforeEach(() => {
		wrapper = shallow(
			<Receipt
				numPortions={2}
				numRecipes={3}
				deliveryTotalPrice={'1.99'}
				dashPricing={false}
				recipeTotalPrice={'29.99'}
				recipeDiscountAmount={'15.00'}
				recipeDiscountPercent={'50'}
				totalToPay={'14.99'}
				extrasTotalPrice={'2.00'}
				surcharges={Immutable.fromJS([1])}
				surchargeTotal={'4.99'}
				prices={Immutable.fromJS({
					extrasTotalPrice: '2.00',
				})}
			>
				<div>Child</div>
			</Receipt>,
		)
	})

	test('show correct number of recipes', () => {
		const recipeLine = wrapper.find(ReceiptLine).at(0)
		expect(recipeLine.prop('label')).toBe('Recipes (3)')
		expect(recipeLine.prop('children')).toEqual('£29.99')
	})

	test('show recipe discount if any', () => {
		const recipeLine = wrapper.find(ReceiptLine).at(1)
		expect(recipeLine.prop('label')).toBe('50% discount')
		expect(recipeLine.prop('children')).toEqual('-£15.00')
	})

	test('should show recipe surcharges if any', () => {
		const recipeLine = wrapper.find(ReceiptLine).at(2)
		expect(recipeLine.prop('label')).toBe('Recipe surcharge (1)')
		expect(recipeLine.prop('children')).toEqual('£4.99')
	})

	test('should show extras price if extrasPrice is passed in', () => {
		const recipeLine = wrapper.find(ReceiptLine).at(3)
		expect(recipeLine.prop('label')).toBe('Extras')
		expect(recipeLine.prop('children')).toEqual('£2.00')
	})

	test('should total price of the order', () => {
		const recipeLine = wrapper.find(ReceiptLine).at(5)
		expect(recipeLine.prop('label')).toBe('Total')

	})

	test('should display children', () => {
		expect(wrapper.contains(<div>Child</div>)).toBe(true)
	})

	describe('add promocode', () => {
		beforeEach(() => {
			wrapper = shallow(
				<Receipt
					dashPricing={false}
					recipeTotalPrice={'29.99'}
					totalToPay={'29.99'}
					prices={Immutable.fromJS({})}
					showAddPromocode
				/>,
			)
		})

		test('should show Add PromoCode Component', () => {
			expect(wrapper.contains(<PromoCode />)).toBe(true)
		})
	})

	describe('delivery and order number', () => {
		beforeEach(() => {
			wrapper = shallow(
				<Receipt
					numPortions={2}
					numRecipes={3}
					deliveryTotalPrice={'1.99'}
					dashPricing={false}
					recipeTotalPrice={'29.99'}
					recipeDiscountAmount={'15.00'}
					recipeDiscountPercent={'50'}
					totalToPay={'14.99'}
					extrasTotalPrice={'2.00'}
					surcharges={Immutable.fromJS([1])}
					surchargeTotal={'4.99'}
					prices={Immutable.fromJS({
						extrasTotalPrice: '2.00',
					})}
					shippingAddress={Immutable.fromJS({
						line1: '1 Example Street',
						line2: 'Zone 2',
						line3: 'Neverland',
						town: 'London',
						postcode: 'F4 K3',
					})}
					deliveryDate="2016-05-06"
					deliverySlot={Immutable.fromJS({
						deliveryStart: '09:00:00',
						deliveryEnd: '16:59:59',
					})}
					orderNumber="6283494"
				/>,
			)
		})

		test('show delivery label', () => {
			const recipeLine = wrapper.find(ReceiptLine).at(6)
			expect(recipeLine.prop('label')).toBe('Delivery')
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
			const recipeLine = wrapper.find(ReceiptLine).at(7)
			expect(recipeLine.prop('label')).toBe('Order number')
			expect(recipeLine.prop('children')).toEqual('6283494')
		})
	})

	describe('surcharges', () => {
		test('should show surcharges when surcharge total greater than zero and surcharges array not empty', () => {
			wrapper = shallow(
				<Receipt
					surchargeTotal={'0.45'}
					surcharges={Immutable.fromJS([1, 2, 3])}
				/>,
			)
			const results = wrapper.findWhere(
				element =>
					element.type() === ReceiptLine &&
					element.prop('label').includes('Recipe surcharge'),
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

		test('should NOT show surcharges when surcharge total is undefined and surcharges array not empty', () => {
			wrapper = shallow(<Receipt surcharges={Immutable.fromJS([1, 2, 3])} />)

			expect(
				wrapper.findWhere(
					element =>
						element.type() === ReceiptLine &&
						element.prop('label').includes('Recipe surcharge'),
				).length,
			).toBe(0)
		})

		test('should NOT show surcharges when surcharge total is greater than zero and surcharges array is empty', () => {
			wrapper = shallow(
				<Receipt surchargeTotal={'0.45'} surcharges={Immutable.fromJS([])} />,
			)

			expect(
				wrapper.findWhere(
					element =>
						element.type() === ReceiptLine &&
						element.prop('label').includes('Recipe surcharge'),
				).length,
			).toBe(0)
		})

		test('should NOT show surcharges when surcharge total is zero and surcharges array is empty', () => {
			wrapper = shallow(<Receipt surcharges={Immutable.fromJS([])} />)

			expect(
				wrapper.findWhere(
					element =>
						element.type() === ReceiptLine &&
						element.prop('label').includes('Recipe surcharge'),
				).length,
			).toBe(0)
		})
	})
})
