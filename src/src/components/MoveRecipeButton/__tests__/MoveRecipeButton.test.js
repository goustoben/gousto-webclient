import React from 'react'
import { shallow } from 'enzyme'
import { MoveRecipeButton } from '../MoveRecipeButton'

describe('MoveRecipeButton', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<MoveRecipeButton recipeId={"1"} />)
  })

  test('should render a button', () => {
    expect(wrapper.type()).toEqual('button')
  })

  describe('when fromBox is true', () => {
    beforeEach(() => {
      wrapper.setProps({ fromBox: true })
    })

    test('should render text for move to shortlist', () => {
      expect(wrapper.text()).toContain('Move to shortlist')
    })

    test('should render text for shortlist full when limit reached in shortlist', () => {
      wrapper.setProps({ isShortlistLimitReached: true })
      expect(wrapper.text()).toContain('Shortlist full')
    })

    test('should call moveToShortlistSpy when click', () => {
      const moveToBoxSpy = jest.fn()
      const moveToShortlistSpy = jest.fn()
      wrapper.setProps({ recipeId: '123', moveToBox: moveToBoxSpy, moveToShortlist: moveToShortlistSpy })
      wrapper.find('button').simulate('click')
      expect(moveToShortlistSpy).toHaveBeenCalled()
    })
  })

  describe('when fromBox is false', () => {
    beforeEach(() => {
      wrapper.setProps({ fromBox: false })
    })

    test('should render text for add to box', () => {
      expect(wrapper.text()).toContain('Add to box')
    })

    test('should render text for box full when limit reached in basket', () => {
      wrapper.setProps({ isBasketLimitReached: true })
      expect(wrapper.text()).toContain('Box full')
    })

    test('should call moveToBox when click', () => {
      const moveToBoxSpy = jest.fn()
      const moveToShortlistSpy = jest.fn()
      wrapper.setProps({ recipeId: '123', moveToBox: moveToBoxSpy, moveToShortlist: moveToShortlistSpy })
      wrapper.find('button').simulate('click')
      expect(moveToBoxSpy).toHaveBeenCalled()
    })
  })

})
