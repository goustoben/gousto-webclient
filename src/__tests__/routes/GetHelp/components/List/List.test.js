import React from 'react'
import { shallow } from 'enzyme'

import List from 'routes/GetHelp/components/List'


describe('<List />', () => {
	const items = [
		{ slug: 'slug1', name: 'name1', url: '/test1' },
		{ slug: 'slug2', name: 'name2', url: '/test2' },
	]
	const trackItemSelectedSpy = jest.fn()
	const wrapper = shallow(
		<List items={items} trackItemSelected={trackItemSelectedSpy} />
	)

	test('list component renders correctly', () => {
		const items = wrapper.find('Item')

		expect(wrapper.find('ul')).toHaveLength(1)
		expect(items).toHaveLength(2)
		expect(items.at(0).html()).toContain('name1')
		expect(items.at(1).html()).toContain('name2')
		expect(items.at(0).prop('to')).toBe('/test1')
		expect(items.at(1).prop('to')).toBe('/test2')
	})

	test('clicking on items gets tracked', () => {
		wrapper.find('Item').at(1).simulate('click')

		expect(trackItemSelectedSpy).toHaveBeenCalledTimes(1)
		expect(trackItemSelectedSpy).toHaveBeenCalledWith('slug2')
	})
})
