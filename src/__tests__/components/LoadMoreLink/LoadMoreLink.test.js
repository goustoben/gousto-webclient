import React from 'react'
import { shallow } from 'enzyme'

import sinon from 'sinon'

import { Div, Span } from 'Page/Elements'
import Icon from 'Icon'
import Link from 'Link'
import LoadMoreLink from 'LoadMoreLink'

describe('LoadMoreLink', () => {
  describe('rendering', () => {
    let wrapper

    beforeEach(() => {
      wrapper = shallow(<LoadMoreLink />)
    })

    test('should return a Div', () => {
      expect(wrapper.type()).toEqual(Div)
    })

    test('should contain 1 Link', () => {
      expect(wrapper.children(Link).length).toEqual(1)
    })

    test('should contain 1 Span in Link', () => {
      expect(wrapper.children(Link).children(Span).length).toEqual(1)
    })

    test('should contain 1 Div in Span', () => {
      expect(
        wrapper
          .children(Link)
          .children(Span)
          .children(Div).length,
      ).toEqual(1)
    })

    test('should render children in child Div', () => {
      const child = <p>Child Text</p>
      wrapper = shallow(<LoadMoreLink>{child}</LoadMoreLink>)
      expect(
        wrapper
          .children(Link)
          .children(Span)
          .children(Div)
          .prop('children'),
      ).toEqual(child)
    })

    test('should contain 1 "fa-angle-down" Icon in Span', () => {
      const icon = wrapper
        .children(Link)
        .children(Span)
        .children(Icon)
      expect(icon.length).toEqual(1)
      expect(icon.prop('name')).toEqual('fa-angle-down')
    })
  })
})
