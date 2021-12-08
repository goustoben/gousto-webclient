import React from 'react'
import { mount } from 'enzyme'

import { Item } from '../../Item'
import { ItemExpandable } from '..'

describe('<ItemExpandable />', () => {
  const ChildComponent = () => (<div>Test child</div>)
  let wrapper

  beforeEach(() => {
    wrapper = mount(
      <ItemExpandable label="item-label">
        <ChildComponent />
        <ChildComponent />
      </ItemExpandable>,
    )
  })

  describe('rendering', () => {
    test('an Item is rendered with the passed label', () => {
      expect(wrapper.find(Item).text()).toContain('item-label')
    })

    test('by default, indicates to Item that the arrow must be not in the expanded state', () => {
      expect(wrapper.find(Item).prop('isExpanded')).toBe(false)
    })

    test('label is rendered without the Heading', () => {
      expect(wrapper.find('Heading').exists()).toBe(false)
    })

    test('the trackClick function is passed to the Item', () => {
      const trackFn = jest.fn()

      const itemExpandable = mount(
        <ItemExpandable
          label="item-label"
          to="/test" // TODO check
          trackClick={trackFn}
        >
          <ChildComponent />
        </ItemExpandable>,
      )

      itemExpandable.find(Item).simulate('click')

      expect(trackFn).toHaveBeenCalledTimes(1)
    })

    test('the isHiddenOnMobile value is passed to the Item', () => {
      let itemExpandable = mount(
        <ItemExpandable
          label="item-label"
          isHiddenOnMobile
        >
          <ChildComponent />
        </ItemExpandable>,
      )

      expect(itemExpandable.find(Item).prop('isHiddenOnMobile')).toBe(true)

      itemExpandable = mount(
        <ItemExpandable
          label="item-label"
          isHiddenOnMobile={false}
        >
          <ChildComponent />
        </ItemExpandable>,
      )

      expect(itemExpandable.find(Item).prop('isHiddenOnMobile')).toBe(false)
    })

    describe('when the isLabelHeading is passed', () => {
      describe('and it is set to true', () => {
        beforeEach(() => {
          wrapper.setProps({ isLabelHeading: true })
        })

        test('label is rendered inside the Heading', () => {
          expect(wrapper.find('Heading').exists()).toBe(true)
        })
      })

      describe('and it is set to false', () => {
        beforeEach(() => {
          wrapper.setProps({ isLabelHeading: false })
        })

        test('label is rendered without the Heading', () => {
          expect(wrapper.find('Heading').exists()).toBe(false)
        })
      })
    })
  })

  describe('behaviour', () => {
    test('when clicking the children are shown, if clicked again it is hidden', () => {
      wrapper.find('Item').simulate('click')

      expect(wrapper.find(ChildComponent)).toHaveLength(2)

      wrapper.find('Item').simulate('click')

      expect(wrapper.find(ChildComponent)).toHaveLength(0)
    })

    test('clicking the body doees not collapse it', () => {
      wrapper.find('Item').simulate('click')
      wrapper.find(ChildComponent).at(0).simulate('click')

      expect(wrapper.find(ChildComponent)).toHaveLength(2)
    })
  })
})
