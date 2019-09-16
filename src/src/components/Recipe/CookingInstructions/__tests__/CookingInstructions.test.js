import React from 'react'
import { shallow } from 'enzyme'

import { Button } from 'goustouicomponents'
import { CookingInstructions } from '../CookingInstructions'

describe('CookingInstructions', () => {
  const onClickSpy = jest.fn()
  let id = '123'
  let wrapper
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Render', () => {  
    describe('when showRecipeSteps is false', () => {
      test('should trigger passed onClick function when clicked', () => {
        wrapper = shallow(<CookingInstructions recipeId={id} cookbookLoadRecipeStepsById={onClickSpy} />)
        wrapper.find(Button).simulate('click')

        expect(onClickSpy).toHaveBeenCalledTimes(1)
      })
    })

    describe('when showRecipeSteps is true', () => {
      test('should not trigger passed onClick function when clicked', () => {
        wrapper = shallow(<CookingInstructions recipeId={id} cookbookLoadRecipeStepsById={onClickSpy} recipeStepsById={{}} />)
        wrapper.find(Button).simulate('click')

        expect(onClickSpy).not.toHaveBeenCalled()
      })
    })
  })
})
