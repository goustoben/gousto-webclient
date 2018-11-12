import React from 'react'

import sinon from 'sinon'

import { mount } from 'enzyme'
import InputWrapper from 'Form/InputWrapper'

describe('InputWrapper', () => {
  let wrapper
  const Component = () => (
		<div>
			<p>Child Node</p>
		</div>
  )
  const ComponentWrapper = InputWrapper(Component)

  beforeEach(() => {
    wrapper = mount(<ComponentWrapper />)
  })

  test('should return given Component', () => {
    expect(wrapper.find(Component).length).toEqual(1)
  })

  test('should set data-hj-masked to prop value for "mask" in additionalProps', () => {
    expect(
      wrapper.find(Component).prop('additionalProps')['data-hj-masked'],
    ).toEqual(undefined)

    wrapper = mount(<ComponentWrapper mask />)
    expect(
      wrapper.find(Component).prop('additionalProps')['data-hj-masked'],
    ).toEqual(true)

    wrapper = mount(<ComponentWrapper mask={false} />)
    expect(
      wrapper.find(Component).prop('additionalProps')['data-hj-masked'],
    ).toEqual(false)
  })

  test('should pass through any props not consumed', () => {
    wrapper = mount(
			<ComponentWrapper attribute1 attribute2={'something'} mask />,
    )
    expect(wrapper.find(Component).prop('attribute1')).toEqual(true)
    expect(wrapper.find(Component).prop('attribute2')).toEqual('something')
  })

  test('should NOT pass through any consumed props', () => {
    wrapper = mount(<ComponentWrapper mask inputType childLabel />)
    expect(wrapper.find(Component).prop('mask')).toEqual(undefined)
    expect(wrapper.find(Component).prop('inputType')).toEqual(undefined)
    expect(wrapper.find(Component).prop('childLabel')).toEqual(undefined)
  })

  describe('when inputType is CheckBox', () => {
    test('should set "checked" to true if value is truthy, otherwise false', () => {
      wrapper = mount(<ComponentWrapper inputType="CheckBox" value="value 1" />)
      expect(wrapper.find(Component).prop('checked')).toEqual(true)

      wrapper = mount(<ComponentWrapper inputType="CheckBox" />)
      expect(wrapper.find(Component).prop('checked')).toEqual(false)
    })

    test('should set "label" to childLabel value', () => {
      wrapper = mount(
				<ComponentWrapper inputType="CheckBox" childLabel="Checkbox Label" />,
      )
      expect(wrapper.find(Component).prop('label')).toEqual('Checkbox Label')
    })
  })
})
