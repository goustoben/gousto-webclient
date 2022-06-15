import React from 'react'

import { mount } from 'enzyme'
import { InputRadio } from 'goustouicomponents'

import { AlternativeOptionItem } from './AlternativeOptionItem'

describe('AlternativeOptionItem', () => {
  describe('When the variant list is on the details screen', () => {
    describe('When the recipe is checked', () => {
      const wrapper = mount(
        <AlternativeOptionItem
          recipeId="1230"
          recipeName="Chicken curry"
          changeCheckedRecipe={() => {}}
          isChecked
          isOnDetailScreen
          isOutOfStock={false}
        />,
      )
      test('then it should render a radio button input in a highlighted blue box', () => {
        expect(wrapper.find('.listItem.listItemChecked')).toHaveLength(1)
      })
    })

    describe('When the recipe is not checked', () => {
      const wrapper = mount(
        <AlternativeOptionItem
          recipeId="1230"
          recipeName="Chicken curry"
          changeCheckedRecipe={() => {}}
          isChecked={false}
          isOnDetailScreen
          isOutOfStock={false}
        />,
      )
      test('then it should render a radio button input in a grey box', () => {
        expect(wrapper.find('.listItem')).toHaveLength(1)
        expect(wrapper.find('.listItem').hasClass('.listItemChecked')).toBe(false)
      })
    })

    describe('When the recipe is sold out', () => {
      const wrapper = mount(
        <AlternativeOptionItem
          recipeId="1230"
          recipeName="Chicken curry"
          changeCheckedRecipe={() => {}}
          isChecked={false}
          isOnDetailScreen
          isOutOfStock
        />,
      )
      test('then it should render a sold out tag', () => {
        expect(wrapper.find('.soldOutText')).toHaveLength(1)
      })
    })

    describe('When the recipe has a surcharge', () => {
      const wrapper = mount(
        <AlternativeOptionItem
          key="1230"
          recipeId="1230"
          recipeName="Chicken curry"
          changeCheckedRecipe={() => {}}
          isChecked={false}
          isOnDetailScreen
          isOutOfStock={false}
          surcharge={0.75}
        />,
      )
      test('then it should render surcharge info', () => {
        expect(wrapper.find('.surchargeAmountText')).toHaveLength(1)
        expect(wrapper.find('.perServingText')).toHaveLength(1)
      })
    })

    describe('When the variant list is on the recipe grid', () => {
      describe('When the the recipe is checked', () => {
        const wrapper = mount(
          <AlternativeOptionItem
            recipeId="1230"
            recipeName="Chicken curry"
            changeCheckedRecipe={() => {}}
            isChecked
            isOnDetailScreen={false}
            isOutOfStock={false}
          />,
        )
        test('then it should render a radio button input not in a box', () => {
          expect(wrapper.find('.listItem')).toHaveLength(1)
        })
      })

      describe('When the recipe is not checked', () => {
        const wrapper = mount(
          <AlternativeOptionItem
            recipeId="1230"
            recipeName="Chicken curry"
            changeCheckedRecipe={() => {}}
            isChecked={false}
            isOnDetailScreen={false}
            isOutOfStock={false}
          />,
        )
        test('then it should render a radio button input not in a box', () => {
          expect(wrapper.find('.listItem')).toHaveLength(1)
        })
      })

      describe('When the recipe has a surcharge', () => {
        const wrapper = mount(
          <AlternativeOptionItem
            key="1230"
            recipeId="1230"
            recipeName="Chicken curry"
            changeCheckedRecipe={() => {}}
            isChecked={false}
            isOnDetailScreen={false}
            surcharge={0.75}
            isOutOfStock={false}
          />,
        )
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
    const wrapper = mount(
      <AlternativeOptionItem
        recipeId={recipeId}
        recipeName="Chicken curry"
        changeCheckedRecipe={changeCheckedRecipe}
        isChecked={false}
        isOnDetailScreen={false}
        isOutOfStock={isOutOfStock}
      />,
    )

    const changeRadio: () => void = wrapper.find(InputRadio).first().prop('onChange')

    test('should call changeCheckedRecipe', () => {
      changeRadio()

      expect(changeCheckedRecipe).toHaveBeenCalled()
    })
  })
})
