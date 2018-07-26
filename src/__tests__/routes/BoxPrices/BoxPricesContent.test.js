import React from 'react'
import renderer from 'react-test-renderer';

import BoxPricesContent from 'routes/BoxPrices/BoxPricesContent'

describe("BoxPricesContent", () => {

	it ("Will snap BoxPricesContent", () => {
		const tree = renderer
		.create(<BoxPricesContent />)
		.toJSON();

		expect(tree).toMatchSnapshot();
	})
})
