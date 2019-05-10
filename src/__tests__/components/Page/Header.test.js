import React from 'react'
import { shallow } from 'enzyme'

import sinon from 'sinon'

import { H1, H2, H3 } from 'Page/Header'

describe('Header', () => {
  let wrapper

  describe('h1 rendering', () => {
    test('should return a <h1>', () => {
      wrapper = shallow(<H1 />)
      expect(wrapper.type()).toEqual('h1')

      const wrapper2 = shallow(<H1 type="h5" />)
      expect(wrapper2.type()).toEqual('h1')
    })

    test('should return children', () => {
      wrapper = shallow(
        <H1>
          <p>I'm a paragraph</p>
        </H1>,
      )
      expect(wrapper.find('p').length).toEqual(1)
    })
  })

  describe('h2 rendering', () => {
    test('should return a <h2>', () => {
      wrapper = shallow(<H2 />)
      expect(wrapper.type()).toEqual('h2')

      const wrapper2 = shallow(<H2 type="h5" />)
      expect(wrapper2.type()).toEqual('h2')
    })
    test('should return children', () => {
      wrapper = shallow(
        <H2>
          <p>I'm a paragraph</p>
        </H2>,
      )
      expect(wrapper.find('p').length).toEqual(1)
    })
  })

  describe('h3 rendering', () => {
    test('should return a <h3>', () => {
      wrapper = shallow(<H3 />)
      expect(wrapper.type()).toEqual('h3')

      const wrapper2 = shallow(<H3 type="h5" />)
      expect(wrapper2.type()).toEqual('h3')
    })

    test('should return children', () => {
      wrapper = shallow(
        <H3>
          <p>I'm a paragraph</p>
        </H3>,
      )
      expect(wrapper.find('p').length).toEqual(1)
    })
  })
})
