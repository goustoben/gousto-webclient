import React from 'react'
import { shallow } from 'enzyme'
import { signupConfig } from 'config/signup'
import { RecipesPerBoxStep } from '../RecipesPerBoxStep'

describe('given RecipesPerBoxStep is rendered', () => {
  let wrapper
  const basketSetNumRecipes = jest.fn()
  const next = jest.fn()

  beforeEach(() => {
    wrapper = shallow(<RecipesPerBoxStep basketSetNumRecipes={basketSetNumRecipes} next={next} />)
  })

  test('then the component renders correctly', () => {
    expect(wrapper.find('Heading').childAt(0).text()).toBe(signupConfig.recipesPerBoxStep.title)

    expect(wrapper.find('SignupImage')).toHaveLength(1)

    const buttons = wrapper.find('Connect(Button)')
    expect(buttons).toHaveLength(3)
    expect(buttons.at(0).childAt(0).text()).toBe('2')
    expect(buttons.at(1).childAt(0).text()).toBe('3')
    expect(buttons.at(2).childAt(0).text()).toBe('4')
  })

  describe('when a button is pressed', () => {
    let buttons

    beforeEach(() => {
      buttons = wrapper.find('Connect(Button)')
    })

    const cases = [
      [2, 0],
      [3, 1],
      [4, 2],
    ]

    describe.each(cases)('For %s recipes', (value, index) => {
      test('then the recipes per box is set correctly', () => {
        buttons.at(index).simulate('click')

        expect(basketSetNumRecipes).toHaveBeenCalledWith(value)
        expect(next).toHaveBeenCalledWith()
      })
    })
  })
})
