import React from 'react'

import { shallow } from 'enzyme'
import Immutable from 'immutable'

import { AttributeGrid } from 'routes/Menu/Recipe/AttributeGrid'
import { RecipeAttribute } from 'routes/Menu/Recipe/RecipeAttribute'

describe('AttributeGrid', () => {
  const cookingTime = 1
  const useWithin = ''
  let equipment = Immutable.fromJS(['Spoon', 'Egg Beater'])
  const diet = 'vegan'
  const fiveADay = 2
  const cals = 100
  const cuisine = 'Italian'
  const dairyFree = true
  const glutenFree = true
  let maxNoAttributes = 4
  let wrapper

  describe('Recipe Card', () => {
    beforeEach(() => {
      wrapper = shallow(<AttributeGrid maxNoAttributes={maxNoAttributes} cookingTime={cookingTime} useWithin={useWithin} equipment={equipment} diet={diet} fiveADay={fiveADay} cals={cals} cuisine={cuisine} />)
    })

    test('should contain the max number of attributes when all attributes meets show conditions', () => {
      expect(wrapper.find(RecipeAttribute).length).toEqual(maxNoAttributes)
    })

    test('should contain cookingTime, useWithin, equipmentRequired and diet when all attributes meet show conditions ', () => {
      expect(wrapper.find(RecipeAttribute).find({name: 'cookingTime'}).length).toEqual(1)
      expect(wrapper.find(RecipeAttribute).find({name: 'useWithin'}).length).toEqual(1)
      expect(wrapper.find(RecipeAttribute).find({name: 'equipmentRequired'}).length).toEqual(1)
      expect(wrapper.find(RecipeAttribute).find({name: 'diet'}).length).toEqual(1)
    })

    test('should contain cookingTime, useWithin, diet and fiveADay when equipment is not required ', () => {
      equipment = Immutable.fromJS([])
      wrapper = shallow(<AttributeGrid maxNoAttributes={maxNoAttributes} cookingTime={cookingTime} useWithin={useWithin} equipment={equipment} diet={diet} fiveADay={fiveADay} cals={cals} cuisine={cuisine} />)

      expect(wrapper.find(RecipeAttribute).find({name: 'cookingTime'}).length).toEqual(1)
      expect(wrapper.find(RecipeAttribute).find({name: 'useWithin'}).length).toEqual(1)
      expect(wrapper.find(RecipeAttribute).find({name: 'diet'}).length).toEqual(1)
      expect(wrapper.find(RecipeAttribute).find({name: 'fiveADay'}).length).toEqual(1)
    })

    describe('Given cookingTime is null', () => {
      beforeEach(() => {
        wrapper = shallow(<AttributeGrid maxNoAttributes={maxNoAttributes} cookingTime={null} useWithin={useWithin} equipment={equipment} diet={diet} fiveADay={fiveADay} cals={cals} cuisine={cuisine} />)
      })
      test('then it should not return a cookingTime attribute element', () => {
        expect(wrapper.find(RecipeAttribute).find({name: 'cookingTime'}).length).toEqual(0)
      })
    })

    describe('Given equipment is null', () => {
      beforeEach(() => {
        wrapper = shallow(<AttributeGrid maxNoAttributes={maxNoAttributes} cookingTime={cookingTime} useWithin={useWithin} equipment={null} diet={diet} fiveADay={fiveADay} cals={cals} cuisine={cuisine} />)
      })
      test('then it should not return an equipment attribute element', () => {
        expect(wrapper.find(RecipeAttribute).find({name: 'equipmentRequired'}).length).toEqual(0)
      })
    })

    describe('Given numPortions is set', () => {
      beforeEach(() => {
        wrapper = shallow(<AttributeGrid maxNoAttributes={maxNoAttributes} cookingTime={cookingTime} useWithin={useWithin} equipment={equipment} diet={diet} fiveADay={fiveADay} cals={cals} cuisine={cuisine} numPortions={2} />)
      })
      test('then it should contain numPortions', () => {
        expect(wrapper.find(RecipeAttribute).find({name: 'numPortions'}).length).toEqual(1)
      })
    })

    describe('Given numPortions is null', () => {
      beforeEach(() => {
        wrapper = shallow(<AttributeGrid maxNoAttributes={maxNoAttributes} cookingTime={cookingTime} useWithin={useWithin} equipment={equipment} diet={diet} fiveADay={fiveADay} cals={cals} cuisine={cuisine} numPortions={null} />)
      })
      test('then it should not return an serving size attribute element', () => {
        expect(wrapper.find(RecipeAttribute).find({name: 'numPortions'}).length).toEqual(0)
      })
    })
  })

  describe('Detailed Recipe Card', () => {
    beforeEach(() => {
      maxNoAttributes = 20
      wrapper = shallow(<AttributeGrid maxNoAttributes={maxNoAttributes} showDetailedRecipe cookingTime={cookingTime} useWithin={useWithin} equipment={equipment} diet={diet} fiveADay={fiveADay} cals={cals} cuisine={cuisine} dairyFree={dairyFree} glutenFree={glutenFree} />)
    })

    test('should contain less than the max number of attributes', () => {
      expect(wrapper.find(RecipeAttribute).length).toBeLessThanOrEqual(maxNoAttributes)
    })

    test('should contain cookingTime, useWithin, glutenFree, dairyFree, fiveADay, diet, cals and cuisine when all attributes meet show conditions ', () => {
      expect(wrapper.find(RecipeAttribute).find({name: 'cookingTime'}).length).toEqual(1)
      expect(wrapper.find(RecipeAttribute).find({name: 'useWithin'}).length).toEqual(1)
      expect(wrapper.find(RecipeAttribute).find({name: 'glutenFree'}).length).toEqual(1)
      expect(wrapper.find(RecipeAttribute).find({name: 'dairyFree'}).length).toEqual(1)
      expect(wrapper.find(RecipeAttribute).find({name: 'fiveADay'}).length).toEqual(1)
      expect(wrapper.find(RecipeAttribute).find({name: 'diet'}).length).toEqual(1)
      expect(wrapper.find(RecipeAttribute).find({name: 'cals'}).length).toEqual(1)
      expect(wrapper.find(RecipeAttribute).find({name: 'cuisine'}).length).toEqual(1)
    })

    describe('When gluten free is null', () => {
      beforeEach(() => {
        wrapper = shallow(<AttributeGrid maxNoAttributes={maxNoAttributes} cookingTime={cookingTime} useWithin={useWithin} equipment={equipment} diet={diet} fiveADay={fiveADay} cals={cals} cuisine={cuisine} glutenFree={null} />)
      })
      test('then it should not return a gluten free attribute element', () => {
        expect(wrapper.find(RecipeAttribute).find({name: 'glutenFree'}).length).toEqual(0)
      })
    })

    describe('When dairy free is null', () => {
      beforeEach(() => {
        wrapper = shallow(<AttributeGrid maxNoAttributes={maxNoAttributes} cookingTime={cookingTime} useWithin={useWithin} equipment={equipment} diet={diet} fiveADay={fiveADay} cals={cals} cuisine={cuisine} dairyFree={null} />)
      })
      test('then it should not return a dairy free attribute element', () => {
        expect(wrapper.find(RecipeAttribute).find({name: 'dairyFree'}).length).toEqual(0)
      })
    })
  })
})
