import React from 'react'
import { shallow } from 'enzyme'
import { MoveRecipeButton } from '../MoveRecipeButton'

describe('MoveRecipeButton', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<MoveRecipeButton />)
  })

  test('should render div', () => {
    expect(wrapper.type()).toEqual('div')
  })

  test('should render text for move to shortlist if fromBox is true', () => {
    wrapper.setProps({ fromBox: true })
    expect(wrapper.text()).toContain('Move to shortlist')
  })

  test('should render text for add to box if fromBox is false', () => {
    wrapper.setProps({ fromBox: false })
    expect(wrapper.text()).toContain('Add to box')
  })
})
