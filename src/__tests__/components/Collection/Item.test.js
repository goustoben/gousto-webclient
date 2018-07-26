import React from 'react'
import { shallow } from 'enzyme'

import Details from 'Page/Block/Details'
import Image from 'Page/Block/Image'
import Item from 'Collection/Item'
import Link from 'Link'
import { Div } from 'Page/Elements'
import Title from 'Page/Block/Title'

describe('Collection Item', () => {
	test('should return a Div by default', () => {
		const wrapper = shallow(<Item />)
		expect(wrapper.type()).toBe(Div)
	})

	test('should return a Link if link is provided', () => {
		const wrapper = shallow(<Item link="/some-url" />)
		expect(wrapper.type()).toBe(Link)
	})

	test('should contain 1 Image', () => {
		const wrapper = shallow(<Item />)
		expect(wrapper.find(Image).length).toBe(1)
	})

	test('should contain 1 Details', () => {
		const wrapper = shallow(<Item />)
		expect(wrapper.find(Details).length).toBe(1)
	})

	test('should contain 1 Title in Details', () => {
		const wrapper = shallow(<Item title="Title String" />)
		const title = wrapper.find(Details).find(Title)
		expect(title.length).toBe(1)
		expect(title.prop('children')).toBe('Title String')
	})
})
