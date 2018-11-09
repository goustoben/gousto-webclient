import React from 'react'
import { shallow } from 'enzyme'

import sinon from 'sinon'

import ProgressBar from 'ProgressBar'
import css from 'ProgressBar/ProgressBar.css'
import Icon from 'Icon'
import { Div, Li, Span, Ul } from 'Page/Elements'

describe('ProgressBar', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(
			<ProgressBar
			  currentId="item-2"
			  items={[
			    { id: 'item-1', label: 'Item 1 Label' },
			    { id: 'item-2', label: 'Item 2 Label' },
			    { id: 'item-3', label: 'Item 3 Label' },
			  ]}
			/>,
    )
  })

  describe('rendering', () => {
    test('should return null by default', () => {
      expect(shallow(<ProgressBar />).type()).toBe(null)
    })

    test('should return <Ul> if there are items', () => {
      expect(wrapper.type()).toBe(Ul)
    })

    test('should have one <Li> per item', () => {
      expect(wrapper.children(Li)).toHaveLength(3)
    })

    test('should contain 2 <Div>s per <Li>', () => {
      const content = wrapper.children(Li)

      content.forEach(function(contentItem) {
        expect(contentItem.children(Div)).toHaveLength(2)
      })
    })

    test('should contain 2 <Span>s in 1st <Div> for each item', () => {
      const content = wrapper.children(Li)

      content.forEach(function(contentItem) {
        expect(
          contentItem
            .children(Div)
            .at(0)
            .children(Span),
        ).toHaveLength(2)
      })
    })

    test('should contain 1 check mark <Icon> instead of number for past items', () => {
      const content = wrapper
        .children(Li)
        .at(0)
        .children(Div)
        .at(0)
        .children(Span)
        .at(0)
        .children()

      expect(content).toHaveLength(1)
      expect(content.type()).toBe(Icon)
      expect(content.prop('name')).toBe('fa-check')
    })

    test('should display item number in 1st <Span> for each non-past item', () => {
      const content = wrapper.children(Li)

      expect(
        content
          .at(1)
          .children(Div)
          .at(0)
          .children(Span)
          .at(0)
          .children()
          .text(),
      ).toBe('2')

      expect(
        content
          .at(2)
          .children(Div)
          .at(0)
          .children(Span)
          .at(0)
          .children()
          .text(),
      ).toBe('3')
    })

    test('should display item label in 2nd <Span> for each item', () => {
      const content = wrapper.children(Li)

      expect(
        content
          .at(0)
          .children(Div)
          .at(0)
          .children(Span)
          .at(1)
          .children()
          .text(),
      ).toBe('Item 1 Label')

      expect(
        content
          .at(1)
          .children(Div)
          .at(0)
          .children(Span)
          .at(1)
          .children()
          .text(),
      ).toBe('Item 2 Label')

      expect(
        content
          .at(2)
          .children(Div)
          .at(0)
          .children(Span)
          .at(1)
          .children()
          .text(),
      ).toBe('Item 3 Label')
    })

    test('should contain className arrow in 2nd <Div> for each item ', () => {
      const content = wrapper.children(Li)

      content.forEach(function(contentItem) {
        expect(
          contentItem
            .children(Div)
            .at(1)
            .prop('className'),
        ).toContain(css.arrow)
      })
    })
  })
})
