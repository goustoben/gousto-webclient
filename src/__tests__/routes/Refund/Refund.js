import React from 'react'
import { shallow } from 'enzyme'
import Helmet from 'react-helmet'

import Refund from 'routes/Refund/Refund'

describe('<Refund />', () => {
	test('component is redering correctly', () => {
		const wrapper = shallow(
			<Refund>
				<div className="test" />
			</Refund>
		)

		expect(wrapper.find(Helmet)).toHaveLength(1)
		expect(wrapper.contains(<div className="test" />)).toBe(true)
	})
})
