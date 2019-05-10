import React from 'react'
import { shallow } from 'enzyme'

import AppStoreLinks from 'Footer/AppStoreLinks'

describe('<AppStoreLinks />', () => {
  test('should return a <div>', () => {
    const wrapper = shallow(<AppStoreLinks />)
    expect(wrapper.type()).toEqual('div')
  })

  test('should inject the specified app store IDs into the markup', () => {
    const wrapper = shallow(
      <AppStoreLinks appStoreId="12345" playStoreId="67890" />,
    )
    expect(
      wrapper
        .find('a')
        .get(0)
        .props.href.includes('id=67890'),
    ).toBe(true)
    expect(
      wrapper
        .find('a')
        .get(1)
        .props.href.includes('id12345'),
    ).toBe(true)
  })
})
