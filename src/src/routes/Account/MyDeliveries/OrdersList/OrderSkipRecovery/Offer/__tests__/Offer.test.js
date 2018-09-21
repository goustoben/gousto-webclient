import React from 'react'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'

import Offer from '../Offer'

describe('Order Skip Recovery Model Offer', () => {
	let wrapper
	const offer = {
		message: 'You only have 10% on all your orders until the 19th of October',
		formatted_value: '10%',
		raw_message: {
			text: 'You only have {:value:} on all your orders until the {:date:}',
			values: {
				date: '19th of October',
				value: '10%'
			}
		}
	}

	describe('Innitial Render', () => {
		beforeAll(() => {
			wrapper = mount(<Offer offer={offer} />)
		})

		test('should render snapshot', () => {
			const tree = renderer.create(
				<Offer offer={offer} />
			).toJSON()

			expect(tree).toMatchSnapshot()
		})

		test('should render discount amount', () => {
			const discountAmount = wrapper.find('.discountOSR')

			expect(discountAmount.text()).toBe('10% OFF')
		})

		test('should render discount message', () => {
			const discountMessage = wrapper.find('.messageDiscountOSR')

			expect(discountMessage.text()).toBe('You only have 10% OFF on all your orders until the 19th of October')
		})
	})

	describe('Alternative Render', () => {
		test('should not render component if no offer prop is passed', () => {
			wrapper = mount(<Offer />)

			const wrapperDiv = wrapper.find('offerWrapper')

			expect(wrapperDiv.length).toBe(0)
		})
	})
})
