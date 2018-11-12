import React from 'react'
import { shallow, mount } from 'enzyme'

import InfoToggle from 'routes/Menu/SubHeader/InfoToggle'
import { Tooltip } from 'goustouicomponents'

describe('InfoToggle', () => {
  test('should render a Tooltip', () => {
    const wrapper = shallow(
			<InfoToggle>
				<span />
				<span />
			</InfoToggle>,
    )
    expect(wrapper.type()).toBe(Tooltip)
  })
  test('should render the first child given as the child of the ToolTip', () => {
    const wrapper = mount(
			<InfoToggle>
				<span id="firstChild" />
				<span id="secondChild" />
			</InfoToggle>,
    )
    expect(wrapper.find('#firstChild')).toHaveLength(1)
    expect(wrapper.find('#secondChild')).toHaveLength(0)
  })
  test('should render the second child given as the message prop of the ToolTip', () => {
    const wrapper = mount(
			<InfoToggle>
				<span id="firstChild" />
				<span id="secondChild" />
			</InfoToggle>,
    )
    const message = mount(wrapper.find(Tooltip).prop('message'))
    expect(message.find('#secondChild')).toHaveLength(1)
    expect(message.find('#firstChild')).toHaveLength(0)
  })
})
