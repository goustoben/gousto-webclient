import React from 'react'
import { browserHistory } from 'react-router'
import { mount } from 'enzyme'
import { IngredientReasons } from 'routes/GetHelp/IngredientReasons/IngredientReasons.logic'

describe('<IngredientReasons />', () => {
  const content = {
    title: 'test title',
    body: 'text...',
    secondBody: 'second body',
    button1Copy: 'Done',
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
  const trackIngredientReasonsConfirmed = jest.fn()

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
      const BottomBar = getHelpLayout.find('BottomFixedContentWrapper')

      expect(getHelpLayout).toHaveLength(1)
      expect(BottomBar).toHaveLength(1)
      expect(BottomBar.find('Button')).toHaveLength(1)
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

    test('bottom bar button is rendering correctly', () => {
      const BottomBar = getHelpLayout.find('BottomFixedContentWrapper')

      expect(BottomBar.find('Button').text()).toContain(content.button1Copy)
    })

    test('submit button is disable when there no description set', () => {
      const Button = getHelpLayout.find('Button')

      expect(Button.prop('disabled')).toBe(true)
      expect(Button.text()).toContain(content.button1Copy)
    })
  })

  describe('behaviour', () => {
    beforeEach(() => {
      browserHistory.push = jest.fn()
      wrapper = mount(
        <IngredientReasons
          content={content}
          ingredientsAndIssues={ingredientsAndIssues}
          storeIngredientIssueDescriptions={storeSelectedIngredientIssueSpy}
          trackIngredientReasonsConfirmed={trackIngredientReasonsConfirmed}
        />
      )
      getHelpLayout = wrapper.find('GetHelpLayout')
    })

    test('submit button is enabled when all descriptions are filled', async () => {
      const issueDetails = wrapper.find('div.issueDetails')
      const textarea1 = issueDetails.at(0).find('textarea')
      const textarea2 = issueDetails.at(1).find('textarea')
      await textarea1.simulate(
        'change', { target: { value: 'This is my issue...' } }
      )
      await textarea2.simulate(
        'change', { target: { value: 'Another description...' } }
      )
      const Button = wrapper.find('Button')

      expect(textarea1.text()).toBe('This is my issue...')
      expect(textarea2.text()).toBe('Another description...')
      expect(Button.prop('disabled')).toBe(false)
      expect(Button.text()).toContain(content.button1Copy)
    })

    test('submit button is disabled if some description becomes less than 1 character', () => {
      const Button = getHelpLayout.find('Button')
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

      expect(Button.prop('disabled')).toBe(true)
    })

    describe('When submit details button is clicked', () => {
      beforeEach(() => {
        const issueDetails = getHelpLayout.find('div.issueDetails')
        const textarea1 = issueDetails.at(0).find('textarea')
        const textarea2 = issueDetails.at(1).find('textarea')
        const Button = getHelpLayout.find('Button')

        textarea1.simulate(
          'change', { target: { value: 'This is my issue...' } }
        )
        textarea2.simulate(
          'change', { target: { value: 'And this is my other issue...' } }
        )

        Button.props().onClick()
      })

      test('action being called with issue ids and issue descriptions', () => {
        const expectedIssueReasons = {
          '1917-bbb': {
            ingredientId: 'bbb',
            issueDescription: 'This is my issue...',
            issueId: '101',
            issueName: 'Missing ingredients',
            label: '1 can of chopped tomatoes (210g)',
            recipeId: '1917'
          },
          '1494-bbb': {
            ingredientId: 'bbb',
            issueDescription: 'And this is my other issue...',
            issueId: '104',
            issueName: 'Fruit or Veg - Mouldy',
            label: '1 can of chopped tomatoes (210g)',
            recipeId: '1494'
          }
        }

        expect(storeSelectedIngredientIssueSpy).toHaveBeenCalledWith(expectedIssueReasons)
      })

      test('trackIngredientReasonsConfirmed is called with the correct data', () => {
        const INGREDIENTS_TRACKING_DATA = [
          {
            ingredient_name: '1 can of chopped tomatoes (210g)',
            recipe_id: '1917'
          },
          {
            ingredient_name: '1 can of chopped tomatoes (210g)',
            recipe_id: '1494'
          }
        ]

        expect(trackIngredientReasonsConfirmed).toHaveBeenCalledWith(INGREDIENTS_TRACKING_DATA)
      })

      test('I am redirected to the auto accept check page', () => {
        expect(browserHistory.push).toHaveBeenCalledWith('/get-help/auto-check')
      })
    })
  })
})
