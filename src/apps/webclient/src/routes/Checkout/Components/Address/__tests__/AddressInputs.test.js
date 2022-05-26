import React from 'react'

import { shallow } from 'enzyme'
import { Field } from 'redux-form'

import { AddressInputs } from 'routes/Checkout/Components/Address/AddressInputs'

describe('AddressInputs', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<AddressInputs />)
  })

  describe('rendering', () => {
    test('should render 3 Field component', () => {
      expect(wrapper.find(Field)).toHaveLength(3)
    })
  })
})
