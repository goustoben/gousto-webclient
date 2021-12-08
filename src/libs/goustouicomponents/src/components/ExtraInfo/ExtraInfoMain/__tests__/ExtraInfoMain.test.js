import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
import { ExtraInfoMain } from '../ExtraInfoMain.logic'

describe('ExtraInfoMain', () => {
  let wrapper
  const CONTENT = <div>This is some content</div>

  beforeEach(() => {
    wrapper = mount(<ExtraInfoMain>{CONTENT}</ExtraInfoMain>)
  })

  test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<ExtraInfoMain>{CONTENT}</ExtraInfoMain>, div)
  })

  test('renders the content wrapper', () => {
    expect(wrapper.find('.mainWrapper').exists()).toBe(true)
  })

  test('renders the content inside the wrapper', () => {
    expect(wrapper.find('.mainWrapper').contains(CONTENT)).toBe(true)
  })
})
