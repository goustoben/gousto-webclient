import sinon from 'sinon'

import React from 'react'
import { shallow } from 'enzyme'
import MyGousto from 'routes/Account/MyGousto/MyGousto'

describe('MyGousto', () => {
  describe('rendering', () => {
    let wrapper

    beforeEach(() => {
      wrapper = shallow(<MyGousto />)
    })

    test('should render a <div> with no props', () => {
      expect(wrapper.type()).toEqual('div')
    })
  })
})
