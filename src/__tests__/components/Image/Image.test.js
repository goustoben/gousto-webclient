import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable' /* eslint-disable new-cap */

import Image from 'Image'

describe('Image', () => {
	let media
	beforeEach(() => {
		media = Immutable.fromJS([
			{
				src: 'carrot.small.jpg',
				width: 100,
			},
			{
				src: 'carrot.medium.jpg',
				width: 150,
			},
			{
				src: 'carrot.large.jpg',
				width: 200,
			},
			{
				src: 'carrot.extraLarge.jpg',
				width: 250,
			},
		])
	})

	test('should return one <img>', () => {
		const wrapper = shallow(<Image media={media} />)

		expect(wrapper.find('img').length).toBe(1)
	})

	test('should return a <img> when a single image url is provided', () => {
		const wrapper = shallow(
			<Image
				media={media
					.take(1)
					.toArray()[0]
					.get('src')}
			/>,
		)

		expect(wrapper.type()).toBe('img')
	})

	test('should fail gracefully if a default url can not be found', () => {
		try {
			shallow(<Image media={Immutable.fromJS([{}])} />)
		} catch (err) {
			expect(err).toBeNull()
		}
	})

	test('should call onClick if defined when image is clicked', () => {
		const onClickSpy = jest.fn()
		const wrapper = shallow(<Image media="" onClick={onClickSpy} />)
		wrapper.find('img').simulate('click')

		expect(onClickSpy).toHaveBeenCalledTimes(1)
	})

	test('should use smallest image greater in width than provided size when the maxMediaSize is set', () => {
		const wrapper = shallow(<Image media={media} maxMediaSize={149} />)
		expect(wrapper.find('img')).toHaveLength(1)
		expect(wrapper.find('img').prop('src')).toBe('carrot.medium.jpg')

		const wrapper2 = shallow(<Image media={media} maxMediaSize={150} />)
		expect(wrapper2.find('img')).toHaveLength(1)
		expect(wrapper2.find('img').prop('src')).toBe('carrot.medium.jpg')

		const wrapper3 = shallow(<Image media={media} maxMediaSize={151} />)
		expect(wrapper3.find('img')).toHaveLength(1)
		expect(wrapper3.find('img').prop('src')).toBe('carrot.large.jpg')
	})
})
