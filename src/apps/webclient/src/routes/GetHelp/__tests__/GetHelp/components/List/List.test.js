import React from 'react'
import { mount } from 'enzyme'

import { List } from 'routes/GetHelp/components/List'

describe('<List />', () => {
  const ChildComponent = () => (<div>Test child</div>)
  const wrapper = mount(
    <List>
      <ChildComponent />
      <ChildComponent />
    </List>
  )

  test('list component renders correctly', () => {
    expect(wrapper.find('ul')).toHaveLength(1)
    expect(wrapper.find('li')).toHaveLength(2)
    expect(wrapper.find(ChildComponent)).toHaveLength(2)
  })
})
