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

  test('should render text for shortlist full if fromBox is true and limit reached in shortlist', () => {
    wrapper.setProps({ fromBox: true, isShortlistLimitReached: true })
    expect(wrapper.text()).toContain('Shortlist full')
  })

  test('should render text for box full if fromBox is false and limit reached in basket', () => {
    wrapper.setProps({ fromBox: false, isBasketLimitReached: true })
    expect(wrapper.text()).toContain('Box full')
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
