import React from 'react'
import { mount } from 'enzyme'
import { InputRadio, InputCheck } from 'goustouicomponents'
import { VariantRecipeListItem } from '../VariantRecipeListItem'

describe('VariantRecipeListItem', () => {
  describe('When the variant list is on the details screen', () => {
    describe('When the recipe is checked', () => {
      const wrapper = mount(<VariantRecipeListItem
        recipeId="1230"
        recipeName="Chicken curry"
        changeCheckedRecipe={() => { }}
        isChecked
        isOnDetailScreen
        isOutOfStock={false}
      />)
      test('then it should render a radio button input in a highlighted blue box', () => {
        expect(wrapper.find('.listItemWithBlueBorder')).toHaveLength(1)
      })
    })

    describe('When the recipe is not checked', () => {
      const wrapper = mount(<VariantRecipeListItem
        recipeId="1230"
        recipeName="Chicken curry"
        changeCheckedRecipe={() => { }}
        isChecked={false}
        isOnDetailScreen
        isOutOfStock={false}
      />)
      test('then it should render a radio button input in a grey box', () => {
        expect(wrapper.find('.listItemWithBorder')).toHaveLength(1)
      })
    })

    describe('When the recipe is sold out', () => {
      const wrapper = mount(<VariantRecipeListItem
        recipeId="1230"
        recipeName="Chicken curry"
        changeCheckedRecipe={() => { }}
        isChecked={false}
        isOnDetailScreen
        isOutOfStock
      />)
      test('then it should render a sold out tag', () => {
        expect(wrapper.find('.soldOutText')).toHaveLength(1)
      })
    })

    describe('When the recipe has a surcharge', () => {
      const wrapper = mount(<VariantRecipeListItem
        key="1230"
        recipeId="1230"
        recipeName="Chicken curry"
        changeCheckedRecipe={() => {}}
        isChecked={false}
        isOnDetailScreen
        isOutOfStock={false}
        surcharge={0.75}
      />)
      test('then it should render surcharge info', () => {
        expect(wrapper.find('.surchargeAmountText')).toHaveLength(1)
        expect(wrapper.find('.perServingText')).toHaveLength(1)
      })
    })

    describe('When the variant list is on the recipe grid', () => {
      describe('When the the recipe is checked', () => {
        const wrapper = mount(<VariantRecipeListItem
          recipeId="1230"
          recipeName="Chicken curry"
          changeCheckedRecipe={() => { }}
          isChecked
          isOnDetailScreen={false}
          isOutOfStock={false}
        />)
        test('then it should render a radio button input not in a box', () => {
          expect(wrapper.find('.listItem')).toHaveLength(1)
        })
      })

      describe('When the recipe is not checked', () => {
        const wrapper = mount(<VariantRecipeListItem
          recipeId="1230"
          recipeName="Chicken curry"
          changeCheckedRecipe={() => { }}
          isChecked={false}
          isOnDetailScreen={false}
          isOutOfStock={false}
        />)
        test('then it should render a radio button input not in a box', () => {
          expect(wrapper.find('.listItem')).toHaveLength(1)
        })
      })

      describe('When the recipe has a surcharge', () => {
        const wrapper = mount(<VariantRecipeListItem
          key="1230"
          recipeId="1230"
          recipeName="Chicken curry"
          changeCheckedRecipe={() => {}}
          isChecked={false}
          isOnDetailScreen={false}
          surcharge={0.75}
          isOutOfStock={false}
        />)
        test('then it should render surcharge info', () => {
          expect(wrapper.find('.surchargeAmountText')).toHaveLength(1)
          expect(wrapper.find('.perServingText')).toHaveLength(1)
        })
      })
    })
  })

  describe('when radio button is changed', () => {
    const recipeId = '1230'
    const isOutOfStock = true

    const changeCheckedRecipe = jest.fn()
    const wrapper = mount(<VariantRecipeListItem
      recipeId={recipeId}
      recipeName="Chicken curry"
      changeCheckedRecipe={changeCheckedRecipe}
      isChecked={false}
      isOnDetailScreen={false}
      isOutOfStock={isOutOfStock}
    />)

    const changeRadio = wrapper.find(InputRadio).first().prop('onChange')

    test('should call changeCheckedRecipe', () => {
      changeRadio()

      expect(changeCheckedRecipe).toHaveBeenCalledWith(recipeId, isOutOfStock)
    })
  })

  describe('when isOnSidesModal is true', () => {
    let wrapper
    const recipeId = '1230'
    const isOutOfStock = true

    const changeCheckedRecipe = jest.fn()
    wrapper = mount(<VariantRecipeListItem
      recipeId={recipeId}
      recipeName="Chicken curry"
      changeCheckedRecipe={changeCheckedRecipe}
      isChecked={false}
      isOnDetailScreen={false}
      isOutOfStock={isOutOfStock}
      isOnSidesModal
    />)

    test('should render InputCheck', () => {
      expect(wrapper.find(InputCheck)).toHaveLength(1)
    })

    describe('when check input is clicked', () => {
      const onChange = wrapper.find(InputCheck).first().prop('onChange')

      test('should call changeCheckedRecipe', () => {
        onChange()
        expect(changeCheckedRecipe).toHaveBeenCalled()
      })
    })

    describe('When the sides recipe is not checked', () => {
      beforeEach(() => {
        wrapper = mount(<VariantRecipeListItem
          recipeId={recipeId}
          recipeName="Chicken curry"
          changeCheckedRecipe={changeCheckedRecipe}
          isChecked={false}
          isOnDetailScreen={false}
          isOutOfStock={isOutOfStock}
          isOnSidesModal
        />)
      })
      test('then it should render a checkbox in a grey box', () => {
        expect(wrapper.find('.listItemWithBorder')).toHaveLength(1)
      })
    })

    describe('When the recipe is checked', () => {
      beforeEach(() => {
        wrapper = mount(<VariantRecipeListItem
          recipeId="1230"
          recipeName="Chicken curry"
          changeCheckedRecipe={() => { }}
          isChecked
          isOutOfStock={false}
          isOnSidesModal
          isOnDetailScreen={false}
          hasSideAddedToBasket
        />)
      })
      test('then it should render a checkbox in a highlighted blue box', () => {
        expect(wrapper.find('.listItemWithBlueBorder')).toHaveLength(1)
      })
    })

    describe('When the recipe is sold out', () => {
      beforeEach(() => {
        wrapper = mount(<VariantRecipeListItem
          recipeId="1230"
          recipeName="Chicken curry"
          changeCheckedRecipe={() => { }}
          isChecked={false}
          isOutOfStock
          isOnSidesModal
          isOnDetailScreen={false}
        />)
      })
      test('then it should render a sold out tag', () => {
        expect(wrapper.find('.soldOutText')).toHaveLength(1)
      })
    })

    describe('When the recipe has a surcharge', () => {
      beforeEach(() => {
        wrapper = mount(<VariantRecipeListItem
          key="1230"
          recipeId="1230"
          recipeName="naan"
          changeCheckedRecipe={() => {}}
          isChecked={false}
          isOnDetailScreen={false}
          isOutOfStock={false}
          surcharge={0.75}
          isOnSidesModal
        />)
      })
      test('then it should render surcharge info', () => {
        expect(wrapper.find('.surchargeAmountText')).toHaveLength(1)
        expect(wrapper.find('.perServingText')).toHaveLength(1)
      })
    })
  })
})
