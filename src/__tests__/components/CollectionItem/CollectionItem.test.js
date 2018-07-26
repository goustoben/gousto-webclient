import React from 'react'
import { shallow } from 'enzyme'

import CollectionItem from 'CollectionItem'

describe('<CollectionItem />', () => {
	let wrapper

	describe('children', () => {
		test('should display children', () => {
			const child = <span className="child">All Recipes</span>
			wrapper = shallow(<CollectionItem>{child}</CollectionItem>)

			expect(wrapper.find('.child')).toHaveLength(1)
		})

		test('should display children before count', () => {
			const child = <span className="child">All Recipes</span>
			wrapper = shallow(<CollectionItem count={25}>{child}</CollectionItem>)
			const contents = wrapper.find('.item').children()

			expect(contents.at(0).text()).toContain('All Recipes')
			expect(contents.at(1).text()).toContain(25)
		})
	})

	describe('count', () => {
		test('should display 0 by default', () => {
			wrapper = shallow(<CollectionItem />)

			expect(wrapper.find('.count')).toHaveLength(1)
			expect(wrapper.find('.count').first().text()).toContain('0')
		})

		test('should display count prop', () => {
			wrapper = shallow(<CollectionItem count={10} />)

			expect(wrapper.find('.count')).toHaveLength(1)
			expect(wrapper.find('.count').first().text()).toContain('10')
		})

		test('should not display count prop', () => {
			wrapper = shallow(<CollectionItem count={10} showCount={false} />)

			expect(wrapper.find('.count')).toHaveLength(0)
		})
	})
})
