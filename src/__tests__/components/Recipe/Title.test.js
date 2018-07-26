import React from 'react'

import sinon from 'sinon'

import { shallow } from 'enzyme'

import Title from 'Recipe/Title'

describe('<Title />', () => {
	test('should return a <h2>', () => {
		const wrapper = shallow(<Title title={'asda'} />)
		expect(wrapper.type()).toEqual('h2')
	})
	test('should show a regular value as-is', () => {
		const wrapper = shallow(<Title title={'asdac'} />)
		expect(
			wrapper
				.find('h2')
				.at(0)
				.text()
				.trim(),
		).toEqual('asdac')
	})
	test('should filter out diacritics if the title is featured', () => {
		const wrapper = shallow(<Title title={'âśdãç'} view={'featured'} />)
		expect(
			wrapper
				.find('h2')
				.at(0)
				.text()
				.trim(),
		).toEqual('asdac')
	})
	test('should filter out diacritics if the title is simple', () => {
		const wrapper = shallow(<Title title={'âśdãç'} view={'simple'} />)
		expect(
			wrapper
				.find('h2')
				.at(0)
				.text()
				.trim(),
		).toEqual('asdac')
	})
	test('should not filter out diacritics if the title is not featured or simple', () => {
		const wrapper = shallow(<Title title={'âśdãç'} />)
		expect(
			wrapper
				.find('h2')
				.at(0)
				.text()
				.trim(),
		).toEqual('âśdãç')
	})
})
