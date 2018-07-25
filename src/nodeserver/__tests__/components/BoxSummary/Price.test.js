import React from 'react'

import { shallow } from 'enzyme'

import Price from 'BoxSummary/Price'
import css from 'BoxSummary/Price/Price.css'

describe('<Price />', () => {
	let [recipeTotal, recipeDiscount, recipeTotalDiscounted] = [39.99, 0.0, 39.99]

	test('should display a dash by default', () => {
		const wrapper = shallow(<Price />)

		expect(wrapper.text().indexOf('£-') > -1).toBe(true)
	})

	test('should render a formatted recipeTotal', () => {
		const wrapper = shallow(
			<Price
				recipeTotal={recipeTotal}
				recipeDiscount={recipeDiscount}
				recipeTotalDiscounted={recipeTotalDiscounted}
			/>,
		)

		expect(wrapper.text().indexOf('£39.99') > -1).toBe(true)
	})

	test('should render a receipeTotal and a discountedPrice if applicable', () => {
		;[recipeTotal, recipeDiscount, recipeTotalDiscounted] = [39.99, 5.0, 34.99]
		const wrapper = shallow(
			<Price
				recipeTotal={recipeTotal}
				recipeDiscount={recipeDiscount}
				recipeTotalDiscounted={recipeTotalDiscounted}
			/>,
		)

		expect(wrapper.text().indexOf('£39.99') > -1).toBe(true)
		expect(wrapper.text().indexOf('£34.99') > -1).toBe(true)
	})

	test('should strike through receipeTotal if it also has a discounted price', () => {
		;[recipeTotal, recipeDiscount, recipeTotalDiscounted] = [39.99, 5.0, 34.99]
		const wrapper = shallow(
			<Price
				recipeTotal={recipeTotal}
				recipeDiscount={recipeDiscount}
				recipeTotalDiscounted={recipeTotalDiscounted}
			/>,
		)
		const strikeClassSelector = `.${css.total.split(' ').join('.')}`

		expect(wrapper.find(strikeClassSelector).length).toBe(1)
		expect(wrapper.text().indexOf('£34.99') > -1).toBe(true)
	})
})
