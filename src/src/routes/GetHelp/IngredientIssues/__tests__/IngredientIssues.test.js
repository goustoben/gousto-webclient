import React from 'react'
import { mount } from 'enzyme'

import { IngredientIssues } from 'routes/GetHelp/IngredientIssues/IngredientIssues.logic'

describe('<IngredientIssues />', () => {
  const content = {
    title: 'test title',
    body: 'text...',
    button1Copy: 'Back',
    button2Copy: 'Done',
  }
  let wrapper
  let getHelpLayout

  beforeEach(() => {
    wrapper = mount(
      <IngredientIssues
        content={content}
      />
    )
    getHelpLayout = wrapper.find('GetHelpLayout')
  })

  describe('render', () => {
    test('layout is rendering correctly', () => {
      const BottomBar = getHelpLayout.find('BottomBar')

      expect(getHelpLayout).toHaveLength(1)
      expect(BottomBar).toHaveLength(1)
      expect(BottomBar.find('BottomButton')).toHaveLength(2)

    })

    test('header is rendering correctly', () => {
      expect(getHelpLayout.prop('title')).toBe(content.title)
    })

    test('body description is redering correctly', () => {
      expect(getHelpLayout.prop('body')).toBe(content.body)
    })

    test('bottom bar buttons is rendering correctly', () => {
      const BottomBar = getHelpLayout.find('BottomBar')
      const Button1 = BottomBar.find('BottomButton').at(0)
      const Button2 = BottomBar.find('BottomButton').at(1)

      expect(Button1.text()).toContain(content.button1Copy)
      expect(Button2.text()).toContain(content.button2Copy)
    })

    test('buttons link to correct urls', () => {
      const BottomBar = getHelpLayout.find('BottomBar')
      const Button1 = BottomBar.find('BottomButton').at(0)
      const Button2 = BottomBar.find('BottomButton').at(1)

      expect(Button1.prop('url')).toBe('/get-help/ingredients')
      expect(Button2.prop('url')).toBe('/get-help/refund')
    })
  })
})
