import React from 'react'
import { mount } from 'enzyme'

import { Divider } from '../Divider'

let wrapper

const mountWithProps = (props) => {
  wrapper = mount(<Divider {...props} />)
}

describe('Divider', () => {
  describe('Given hidden prop is not passed', () => {
    beforeEach(() => {
      mountWithProps()
    })

    test('Then no visibility classes are implemented', () => {
      expect(wrapper.find('hr').prop('className')).toEqual('divider')
    })
  })

  describe('Given hidden prop is passed', () => {
    beforeEach(() => {
      mountWithProps({ hidden: ['md', 'xl'] })
    })

    test('Then the expected visibility classes are implemented', () => {
      expect(wrapper.find('hr').prop('className')).toEqual('divider hidden-md hidden-xl')
    })
  })
})
