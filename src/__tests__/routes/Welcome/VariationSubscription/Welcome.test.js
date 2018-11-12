import sinon from 'sinon'

import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable' /* eslint-disable new-cap */

import Welcome from 'routes/Welcome/VariationSubscription/Welcome'
import SubHeader from 'routes/Welcome/SubHeader'

describe('Welcome Page', () => {
  describe('rendering', () => {
    let wrapper
    beforeEach(() => {
      wrapper = shallow(<Welcome user={Immutable.Map()} />)
    })

    test('should return section', () => {
      expect(wrapper.type()).toEqual('section')
    })

    test('should render 1 Welcome SubHeader', () => {
      expect(wrapper.find(SubHeader).length).toEqual(1)
    })
  })
})
