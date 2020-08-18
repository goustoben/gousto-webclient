import React from 'react'
import { mount } from 'enzyme'
import { browserHistory } from 'react-router'
import { IngredientIssues } from 'routes/GetHelp/IngredientIssues/IngredientIssues.logic'

describe('<IngredientIssues />', () => {
  const content = {
    title: 'test title',
    body: 'text...',
    button1Copy: 'Back',
    button2Copy: 'Done',
  }
  const ingredients = {
    'recipId1-ingId1': {
      recipeId: 'recipId1',
      ingredientId: 'ingId1',
      label: 'ingLabel1'
    },
    'recipId2-ingId1': {
      recipeId: 'recipId2',
      ingredientId: 'ingId1',
      label: 'ingLabel2'
    },
  }
  const issues = [
    {
      id: '101',
      label: 'Missing ingredients',
      requireDescription: false,
    },
    {
      id: '102',
      label: 'Wrong ingredients',
      requireDescription: false,
    },
  ]
  const subIssues = [
    {
      id: '104',
      label: 'Fruit or Veg - Mouldy',
      groupLabel: 'Ingredient quality',
      requireDescription: true,
    },
    {
      id: '105',
      label: 'Fruit or Veg - not fresh',
      groupLabel: 'Ingredient quality',
      requireDescription: false,
    },
    {
      id: '107',
      label: 'Meat - gristle or bones',
      groupLabel: 'Another group',
      requireDescription: true,
    },
  ]
  const selectedIngredients = {
    '1010-1234': {
      recipeId: '1010',
      ingredientId: '1234',
      issueName: 'issue name 1',
    },
    '2020-1234': {
      recipeId: '2020',
      ingredientId: '1234',
      issueName: 'issue name 2',
    },
  }

  describe('render', () => {
    const wrapper = mount(
      <IngredientIssues
        content={content}
        ingredients={ingredients}
        fetchIngredientIssues={() => {}}
        issues={issues}
        storeSelectedIngredientIssue={() => {}}
        selectedIngredients={selectedIngredients}
        trackIngredientIssues={() => {}}
        subIssues={subIssues}
      />
    )
    const getHelpLayout = wrapper.find('GetHelpLayout')

    test('layout is rendering correctly', () => {
      const BottomBar = getHelpLayout.find('BottomFixedContentWrapper')

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

    test('ingredients are rendering', () => {
      expect(getHelpLayout.text()).toContain('ingLabel1')
      expect(getHelpLayout.text()).toContain('ingLabel2')
    })

    test('dropdowns for each ingredient are rendering', () => {
      const selects = getHelpLayout.find('select')

      const options1 = selects.at(0).find('option')
      const options2 = selects.at(1).find('option')
      const group11 = selects.at(0).find('.groupOptionItem').at(0)
      const group12 = selects.at(0).find('.groupOptionItem').at(1)
      const group21 = selects.at(1).find('.groupOptionItem').at(0)
      const group22 = selects.at(1).find('.groupOptionItem').at(1)
      const suboptions11 = selects.at(0).find('option').at(3)
      const suboptions12 = selects.at(0).find('option').at(4)
      const suboptions13 = selects.at(0).find('option').at(6)
      const suboptions21 = selects.at(1).find('option').at(3)
      const suboptions22 = selects.at(1).find('option').at(4)
      const suboptions23 = selects.at(1).find('option').at(6)

      expect(selects).toHaveLength(2)

      expect(selects.at(0).prop('id')).toBe('recipId1-ingId1')
      expect(options1.at(0).prop('value')).toBe('101')
      expect(options1.at(1).prop('value')).toBe('102')
      expect(options1.at(0).text()).toBe('Missing ingredients')
      expect(options1.at(1).text()).toBe('Wrong ingredients')
      expect(group11.text()).toBe('Ingredient quality')
      expect(suboptions11.prop('value')).toBe('104')
      expect(suboptions11.text()).toBe('Fruit or Veg - Mouldy')
      expect(suboptions12.prop('value')).toBe('105')
      expect(suboptions12.text()).toBe('Fruit or Veg - not fresh')
      expect(group12.text()).toBe('Another group')
      expect(suboptions13.prop('value')).toBe('107')
      expect(suboptions13.text()).toBe('Meat - gristle or bones')
      expect(selects.at(1).prop('id')).toBe('recipId2-ingId1')
      expect(options2.at(0).prop('value')).toBe('101')
      expect(options2.at(1).prop('value')).toBe('102')
      expect(options2.at(0).text()).toBe('Missing ingredients')
      expect(options2.at(1).text()).toBe('Wrong ingredients')
      expect(group21.text()).toBe('Ingredient quality')
      expect(suboptions21.prop('value')).toBe('104')
      expect(suboptions21.text()).toBe('Fruit or Veg - Mouldy')
      expect(suboptions22.prop('value')).toBe('105')
      expect(suboptions22.text()).toBe('Fruit or Veg - not fresh')
      expect(group22.text()).toBe('Another group')
      expect(suboptions23.prop('value')).toBe('107')
      expect(suboptions23.text()).toBe('Meat - gristle or bones')
    })

    test('bottom bar buttons is rendering correctly', () => {
      const BottomBar = getHelpLayout.find('BottomFixedContentWrapper')
      const Button1 = BottomBar.find('BottomButton').at(0)
      const Button2 = BottomBar.find('Button').at(1)

      expect(Button1.text()).toContain(content.button1Copy)
      expect(Button2.text()).toContain(content.button2Copy)
    })

    test('button link to correct urls', () => {
      const BottomBar = getHelpLayout.find('BottomFixedContentWrapper')
      const Button1 = BottomBar.find('BottomButton').at(0)

      expect(Button1.prop('url')).toBe('/get-help/ingredients')
    })
  })

  describe('behaviour', () => {
    let wrapper
    let getHelpLayout
    let storeSelectedIngredientIssueSpy
    let trackIngredientIssuesSpy

    browserHistory.push = jest.fn()

    beforeEach(() => {
      storeSelectedIngredientIssueSpy = jest.fn()
      trackIngredientIssuesSpy = jest.fn()
      wrapper = mount(
        <IngredientIssues
          content={content}
          ingredients={ingredients}
          fetchIngredientIssues={() => {}}
          issues={issues}
          storeSelectedIngredientIssue={storeSelectedIngredientIssueSpy}
          selectedIngredients={selectedIngredients}
          trackIngredientIssues={trackIngredientIssuesSpy}
          subIssues={subIssues}
        />
      )
      getHelpLayout = wrapper.find('GetHelpLayout')
    })

    test('when an issue is selected an action is called with issueId and issueLabel', () => {
      const select = getHelpLayout.find('select[id="recipId1-ingId1"]')
      select.simulate('change', { target: { value: '104' } })

      expect(storeSelectedIngredientIssueSpy).toHaveBeenCalledWith('recipId1-ingId1', '104', 'Fruit or Veg - Mouldy')
    })

    test('tracking action and redirect is being called when Continue button is clicked', () => {
      const BottomBar = getHelpLayout.find('BottomFixedContentWrapper')
      const Button2 = BottomBar.find('Button').at(1)
      Button2.props().onClick()

      expect(trackIngredientIssuesSpy).toHaveBeenCalledWith([
        { ingredientId: '1234', issueName: 'issue name 1', recipeId: '1010' },
        { ingredientId: '1234', issueName: 'issue name 2', recipeId: '2020' }
      ])
      expect(browserHistory.push).toHaveBeenCalledTimes(1)
    })
  })
})
