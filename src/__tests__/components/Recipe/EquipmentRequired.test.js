import React from 'react'
import Immutable from 'immutable'

import sinon from 'sinon'

import { shallow } from 'enzyme'

import EquipmentRequired from 'Recipe/EquipmentRequired'
import Icon from 'Icon'
import { Div, Span } from 'Page/Elements'

describe('<EquipmentRequired />', () => {
  let wrapper
  const blankSpace = String.fromCharCode(160)

  beforeEach(() => {
    wrapper = shallow(
			<EquipmentRequired
			  equipment={Immutable.fromJS(['Spoon', 'Egg Beater'])}
			/>,
    )
  })

  test('should return null by default', () => {
    wrapper = shallow(<EquipmentRequired />)
    expect(wrapper.type()).toBe(null)
  })

  test('should return a <Div> if there is at least 1 equipment item provided', () => {
    expect(wrapper.type()).toBe(Div)
  })

  test('should contain 1 Icon with name "fa-spoon" and fixedWidth', () => {
    const icon = wrapper.find(Icon)
    expect(icon.length).toBe(1)
    expect(icon.prop('name')).toBe('fa-spoon')
    expect(icon.prop('fixedWidth')).toBe(true)
  })

  test('should contain 1 Span', () => {
    expect(wrapper.children(Span).length).toBe(1)
  })

  test('should contain 1 space and text with a comma-separated list of ingredients in span by default', () => {
    expect(wrapper.children(Span).prop('children')).toEqual([
      blankSpace,
      'Spoon, Egg Beater',
    ])
  })

  test('should contain 1 space & text "Equipment required" in Span if view is "notice"', () => {
    wrapper = shallow(
			<EquipmentRequired
			  equipment={Immutable.fromJS(['Spoon', 'Egg Beater'])}
			  view="notice"
			/>,
    )
    expect(wrapper.children(Span).prop('children')).toEqual([
      blankSpace,
      'Equipment required',
    ])
  })
})
