import React from 'react'
import { shallow } from 'enzyme'

import Link from 'Link'
import Unsubscribed from 'routes/Unsubscribe/Unsubscribed'

describe('<Unsubscribed />', () => {
	test('<Link /> is present', () => {
		const wrapper = shallow(
			<Unsubscribed copy={{ link: '' }} />
		)

		expect(wrapper.find(Link).length).toBe(1)
	})

	test('link is pointing to the homepage', () => {
		const wrapper = shallow(
			<Unsubscribed copy={{ link: '' }} />
		)

		expect(wrapper.find(Link).props().to).toBe('/')
	})
})
