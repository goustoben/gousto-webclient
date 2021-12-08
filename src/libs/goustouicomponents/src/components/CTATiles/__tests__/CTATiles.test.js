import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
import { CTATiles } from '..'
import { CTATilesItem } from '../../CTATilesItem'

describe('<CTATiles />', () => {
  let wrapper

  const CHILDREN = [
    {
      content: 'Click me!',
      url: 'https://example.com',
    },
    {
      content: 'No, click me!',
      url: 'https://example2.com',
    },
    {
      content: 'Forget about the other two, click me!',
      url: 'https://example3.com',
    },
  ]

  const renderCTATiles = () => (
    <CTATiles>
      {
        CHILDREN.map((item) => <CTATilesItem key={item.url} url={item.url}>{item.content}</CTATilesItem>)
      }
    </CTATiles>
  )

  beforeEach(() => {
    wrapper = mount(renderCTATiles())
  })

  test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(renderCTATiles(), div)
  })

  test('wraps each child in a navigation item', () => {
    wrapper.find('li').forEach((listItem) => {
      expect(listItem.find('CTATilesItem').exists()).toBe(true)
    })
  })
})
