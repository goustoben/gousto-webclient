import React from 'react'
import ReactDOM from 'react-dom'
import Immutable from 'immutable'
import { shallow } from 'enzyme'

import DefaultDetail from 'routes/Menu/Recipe/Detail/DefaultDetail'
import { CookingInstructions } from 'routes/Menu/Recipe/CookingInstructions'
import { NutritionInfo } from 'routes/Menu/Recipe/Detail/Nutrition'
import { RecipeDisclaimerContainer } from 'routes/Menu/RecipeDisclaimer'
import { RecipeMicronutrientsContainer } from 'routes/Menu/RecipeMicronutrients'
import { NutritionDisclaimerText } from '../../NutritionDisclaimerText'

jest.mock('routes/Menu/RecipeDisclaimer', () => ({
  RecipeDisclaimerContainer: () => <div />
}))

jest.mock('routes/Menu/RecipeMicronutrients', () => ({
  RecipeMicronutrientsContainer: () => <div />
}))

describe('<DefaultDetail />', () => {
  const DEFAULT_DETAIL = (
    <DefaultDetail
      allergens={Immutable.List(['allergens'])}
      cuisine="cuisine"
      cookingTime={123}
      dairyFree={false}
      diet="vegetarian"
      equipment={Immutable.List(['spoon, mixer'])}
      id="123"
      ingredients={Immutable.fromJS([{
        allergens: 'allergens',
        id: 'id',
        label: 'label',
        media: { images: [{urls: [{width: 10}]}] },
        name: 'name',
        subIngredients: 'subIngredients',
      }])}
      per100Grams={Immutable.Map({
        carbs: 1,
        carbsSugars: 1,
        energyKj: 1,
        energyKcal: 1,
        fat: 1,
        fatSaturates: 1,
        fibre: 1,
        protein: 1,
        salt: 1,
      })}
      perPortion={Immutable.Map({
        carbs: 1,
        carbsSugars: 1,
        energyKj: 1,
        energyKcal: 1,
        fat: 1,
        fatSaturates: 1,
        fibre: 1,
        protein: 1,
        salt: 1,
      })}
      showCookingInstruction={false}
      title="title"
      useWithin="5 days"
      view="detail"
      youWillNeed={Immutable.List(['spoon', 'fork'])}
      numPortions={2}
      isChefPrepared={false}
    />
  )

  test('Render without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(DEFAULT_DETAIL, div)
  })

  let wrapper

  beforeEach(() => {
    wrapper = shallow(DEFAULT_DETAIL)
  })

  test('should contain one recipe disclaimer ', () => {
    expect(wrapper.find(RecipeDisclaimerContainer)).toHaveLength(1)
    expect(wrapper.find(RecipeDisclaimerContainer).prop('id')).toEqual('123')
  })

  test('should contain micronutrients if in health kitchen', () => {
    expect(wrapper.find(RecipeMicronutrientsContainer)).toHaveLength(1)
    expect(wrapper.find(RecipeMicronutrientsContainer).prop('id')).toEqual('123')
  })

  test('should render calorie information', () => {
    expect(wrapper.find(NutritionDisclaimerText)).toHaveLength(1)
  })

  describe('Equipment required', () => {
    describe('when equipment is not empty', () => {
      beforeEach(() => {
        wrapper.setProps({ equipment: Immutable.List(['spoon, mixer']) })
      })

      test('should return the equipment required', () => {
        expect(wrapper.text()).toContain('spoon, mixer')
      })
    })

    describe('when equipment is empty', () => {
      beforeEach(() => {
        wrapper.setProps({ equipment: Immutable.List([]) })
      })

      test('should not return the equipment required', () => {
        expect(wrapper.text()).not.toContain('spoon, mixer')
      })
    })
  })

  describe('You will need', () => {
    describe('when youWillNeed is not empty', () => {
      beforeEach(() => {
        wrapper.setProps({ youWillNeed: Immutable.List(['spoon', 'fork']) })
      })

      test('should return the youWillNeed', () => {
        expect(wrapper.text()).toContain('spoon, fork')
      })
    })

    describe('when youWillNeed is empty', () => {
      beforeEach(() => {
        wrapper.setProps({ youWillNeed: Immutable.List([]) })
      })

      test('should not return the youWillNeed', () => {
        expect(wrapper.text()).not.toContain('spoon, fork')
      })
    })
  })

  describe('<Ingredients />', () => {
    describe('when ingredients is not empty', () => {
      beforeEach(() => {
        wrapper.setProps({
          ingredients: Immutable.fromJS([{
            allergens: 'allergens',
            id: 'id',
            label: 'label',
            media: { images: [{urls: [{width: 10}]}] },
            name: 'name',
            subIngredients: 'subIngredients',
          }])
        })
      })

      test('should return the <Ingredients />', () => {
        expect(wrapper.find('Ingredients')).toHaveLength(1)
      })
    })

    describe('when ingredients is empty', () => {
      beforeEach(() => {
        wrapper.setProps({ ingredients: Immutable.fromJS([]) })
      })

      test('should not return the <Ingredients />', () => {
        expect(wrapper.find('Ingredients').exists()).toBe(false)
      })
    })
  })

  describe('When perPortion is not empty', () => {
    beforeEach(() => {
      wrapper.setProps({
        perPortion: Immutable.Map({
          carbs: 1,
          carbsSugars: 1,
          energyKj: 1,
          energyKcal: 1,
          fat: 1,
          fatSaturates: 1,
          fibre: 1,
          protein: 1,
          salt: 1,
        })
      })
    })

    test('should return the <NutritionInfo />', () => {
      expect(wrapper.find(NutritionInfo)).toHaveLength(1)
    })

    describe('and showCookingInstruction is true', () => {
      beforeEach(() => {
        wrapper.setProps({ showCookingInstruction: true })
      })

      test('should return the <CookingInstructions />', () => {
        expect(wrapper.find('.cookingInstructionsDesktop').find(CookingInstructions)).toHaveLength(1)
      })
    })

    describe('and showCookingInstruction is false', () => {
      beforeEach(() => {
        wrapper.setProps({ showCookingInstruction: false })
      })

      test('should not return the <CookingInstructions />', () => {
        expect(wrapper.find('.cookingInstructionsDesktop').find(CookingInstructions).exists()).toBe(false)
      })
    })
  })

  describe('When perPortion is empty', () => {
    beforeEach(() => {
      wrapper.setProps({ perPortion: Immutable.fromJS([]) })
    })

    test('should not return the <NutritionInfo />', () => {
      expect(wrapper.find(NutritionInfo).exists()).toBe(false)
    })

    test('should not return the <CookingInstructions />', () => {
      expect(wrapper.find('.cookingInstructionsDesktop').find(CookingInstructions).exists()).toBe(false)
    })
  })

  describe('When allergens is not empty', () => {
    beforeEach(() => {
      wrapper.setProps({ allergens: Immutable.List(['allergens']) })
    })

    test('should return the <IngredientsList />', () => {
      expect(wrapper.find('IngredientsList')).toHaveLength(1)
    })

    test('should return the <Allergens />', () => {
      expect(wrapper.find('Allergens')).toHaveLength(1)
    })

    describe('and showCookingInstruction is true', () => {
      beforeEach(() => {
        wrapper.setProps({ showCookingInstruction: true })
      })

      test('should return <CookingInstructions />', () => {
        expect(wrapper.find('.cookingInstructionsMobile').find(CookingInstructions)).toHaveLength(1)
      })
    })

    describe('and showCookingInstruction is false', () => {
      test('should not return <CookingInstructions />', () => {
        expect(wrapper.find('.cookingInstructionsMobile').find(CookingInstructions).exists()).toBe(false)
      })
    })
  })

  describe('When ingredients is not empty', () => {
    beforeEach(() => {
      wrapper.setProps({
        ingredients: Immutable.fromJS([{
          allergens: 'allergens',
          id: 'id',
          label: 'label',
          media: { images: [{urls: [{width: 10}]}] },
          name: 'name',
          subIngredients: 'subIngredients',
        }])
      })
    })

    test('should return the <IngredientsList />', () => {
      expect(wrapper.find('IngredientsList')).toHaveLength(1)
    })

    test('should return the <Allergens />', () => {
      expect(wrapper.find('Allergens')).toHaveLength(1)
    })

    describe('and showCookingInstruction is true', () => {
      beforeEach(() => {
        wrapper.setProps({ showCookingInstruction: true })
      })

      test('should return <CookingInstructions />', () => {
        expect(wrapper.find('.cookingInstructionsMobile').find(CookingInstructions)).toHaveLength(1)
      })
    })

    describe('and showCookingInstruction is false', () => {
      test('should not return <CookingInstructions />', () => {
        expect(wrapper.find('.cookingInstructionsMobile').find(CookingInstructions).exists()).toBe(false)
      })
    })
  })

  describe('When allergens and ingredients is not empty', () => {
    beforeEach(() => {
      wrapper.setProps({
        allergens: Immutable.List(['allergens']),
        ingredients: Immutable.fromJS([{
          allergens: 'allergens',
          id: 'id',
          label: 'label',
          media: { images: [{urls: [{width: 10}]}] },
          name: 'name',
          subIngredients: 'subIngredients',
        }])
      })
    })

    test('should return the <IngredientsList />', () => {
      expect(wrapper.find('IngredientsList')).toHaveLength(1)
    })

    test('should return the <Allergens />', () => {
      expect(wrapper.find('Allergens')).toHaveLength(1)
    })

    describe('and showCookingInstruction is true', () => {
      beforeEach(() => {
        wrapper.setProps({ showCookingInstruction: true })
      })

      test('should return <CookingInstructions />', () => {
        expect(wrapper.find('.cookingInstructionsMobile').find(CookingInstructions)).toHaveLength(1)
      })
    })

    describe('and showCookingInstruction is false', () => {
      test('should not return <CookingInstructions />', () => {
        expect(wrapper.find('.cookingInstructionsMobile').find(CookingInstructions).exists()).toBe(false)
      })
    })
  })

  describe('When allergens and ingredients is empty', () => {
    beforeEach(() => {
      wrapper.setProps({
        allergens: Immutable.List([]),
        ingredients: Immutable.fromJS([])
      })
    })

    test('should not return the <IngredientsList />', () => {
      expect(wrapper.find('IngredientsList').exists()).toBe(false)
    })

    test('should not return the <Allergens />', () => {
      expect(wrapper.find('Allergens').exists()).toBe(false)
    })

    test('should not return the <CookingInstructions />', () => {
      expect(wrapper.find('.cookingInstructionsMobile').find(CookingInstructions).exists()).toBe(false)
    })
  })

  describe('When isChefPrepared is true', () => {
    beforeEach(() => {
      wrapper.setProps({isChefPrepared: true})
    })

    test('should send numPortions 2 to AttributeGrid', () => {
      expect(wrapper.find('AttributeGrid').prop('numPortions')).toEqual(2)
    })

    test('should send cooking time null to AttributeGrid', () => {
      expect(wrapper.find('AttributeGrid').prop('cookingTime')).toEqual(null)
    })

    test('should send text Add meal to Add button', () => {
      wrapper.find('AddButton').forEach(button =>
        expect(button.prop('buttonText')).toEqual('Add meal')
      )
    })
  })
})
