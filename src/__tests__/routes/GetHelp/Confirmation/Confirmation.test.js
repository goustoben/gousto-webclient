import React from 'react'
import { mount } from 'enzyme'

import { client as routes } from 'config/routes'
import Confirmation from 'routes/GetHelp/Confirmation/Confirmation'

describe('<Confirmation />', () => {
  const content = {
    title: 'title test',
    button1: 'button 1 test',
    button2: 'button 2 test',
    confirmationBody: 'body test',
  }
  const wrapper = mount(
    <Confirmation
      content={content}
    />
  )
  const getHelpLayout = wrapper.find('GetHelpLayout')
  const BottomBar = getHelpLayout.find('BottomBar')
  const Button1 = BottomBar.find('BottomButton').at(0)
  const Button2 = BottomBar.find('BottomButton').at(1)

  describe('rendering', () => {
    test('header is rendering correctly', () => {
      expect(getHelpLayout.prop('title')).toBe(content.title)
    })

    test('bottom bar buttons are rendering correctly', () => {
      expect(Button1.text()).toBe(content.button1)
      expect(Button2.text()).toBe(content.button2)
    })

    test('body is rendering correctly', () => {
      expect(getHelpLayout).toHaveLength(1)
      expect(getHelpLayout.prop('body')).toContain(content.confirmationBody)
    })

    test('View My Details button points to /my-details', () => {
      const linkTo = Button1.prop('url')

      expect(linkTo).toContain(routes.myDetails)
    })

    test('Done button points to /my-gousto', () => {
      const linkTo = Button2.prop('url')

      expect(linkTo).toContain(routes.myGousto)
    })
  })
})
