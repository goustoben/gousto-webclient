import React from 'react'

import { shallow } from 'enzyme'
import Immutable from 'immutable'

import { AttributeGrid } from 'Recipe/AttributeGrid'
import { RecipeAttribute } from 'Recipe/RecipeAttribute'

describe('AttributeGrid', () => {
  const cookingTime = 1
  const useWithin = ''
  let equipment = Immutable.fromJS(['Spoon', 'Egg Beater'])
  const diet = 'vegan'
  const fiveADay = 2
  const cals = 100
  const cuisine = 'Italian'
  let maxNoAttributes = 4
  let wrapper

  describe('Recipe Card', () => {

    beforeEach(() => {
      wrapper = shallow(<AttributeGrid maxNoAttributes={maxNoAttributes} cookingTime={cookingTime} useWithin={useWithin} equipment={equipment} diet={diet} fiveADay={fiveADay} cals={cals} cuisine={cuisine}/>)
    })

    test('should contain the max number of attributes when all attributes meets show conditions', () => {
      expect(wrapper.find(RecipeAttribute).length).toEqual(maxNoAttributes)
    })

    test('should contain cookingTime, useWithin, equipmentRequired and diet when all attributes meet show conditions ', () => {
      expect(wrapper.find(RecipeAttribute).find({name:'cookingTime'}).length).toEqual(1)
      expect(wrapper.find(RecipeAttribute).find({name:'useWithin'}).length).toEqual(1)
      expect(wrapper.find(RecipeAttribute).find({name:'equipmentRequired'}).length).toEqual(1)
      expect(wrapper.find(RecipeAttribute).find({name:'diet'}).length).toEqual(1)
    })

    test('should contain cookingTime, useWithin, diet and fiveADay when equipment is not required ', () => {
      equipment = Immutable.fromJS([])
      wrapper = shallow(<AttributeGrid maxNoAttributes={maxNoAttributes} cookingTime={cookingTime} useWithin={useWithin} equipment={equipment} diet={diet} fiveADay={fiveADay} cals={cals} cuisine={cuisine}/>)

      expect(wrapper.find(RecipeAttribute).find({name:'cookingTime'}).length).toEqual(1)
      expect(wrapper.find(RecipeAttribute).find({name:'useWithin'}).length).toEqual(1)
      expect(wrapper.find(RecipeAttribute).find({name:'diet'}).length).toEqual(1)
      expect(wrapper.find(RecipeAttribute).find({name:'fiveADay'}).length).toEqual(1)
    })
  })

  describe('Detailed Recipe Card', () => {
    beforeEach(() => {
      maxNoAttributes = 20
      wrapper = shallow(<AttributeGrid maxNoAttributes={maxNoAttributes} showDetailedRecipe cookingTime={cookingTime} useWithin={useWithin} equipment={equipment} diet={diet} fiveADay={fiveADay} cals={cals} cuisine={cuisine}/>)
    })

    test('should contain less than the max number of attributes', () => {
      expect(wrapper.find(RecipeAttribute).length).toBeLessThanOrEqual(maxNoAttributes)
    })

    test('should contain cookingTime, useWithin, fiveADay, diet, cals and cuisine when all attributes meet show conditions ', () => {
      expect(wrapper.find(RecipeAttribute).find({name:'cookingTime'}).length).toEqual(1)
      expect(wrapper.find(RecipeAttribute).find({name:'useWithin'}).length).toEqual(1)
      expect(wrapper.find(RecipeAttribute).find({name:'fiveADay'}).length).toEqual(1)
      expect(wrapper.find(RecipeAttribute).find({name:'diet'}).length).toEqual(1)
      expect(wrapper.find(RecipeAttribute).find({name:'cals'}).length).toEqual(1)
      expect(wrapper.find(RecipeAttribute).find({name:'cuisine'}).length).toEqual(1)
    })
  })

})
