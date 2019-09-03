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

  test('should call moveToBox when click if fromBox false', () => {
    const moveToBoxSpy = jest.fn()
    const moveToShortlistSpy = jest.fn()
    wrapper.setProps({ fromBox: false, recipeId: '123', moveToBox: moveToBoxSpy, moveToShortlist: moveToShortlistSpy })
    wrapper.find('button').simulate('click')
    expect(moveToBoxSpy).toHaveBeenCalled()
  })
  test('should call moveToShortlistSpy when click if fromBox true', () => {
    const moveToBoxSpy = jest.fn()
    const moveToShortlistSpy = jest.fn()
    wrapper.setProps({ fromBox: true, recipeId: '123', moveToBox: moveToBoxSpy, moveToShortlist: moveToShortlistSpy })
    wrapper.find('button').simulate('click')
    expect(moveToShortlistSpy).toHaveBeenCalled()
  })
})
