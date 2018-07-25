import React from 'react'
import renderer from 'react-test-renderer';

import BoxPrice from 'routes/BoxPrices/BoxPrice'

describe("BoxPrice", () => {

	const boxPriceMock = [
		{ delivery_total: '0.00',
			gross_total: '24.99',
			num_persons: 2,
			num_portions: 2,
			price_per_portion: '6.25',
			price_per_portion_discounted: '6.25',
			product_total: '0.00',
			promo_code: 'false',
			promo_code_valid: 'false',
			recipe_discount: '0.00',
			recipe_total: '24.99',
			total: '24.99',
			vat_charged: '0.00'
		},
		{ delivery_total: '0.00',
			gross_total: '29.99',
			num_persons: 2,
			num_portions: 3,
			price_per_portion: '5.00',
			price_per_portion_discounted: '5.00',
			product_total: '0.00',
			promo_code: 'false',
			promo_code_valid: 'false',
			recipe_discount: '0.00',
			recipe_total: '29.99',
			total: '29.99',
			vat_charged: '0.00'
		},
		{ delivery_total: '0.00',
			gross_total: '34.99',
			num_persons: 2,
			num_portions: 4,
			price_per_portion: '4.37',
			price_per_portion_discounted: '4.37',
			product_total: '0.00',
			promo_code: 'false',
			promo_code_valid: 'false',
			recipe_discount: '0.00',
			recipe_total: '34.99',
			total: '34.99',
			vat_charged: '0.00'
		}
	]

	it ("Will snap BoxPrice", () => {
		const tree = renderer
		.create(<BoxPrice boxInfo={boxPriceMock} numPersons={2} />)
		.toJSON();

		expect(tree).toMatchSnapshot();
	})
})
