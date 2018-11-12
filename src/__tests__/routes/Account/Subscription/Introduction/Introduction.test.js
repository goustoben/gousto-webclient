import sinon from 'sinon'

import React from 'react'
import { shallow } from 'enzyme'
import Introduction from 'routes/Account/Subscription/Introduction'

describe('Introduction', () => {
  describe('rendering', () => {
    let wrapper

    beforeEach(() => {
      wrapper = shallow(<Introduction />)
    })

    test('should render a <div>', () => {
      expect(wrapper.type()).toEqual('div')
    })
  })
})
