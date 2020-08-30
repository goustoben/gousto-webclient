import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'

import { RecipeDisclaimerContainer } from 'routes/Menu/RecipeDisclaimer'
import { Detail } from '../Detail'
import { DetailIngredientsContainer } from '../DetailIngredients'
import { DetailAllergenIngredientsContainer } from '../DetailAllergenIngredients'
import { DetailPerPortionContainer } from '../DetailPerPortion'
import { DetailAttributeGridContainer } from '../DetailAttributeGrid'

jest.mock('routes/Menu/RecipeDisclaimer', () => ({
  RecipeDisclaimerContainer: () => <div />
}))

jest.mock('routes/Menu/Recipe/AddRecipe', () => ({
  AddRecipe: () => <div />
}))

jest.mock('routes/Menu/Recipe/VariantRecipeList/VariantRecipeList', () => ({
  VariantRecipeListContainer: () => <div />
}))

describe('<Detail />', () => {
  const DETAIL = (
    <Detail
      media={Immutable.fromJS([{urls: [{width: 10}]}])}
      equipment={Immutable.List(['spoon, mixer'])}
      id="123"
      title="title"
      view="detail"
      youWillNeed={Immutable.List(['spoon', 'fork'])}
      isChefPrepared={false}
      count={0}
      average={0}
      stock={100}
      inBasket={false}
      description="Recipe description"
      menuRecipeDetailVisibilityChange={() => {}}
    />
  )

  let wrapper

  beforeEach(() => {
    wrapper = shallow(DETAIL)
  })

  test('should render an overlay which calls the menuRecipeDetailVisibilityChange function prop on click', () => {
    const menuRecipeDetailVisibilityChangeSpy = jest.fn()
    wrapper.setProps({menuRecipeDetailVisibilityChange: menuRecipeDetailVisibilityChangeSpy })
    wrapper.find('.modalContainer').simulate('click')

    expect(menuRecipeDetailVisibilityChangeSpy).toHaveBeenCalledTimes(1)
  })

  test('should contain one recipe disclaimer ', () => {
    expect(wrapper.find(RecipeDisclaimerContainer)).toHaveLength(1)
    expect(wrapper.find(RecipeDisclaimerContainer).prop('recipeId')).toEqual('123')
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

  test('should have an <DetailIngredientsContainer /> with the correct id', () => {
    expect(wrapper.find(DetailIngredientsContainer)).toHaveLength(1)
    expect(wrapper.find(DetailIngredientsContainer).prop('recipeId')).toEqual('123')
  })

  test('should have an <DetailAllergenIngredientsContainer /> with the correct id', () => {
    expect(wrapper.find(DetailAllergenIngredientsContainer)).toHaveLength(1)
    expect(wrapper.find(DetailAllergenIngredientsContainer).prop('recipeId')).toEqual('123')
  })

  test('should have an <DetailPerPortion /> with the correct id', () => {
    expect(wrapper.find(DetailPerPortionContainer)).toHaveLength(1)
    expect(wrapper.find(DetailPerPortionContainer).prop('recipeId')).toEqual('123')
  })

  test('should have an <DetailAttributeGridContainer /> with the correct id', () => {
    expect(wrapper.find(DetailAttributeGridContainer)).toHaveLength(1)
    expect(wrapper.find(DetailAttributeGridContainer).prop('recipeId')).toEqual('123')
  })

  describe('When isChefPrepared is true', () => {
    beforeEach(() => {
      wrapper.setProps({isChefPrepared: true})
    })

    test('should pass to DetailAttributeGridContainer', () => {
      expect(wrapper.find(DetailAttributeGridContainer).prop('isChefPrepared')).toEqual(true)
    })

    test('should send text Add meal to Add button', () => {
      wrapper.find('AddButton').forEach(button =>
        expect(button.prop('buttonText')).toEqual('Add meal')
      )
    })
  })

  describe('When isFineDineIn is true', () => {
    beforeEach(() => {
      wrapper.setProps({ isFineDineIn: true })
    })

    test('should render Carousel', () => {
      expect(wrapper.find('Carousel')).toHaveLength(1)
    })
  })
})
