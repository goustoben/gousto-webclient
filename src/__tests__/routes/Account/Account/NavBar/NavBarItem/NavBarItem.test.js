import sinon from 'sinon'

import React from 'react'
import { shallow } from 'enzyme'
import NavBarItem from 'routes/Account/Account/NavBar/NavBarItem/NavBarItem'
import Link from 'Link'

describe('NavBarItem', () => {
	describe('rendering', () => {
		let wrapper

		beforeEach(() => {
			wrapper = shallow(<NavBarItem />)
		})

		test('should render a <li> with no props', () => {
			expect(wrapper.type()).toEqual('li')
		})

		test('should render 1 Link', () => {
			expect(wrapper.find(Link).length).toEqual(1)
		})
	})

	describe('rendering', () => {
		let wrapper

		beforeEach(() => {
			wrapper = shallow(<NavBarItem clientRouted />)
		})

		test('should subscription <Link /> is clientRouted', () => {
			expect(
				wrapper
					.find(Link)
					.at(0)
					.props().clientRouted,
			).toEqual(true)
		})
	})
})
