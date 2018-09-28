import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'

import Image from 'Recipe/Image'
import GoustoImage from 'Image'

describe('<Image />', () => {
	let wrapper
	let media
	beforeEach(() => {
		media = Immutable.fromJS([
			{
				src: 'radish.small.jpg',
				width: 100,
			},
			{
				src: 'radish.medium.jpg',
				width: 150,
			},
			{
				src: 'radish.large.jpg',
				width: 200,
			},
			{
				src: 'radish.extraLarge.jpg',
				width: 250,
			},
		])
	})

	test('shouldn\'t render a GoustoImage without media', () => {
		wrapper = shallow(<Image />)

		expect(wrapper.find(GoustoImage)).toHaveLength(0)
	})

	test('should render a GoustoImage with media', () => {
		wrapper = shallow(<Image media={media} />)

		expect(wrapper.find(GoustoImage)).toHaveLength(1)
	})
})

