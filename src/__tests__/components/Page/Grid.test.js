import React from 'react'
import { shallow } from 'enzyme'

import sinon from 'sinon'

import { Col, Row } from 'Page/Grid'

describe('Page Grid', () => {
  let wrapper

  describe('Col rendering', () => {
    beforeEach(() => {
      wrapper = shallow(
				<Col
				  disabled
				  data-tracking={1}
				  aria-something="2"
				  type="something"
				  b
				/>,
      )
    })

    test('should return a <div>', () => {
      expect(wrapper.type()).toEqual('div')
    })

    test('should pass on all supported props', () => {
      expect(wrapper.prop('disabled')).toEqual(true)
      expect(wrapper.prop('data-tracking')).toEqual(1)
      expect(wrapper.prop('aria-something')).toEqual('2')
      expect(wrapper.prop('b')).toEqual(undefined)
    })
  })

  describe('Row rendering', () => {
    beforeEach(() => {
      wrapper = shallow(
				<Row
				  disabled
				  data-tracking={1}
				  aria-something="2"
				  type="something"
				  b
				/>,
      )
    })

    test('should return a <div>', () => {
      expect(wrapper.type()).toEqual('div')
    })

    test('should add row class', () => {
      expect(wrapper.prop('className')).toContain('row')
    })

    test('should pass on all supported props', () => {
      expect(wrapper.prop('disabled')).toEqual(true)
      expect(wrapper.prop('data-tracking')).toEqual(1)
      expect(wrapper.prop('aria-something')).toEqual('2')
      expect(wrapper.prop('b')).toEqual(undefined)
    })
  })
})
