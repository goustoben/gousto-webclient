import React from 'react'
import { shallow } from 'enzyme'

import { BottomButton } from 'routes/GetHelp/components/BottomButton'

describe('<BottomButton />', () => {
	const color = 'test-color'
	const url = 'test-url'
	const ChildComponent = () => (<div>I am a component</div>)

	test('BottomButton is rendering correctly', () => {
		const wrapper = shallow(
			<BottomButton
				color={color}
				url={url}
				clientRouted
			>
				<ChildComponent />
			</BottomButton>
		)

		const button = wrapper.find('Button')
		const link = button.find('GoustoLink')

		expect(button).toHaveLength(1)
		expect(button.prop('color')).toBe('test-color')
		expect(button.prop('width')).toBe('auto')
		expect(button.prop('areChildrenInSegment')).toBe(true)
		expect(link).toHaveLength(1)
		expect(link.prop('clientRouted')).toBe(true)
		expect(link.prop('to')).toBe('test-url')
		expect(link.find('ChildComponent')).toHaveLength(1)
	})

	test('Link is passed clientRouted false when BottomButton has clientRouted false', () => {
		const wrapper = shallow(
			<BottomButton
				color={color}
				url={url}
				clientRouted={false}
			>
				<ChildComponent />
			</BottomButton>
		)

		expect(wrapper.find('Button').find('GoustoLink').prop('clientRouted')).toBe(false)
	})
})
