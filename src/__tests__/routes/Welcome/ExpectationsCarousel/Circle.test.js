import React from 'react'
import Circle from 'routes/Welcome/ExpectationsCarousel/Circle'
import { shallow } from 'enzyme'
import sinon from 'sinon'

describe('Circle', () => {
	const wrapper = shallow(<Circle content={2} top={40} left={60} />)

	test('should return span', () => {
		expect(wrapper.type()).toBe('span')
	})

	test('should put the content property as the text', () => {
		expect(
			wrapper
				.find('span')
				.first()
				.text(),
		).toContain(2)
	})

	test('should add top and left styles', () => {
		expect(wrapper.first().prop('style')).toEqual({ top: '40%', left: '60%' })
	})
})
