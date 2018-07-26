import React from 'react'
import { shallow } from 'enzyme'
import Banner from 'Banner'
import renderer from 'react-test-renderer'

describe('Banner', () => {
	test('should return a div', () => {
		const wrapper = shallow(<Banner />)
		expect(wrapper.type()).toEqual('div')
	})

	test('should contain a paragraph', () => {
		const wrapper = shallow(<Banner />)
		expect(wrapper.find('p').length).toEqual(1)
	})

	test('should render text if text prop is set', () => {
		const text = 'Fusce a quam'
		const wrapper = shallow(<Banner text={text} />)
		expect(wrapper.find('p').text()).toContain(text)
	})

	describe('snapshots', () => {
		test('should render with given text', () => {
			const text = "A Banner's text"
			const tree = renderer.create(<Banner text={text} />).toJSON()

			expect(tree).toMatchSnapshot()
		})
	})
})
