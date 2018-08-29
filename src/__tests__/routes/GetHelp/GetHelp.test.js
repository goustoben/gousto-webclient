import React from 'react'
import { shallow } from 'enzyme'
import Helmet from 'react-helmet'

import GetHelp from 'routes/GetHelp/GetHelp'

describe('<GetHelp />', () => {
	test('component is redering correctly', () => {
		const wrapper = shallow(
			<GetHelp>
				<div className="test" />
			</GetHelp>
		)

		expect(wrapper.find(Helmet)).toHaveLength(1)
		expect(wrapper.contains(<div className="test" />)).toBe(true)
	})
})
