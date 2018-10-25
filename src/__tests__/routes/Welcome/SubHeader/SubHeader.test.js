import sinon from 'sinon'

import React from 'react'
import { shallow } from 'enzyme'
import SubHeader from 'routes/Welcome/SubHeader'
import SectionHeader from 'SectionHeader'
import ContentContainer from 'containers/Content/Content'

describe('WelcomeHeader', () => {
	let wrapper
	beforeEach(() => {
		wrapper = shallow(<SubHeader nameFirst="Alice" message="Test message" />)
	})

	test('should return ContentContainer', () => {
		expect(wrapper.type()).toEqual(ContentContainer)
	})

	test('should  set title to "Thanks <nameFirst>,"', () => {
		expect(wrapper.find(SectionHeader).prop('title')).toBe('Thanks Alice,')
	})

	test('should contain 1 p with welcome message', () => {
		expect(wrapper.contains(<p>Test message</p>)).toBe(true)
	})

	test('should display default welcome message if none is set', () => {
		wrapper = shallow(<SubHeader nameFirst="Alice" />)

		expect(
			wrapper.contains(
				<p>
					You’ve just made your first step towards a life with more free time,
					better food and less hassle than ever before. Let the good times roll!
				</p>,
			),
		).toBe(true)
	})
})
