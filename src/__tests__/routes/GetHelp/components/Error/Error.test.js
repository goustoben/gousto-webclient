import React from 'react'
import { mount } from 'enzyme'

import { Error } from 'routes/GetHelp/components/Error'
import { client as routes } from 'config/routes'

describe('<Error />', () => {
  describe('rendering', () => {
    const content = {
      button1: 'test button',
      errorBody: 'test error body message',
      infoBody: '',
      title: 'test title',
    }

    test('error component renders when an error is present', () => {
      const wrapper = mount(
				<Error hasError content={content}>
					<div className="test" />
				</Error>
      )

      expect(wrapper.contains(<div className="test" />)).toBe(false)
      expect(wrapper.find('GetHelpLayout')).toHaveLength(1)
    })

    test('dynamic content is being set', () => {
      const wrapper = mount(
				<Error hasError content={content}>
					<div className="test" />
				</Error>
      )

      const getHelpLayout = wrapper.find('GetHelpLayout')
      const BottomBar = getHelpLayout.find('BottomBar')

      expect(getHelpLayout.prop('title')).toBe('test title')
      expect(BottomBar.find('BottomButton').prop('children')).toBe('test button')
      expect(BottomBar.find('BottomButton').prop('url')).toBe(
        `${routes.getHelp.index}/${routes.getHelp.contact}`
      )
      expect(
        getHelpLayout
          .find('.bodyContent')
          .containsAnyMatchingElements([<p>test error body message</p>])
      ).toBe(true)

    })

    test('error component renders the children when no error', () => {
      const wrapper = mount(
				<Error hasError={false} content={content}>
					<div className="test" />
				</Error>
      )

      expect(wrapper.contains(<div className="test" />)).toBe(true)
      expect(wrapper.find('GetHelpLayout')).toHaveLength(0)
    })
  })
})
