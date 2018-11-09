import sinon from 'sinon'

import React from 'react'
import { shallow } from 'enzyme'

import ModuleHeader from 'components/ModuleHeader'

describe('ModuleHeader', () => {
  let wrapper

  test('should render a <h2>', () => {
    wrapper = shallow(<ModuleHeader />)

    expect(wrapper.find('h2')).toHaveLength(1)
  })

  test('should render a <h2>', () => {
    wrapper = shallow(<ModuleHeader>Test ModuleHeader...</ModuleHeader>)

    expect(wrapper.find('h2').text()).toBe('Test ModuleHeader...')
  })
})
