import React from 'react'
import { mount } from 'enzyme'
import RCTooltip from 'rc-tooltip'
import { Tooltip } from '../index'

describe('Tooltip', () => {
  const message = 'test'
  const children = <div>test</div>

  test('should return a <RCTooltip>', () => {
    const wrapper = mount(<Tooltip message={message}>{children}</Tooltip>)

    expect(wrapper.find(RCTooltip).length).toBe(1)
  })

  test('should return a <RCTooltip> with default props', () => {
    const wrapper = mount(<Tooltip message={message}>{children}</Tooltip>)
    const RCTooltipProps = wrapper.find(RCTooltip).props()

    expect(RCTooltipProps.visible).toBe(false)
    expect(RCTooltipProps.placement).toBe('top')
    expect(RCTooltipProps.trigger).toEqual(['click', 'hover'])
  })

  test('should return a <RCTooltip> with specifed props', () => {
    const placement = 'topRight'
    const wrapper = mount(
      <Tooltip placement={placement} message={message} visible>
        {children}
      </Tooltip>,
    )

    const RCTooltipProps = wrapper.find(RCTooltip).props()
    expect(RCTooltipProps.visible).toBe(true)
    expect(RCTooltipProps.placement).toBe(placement)
    expect(RCTooltipProps.trigger).toEqual(['click', 'hover'])
  })

  test('should set correct overlayClassName on <RCTooltip> with specifed props', () => {
    const wrapper = mount(<Tooltip style="button" message={message}>{children}</Tooltip>) // eslint-disable-line react/style-prop-object

    expect(
      wrapper
        .find(RCTooltip)
        .props().overlayClassName.indexOf('rc-tooltip-style-button'),
    ).not.toBe(-1)
  })
})
