import React from 'react'
import { shallow } from 'enzyme'

import Link from 'Link/Link'
import { Link as rrLink } from 'react-router'

const router = {
	push: () => {},
	replace: () => {},
	go: () => {},
	goBack: () => {},
	goForward: () => {},
	setRouteLeaveHook: () => {},
	isActive: () => {},
	createHref: location => location,
}

describe('Link', () => {
	test("should render an <a> element if there's no router in it's context", () => {
		const wrapper = shallow(<Link to="/page">Page</Link>)
		expect(wrapper.type()).toEqual('a')
	})

	test("should render a react router Link if there's a router in it's context", () => {
		const wrapper = shallow(<Link to="/page">Page</Link>, {
			context: { router },
		})
		expect(wrapper.type()).toEqual(rrLink)
	})

	test("should render an <a> element if there's a router in it's context but clientRouted=false", () => {
		const wrapper = shallow(
			<Link to="/page" clientRouted={false}>
				Page
			</Link>,
			{ context: { router } },
		)
		expect(wrapper.type()).toEqual('a')
	})
})
