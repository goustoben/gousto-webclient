import React from 'react'
import { mount } from 'enzyme'
import Helmet from 'react-helmet'

import GetHelp from 'routes/GetHelp/GetHelp'

describe('<GetHelp />', () => {
	const location = {
		query: {
			orderId: '7',
		},
	}
	const storeGetHelpOrderIdSpy = jest.fn()
	const wrapper = mount(
		<GetHelp
			location={location}
			storeGetHelpOrderId={storeGetHelpOrderIdSpy}
		>
			<div className="test" />
		</GetHelp>
	)

	describe('rendering', () => {
		test('component is redering correctly', () => {
			expect(wrapper.find(Helmet)).toHaveLength(1)
			expect(wrapper.contains(<div className="test" />)).toBe(true)
		})
	})

	describe('behaviour', () => {
		test('storeGetHelpOrderId action is called with the order id', () => {
			expect(storeGetHelpOrderIdSpy).toHaveBeenCalledWith('7')
		})
	})
})
