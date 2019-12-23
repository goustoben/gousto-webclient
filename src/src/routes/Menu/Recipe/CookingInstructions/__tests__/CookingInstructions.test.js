import React from 'react'
import Immutable from 'immutable'
import { mount, shallow } from 'enzyme'

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
        wrapper = shallow(<CookingInstructions recipeId={id} cookbookLoadRecipeStepsById={onClickSpy} recipeStepsById={Immutable.List()} />)
        wrapper.find(Button).simulate('click')

        expect(onClickSpy).toHaveBeenCalledTimes(1)
      })
    })

    describe('when has 1 recipeStepsById', () => {
      const recipeStepsById = Immutable.fromJS([{
        stepNumber: 1,
        instruction: 'Instruction&nbsp;',
        media: {
          images: []
        }
      }])

      beforeEach(() => {
        wrapper = mount(<CookingInstructions recipeId={id} cookbookLoadRecipeStepsById={onClickSpy} recipeStepsById={recipeStepsById} />)
      })

      test('should not trigger passed onClick function when clicked', () => {
        expect(wrapper.find(Button).exists()).toBe(false)
      })

      test('should find 1 recipeImage', () => {
        expect(wrapper.find('.recipeImage')).toHaveLength(1)
      })

      test('should find 1 recipeInstruction', () => {
        expect(wrapper.find('.recipeInstruction')).toHaveLength(1)
      })

      test('should find recipeInstruction with removed &nbsp;', () => {        
        expect(wrapper.find('.recipeInstruction').text()).toEqual('Instruction ')
      })
    })
  })
})
