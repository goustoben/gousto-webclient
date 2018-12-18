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
  const ingredientsAndIssues = {
    '1917-bbb': {
      recipeId: '1917',
      ingredientId: 'bbb',
      label: '1 can of chopped tomatoes (210g)',
      issueId: '101',
      issueName: 'Missing ingredients',
    },
    '1494-bbb': {
      recipeId: '1494',
      ingredientId: 'bbb',
      label: '1 can of chopped tomatoes (210g)',
      issueId: '104',
      issueName: 'Fruit or Veg - Mouldy',
    },
  }
  let wrapper
  let getHelpLayout
  const storeSelectedIngredientIssueSpy = jest.fn()

  beforeAll(() => {
    wrapper = mount(
      <IngredientReasons
        content={content}
        ingredientsAndIssues={ingredientsAndIssues}
        storeIngredientIssueDescriptions={storeSelectedIngredientIssueSpy}
      />
    )
    getHelpLayout = wrapper.find('GetHelpLayout')
  })

  describe('rendering', () => {
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

    test('selected ingredients and issues are rendering', () => {
      const issueDetails = getHelpLayout.find('div.issueDetails')

      expect(issueDetails).toHaveLength(2)
      expect(issueDetails.at(0).text()).toContain('Missing ingredients - 1 can of chopped tomatoes (210g)')
      expect(issueDetails.at(1).text()).toContain('Fruit or Veg - Mouldy - 1 can of chopped tomatoes (210g)')
    })

    test('selected ingredients and issues corresponding textboxes are rendering with correct id', () => {
      const issueDetails = getHelpLayout.find('div.issueDetails')

      expect(issueDetails.at(0).find('textarea').prop('id')).toBe('1917-bbb')
      expect(issueDetails.at(1).find('textarea').prop('id')).toBe('1494-bbb')
    })

    test('bottom bar buttons is rendering correctly', () => {
      const BottomBar = getHelpLayout.find('BottomBar')
      const buttons = BottomBar.find('Button')

      expect(buttons.at(0).text()).toContain(content.button1Copy)
      expect(buttons.at(1).text()).toContain(content.button2Copy)
    })

    test('buttons link to correct urls', () => {
      const Button1 = getHelpLayout.find('BottomButton').at(0)

      expect(Button1.prop('url')).toBe('/get-help/ingredient-issues')
    })

    test('submit button is disable when there no description set', () => {
      const Button2 = getHelpLayout.find('Button').at(1)

      expect(Button2.prop('disabled')).toBe(true)
      expect(Button2.text()).toContain(content.button2Copy)
    })
  })

  describe('behaviour', () => {
    test('submit button is enabled when all descriptions are filled', () => {
      const Button2 = getHelpLayout.find('Button').at(1)
      const issueDetails = getHelpLayout.find('div.issueDetails')
      const textarea1 = issueDetails.at(0).find('textarea')
      const textarea2 = issueDetails.at(1).find('textarea')

      textarea1.simulate(
        'change', { target: { value: 'This is my issue...' } }
      )
      textarea2.simulate(
        'change', { target: { value: 'Another description...' } }
      )

      expect(textarea1.text()).toBe('This is my issue...')
      expect(textarea2.text()).toBe('Another description...')
      expect(Button2.prop('disabled')).toBe(false)
      expect(Button2.text()).toContain(content.button2Copy)
    })

    test('submit button is disabled if some description becomes less than 1 character', () => {
      const Button2 = getHelpLayout.find('Button').at(1)
      const issueDetails = getHelpLayout.find('div.issueDetails')
      const textarea1 = issueDetails.at(0).find('textarea')
      const textarea2 = issueDetails.at(1).find('textarea')

      textarea1.simulate(
        'change', { target: { value: 'This is my issue...' } }
      )
      textarea2.simulate(
        'change', { target: { value: 'Another description...' } }
      )
      textarea1.simulate(
        'change', { target: { value: '' } }
      )

      expect(Button2.prop('disabled')).toBe(true)
    })

    test('action being called with issue ids and issue descriptions when submit button is clicked', () => {
      const expectedIssueReasons = {
        '1917-bbb': {
          'ingredientId': 'bbb',
          'issueDescription': 'This is my issue...',
          'issueId': '101',
          'issueName': 'Missing ingredients',
          'label': '1 can of chopped tomatoes (210g)',
          'recipeId': '1917'
        },
        '1494-bbb': {
          'ingredientId': 'bbb',
          'issueDescription': 'And this is my other issue...',
          'issueId': '104',
          'issueName': 'Fruit or Veg - Mouldy',
          'label': '1 can of chopped tomatoes (210g)',
          'recipeId': '1494'
        }
      }
      const issueDetails = getHelpLayout.find('div.issueDetails')
      const textarea1 = issueDetails.at(0).find('textarea')
      const textarea2 = issueDetails.at(1).find('textarea')
      const Button2 = getHelpLayout.find('Button').at(1)

      textarea1.simulate(
        'change', { target: { value: 'This is my issue...' } }
      )
      textarea2.simulate(
        'change', { target: { value: 'And this is my other issue...' } }
      )

      Button2.props().onClick()

      expect(storeSelectedIngredientIssueSpy).toHaveBeenCalledWith(expectedIssueReasons)
    })
  })
})
