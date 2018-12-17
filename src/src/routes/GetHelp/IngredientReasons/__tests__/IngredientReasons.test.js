import React from 'react'
import { mount } from 'enzyme'
import { IngredientReasons } from 'routes/GetHelp/IngredientReasons/IngredientReasons.logic'

describe('<IngredientReasons />', () => {
  const content = {
    title: 'test title',
    body: 'text...',
    secondBody: 'second body',
    button1Copy: 'Back',
    button2Copy: 'Done',
  }
  let wrapper
  let getHelpLayout

  describe('rendering', () => {
    beforeAll(() => {
      wrapper = mount(
        <IngredientReasons
          content={content}
        />
      )
      getHelpLayout = wrapper.find('GetHelpLayout')
    })

    test('layout is rendering correctly', () => {
      const BottomBar = getHelpLayout.find('BottomBar')

      expect(getHelpLayout).toHaveLength(1)
      expect(BottomBar).toHaveLength(1)
      expect(BottomBar.find('Button')).toHaveLength(2)
    })

    test('header is rendering correctly', () => {
      expect(getHelpLayout.prop('title')).toBe(content.title)
    })

    test('body description is redering correctly', () => {
      expect(getHelpLayout.prop('body')).toBe(content.body)
    })

    test('second body description is redering correctly', () => {
      expect(getHelpLayout.find('p').at(1).text()).toBe('second body')
    })

    test('bottom bar buttons is rendering correctly', () => {
      const BottomBar = getHelpLayout.find('BottomBar')
      const buttons = BottomBar.find('Button')

      expect(buttons.at(0).text()).toContain(content.button1Copy)
      expect(buttons.at(1).text()).toContain(content.button2Copy)
    })

    test('buttons link to correct urls', () => {
      const Button1 = getHelpLayout.find('BottomButton').at(0)
      const Button2 = getHelpLayout.find('BottomButton').at(1)

      expect(Button1.prop('url')).toBe('/get-help/ingredient-issues')
      expect(Button2.prop('url')).toBe('/get-help/refund')
    })
  })

  describe('behaviour', () => {})
})
