import React from 'react'

import sinon from 'sinon'

import { shallow } from 'enzyme'
import Immutable from 'immutable' /* eslint-disable new-cap */
import Attributes from 'Product/Attributes'

describe('Product Attributes', () => {
  let wrapper
  let attributes

  beforeEach(() => {
    attributes = Immutable.fromJS([
      { title: 'Allergens', value: 'Gluten, Soy', unit: null },
      { title: 'Volume', value: 261, unit: 'ml' },
    ])

    wrapper = shallow(<Attributes attributes={attributes} />)
  })

  test('should return ul', () => {
    expect(wrapper.type()).toEqual('ul')
  })

  test('should contain 1 li per attibute', () => {
    expect(wrapper.find('li').length).toEqual(2)
  })
})
