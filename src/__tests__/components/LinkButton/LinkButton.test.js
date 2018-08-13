import React from 'react'
import { shallow } from 'enzyme'
import LinkButton from 'LinkButton'
import Button from 'Button'
import Link from 'Link'

describe('LinkButton', () => {
	const wrapper = shallow(<LinkButton />)

	test('should return Button', () => {
		expect(wrapper.type()).toEqual(Button)
	})
})

describe('LinkButton link', () => {
	const wrapper = shallow(<LinkButton to={'/testRoute'} clientRouted />)

	test('should display an Link', () => {
		expect(wrapper.find(Link).length).toEqual(1)
	})

	test('should pass to prop to link', () => {
		expect(wrapper.find(Link).prop('to')).toEqual('/testRoute')
	})

	test('should pass clientRouted prop to link', () => {
		expect(wrapper.find(Link).prop('clientRouted')).toEqual(true)
		wrapper.setProps({ clientRouted: false })
		expect(wrapper.find(Link).prop('clientRouted')).toEqual(false)
	})
})
