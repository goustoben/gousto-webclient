import React from 'react'
import Immutable from 'immutable'
import { shallow } from 'enzyme'

import { Button } from 'goustouicomponents'
import { CookingInstructions } from '../CookingInstructions'

describe('CookingInstructions', () => {
  const onClickSpy = jest.fn()
  const id = '123'
  let wrapper
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Render', () => {  
    describe('when recipeStepsById is empty', () => {
      test('should trigger passed onClick function when clicked', () => {
        wrapper = shallow(<CookingInstructions recipeId={id} cookbookLoadRecipeStepsById={onClickSpy} recipeStepsById={{}} />)
        wrapper.find(Button).simulate('click')

        expect(onClickSpy).toHaveBeenCalledTimes(1)
      })
    })

    describe('when recipeStepsById has data', () => {
      const recipeStepsById = Immutable.fromJS([{
        'step_number': 1,
        'instruction': 'Instruction',
        'media': {}
      }])
      test('should not trigger passed onClick function when clicked', () => {
        wrapper = shallow(<CookingInstructions recipeId={id} cookbookLoadRecipeStepsById={onClickSpy} recipeStepsById={recipeStepsById} />)

        expect(wrapper.find(Button).exists()).toBe(false)
      })
    })
  })
})
