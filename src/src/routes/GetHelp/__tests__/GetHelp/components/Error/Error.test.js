import React from 'react'
import { mount } from 'enzyme'

import { Error } from 'routes/GetHelp/components/Error'
import { client as routes } from 'config/routes'

describe('<Error />', () => {
  let wrapper
  const content = {
    button1: 'test button',
    errorBody: 'test error body message',
    title: 'test title',
  }

  beforeEach(() => {
    wrapper = mount(<Error />)
  })

  test('renders without crashing', () => {})

  test('has the url of the button set to contact page', () => {
    expect(wrapper.find('BottomButton').prop('url')).toBe(`${routes.getHelp.index}/${routes.getHelp.contact}`)
  })

  describe('when the content is passed dynamically', () => {
    beforeEach(() => {
      wrapper.setProps({ content })
    })

    test('passes the title to GetHelpLayout component', () => {
      expect(wrapper.find('GetHelpLayout').prop('title')).toBe(content.title)
    })

    test('renders the errorBody', () => {
      expect(wrapper.text()).toContain(content.errorBody)
    })

    test('renders the button1 content as text of the button', () => {
      expect(wrapper.find('BottomButton').text()).toBe(content.button1)
    })
  })
})
