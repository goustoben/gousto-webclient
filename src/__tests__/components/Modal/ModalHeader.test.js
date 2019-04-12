import React from 'react'
import { shallow } from 'enzyme'

import ModalHeader from 'components/Modal/ModalHeader'

describe('ModalHeader', () => {
  let wrapper

  test('should render a <h2>', () => {
    wrapper = shallow(<ModalHeader />)

    expect(wrapper.find('h2')).toHaveLength(1)
  })

  test('should render children', () => {
    wrapper = shallow(
      <ModalHeader>
        <p>Test ModalHeader...</p>
      </ModalHeader>,
    )

    expect(wrapper.find('p')).toHaveLength(1)
    expect(wrapper.find('p').text()).toBe('Test ModalHeader...')
  })
})
