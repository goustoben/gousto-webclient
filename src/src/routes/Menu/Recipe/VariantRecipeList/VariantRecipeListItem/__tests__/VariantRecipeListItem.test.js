import React from 'react'
import { mount } from 'enzyme'
import { VariantRecipeListItem } from '../VariantRecipeListItem'

describe('VariantRecipeListItem', () => {
  describe('When the variant list is on the details screen', () => {
    describe('When the recipe is checked', () => {
      const wrapper = mount(<VariantRecipeListItem
        key="1230"
        recipeId="1230"
        recipeName="Chicken curry"
        changeCheckedRecipe={() => {}}
        isChecked
        isOnDetailScreen
      />)
      test('then it should render a radio button input in a highlighted blue box', () => {
        expect(wrapper.find('.listItemWithBlueBorder')).toHaveLength(1)
      })
    })

    describe('When the recipe is not checked', () => {
      const wrapper = mount(<VariantRecipeListItem
        key="1230"
        recipeId="1230"
        recipeName="Chicken curry"
        changeCheckedRecipe={() => {}}
        isChecked={false}
        isOnDetailScreen
      />)
      test('then it should render a radio button input in a grey box', () => {
        expect(wrapper.find('.listItemWithBorder')).toHaveLength(1)
      })
    })

    describe('When the recipe is sold out', () => {
      const wrapper = mount(<VariantRecipeListItem
        key="1230"
        recipeId="1230"
        recipeName="Chicken curry"
        changeCheckedRecipe={() => {}}
        isChecked={false}
        isOnDetailScreen
        outOfStock
      />)
      test('then it should render a sold out tag', () => {
        expect(wrapper.find('.soldOutText')).toHaveLength(1)
      })
    })

    describe('When the variant list is on the recipe grid', () => {
      describe('When the the recipe is checked', () => {
        const wrapper = mount(<VariantRecipeListItem
          key="1230"
          recipeId="1230"
          recipeName="Chicken curry"
          changeCheckedRecipe={() => {}}
          isChecked
          isOnDetailScreen={false}
        />)
        test('then it should render a radio button input not in a box', () => {
          expect(wrapper.find('.listItem')).toHaveLength(1)
        })
      })

      describe('When the recipe is not checked', () => {
        const wrapper = mount(<VariantRecipeListItem
          key="1230"
          recipeId="1230"
          recipeName="Chicken curry"
          changeCheckedRecipe={() => {}}
          isChecked={false}
          isOnDetailScreen={false}
        />)
        test('then it should render a radio button input not in a box', () => {
          expect(wrapper.find('.listItem')).toHaveLength(1)
        })
      })
    })
  })
})
