import React from 'react'
import FilterNav from 'routes/Menu/FilterNav/FilterNav'
import renderer from 'react-test-renderer';

describe("Filter Nav", () => {

	it("will render a FilterNav", () => {
		const tree = renderer
		.create(<FilterNav ctaText="All recipes"/>)
		.toJSON();
		expect(tree).toMatchSnapshot();
	})
})
