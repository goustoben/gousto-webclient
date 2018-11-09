import sinon from 'sinon'

import React from 'react'
import { shallow } from 'enzyme'
import Referral from 'routes/Account/Referral/Referral'

describe('Referral', () => {
  describe('rendering', () => {
    let wrapper

    beforeEach(() => {
      wrapper = shallow(<Referral />)
    })

    test('should render a <div> with no props', () => {
      expect(wrapper.type()).toEqual('div')
    })
  })
})
