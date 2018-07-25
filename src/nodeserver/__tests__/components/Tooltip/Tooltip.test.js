import React from 'react'
import { shallow } from 'enzyme'
import Tooltip from 'Tooltip'
import RCTooltip from 'rc-tooltip'

describe('Tooltip', () => {
	const message = 'test'
	const children = 'test'

	test('should return a <RCTooltip>', () => {
		const wrapper = shallow(<Tooltip message={message}>{children}</Tooltip>)

		expect(wrapper.find(RCTooltip).length).toBe(1)
	})

	test('should return a <RCTooltip> with default props', () => {
		const wrapper = shallow(<Tooltip message={message}>{children}</Tooltip>)
		const RCTooltipProps = wrapper.find(RCTooltip).node.props

		expect(RCTooltipProps.visible).toBe(false)
		expect(RCTooltipProps.placement).toBe('top')
		expect(RCTooltipProps.trigger).toEqual(['click', 'hover'])
	})

	test('should return a <RCTooltip> with specifed props', () => {
		const placement = 'topRight'
		const wrapper = shallow(
			<Tooltip placement={placement} message={message} visible>
				{children}
			</Tooltip>,
		)

		const RCTooltipProps = wrapper.find(RCTooltip).node.props
		expect(RCTooltipProps.visible).toBe(true)
		expect(RCTooltipProps.placement).toBe(placement)
		expect(RCTooltipProps.trigger).toEqual(['click', 'hover'])
	})

	test('should set correct overlayClassName on <RCTooltip> with specifed props', () => {
		const wrapper = shallow(<Tooltip style="button">{children}</Tooltip>)

		expect(
			wrapper
				.find(RCTooltip)
				.node.props.overlayClassName.indexOf('rc-tooltip-style-button'),
		).not.toBe(-1)
	})
})
