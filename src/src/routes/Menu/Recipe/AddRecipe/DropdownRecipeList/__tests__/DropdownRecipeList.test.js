import React from 'react'
import { mount } from 'enzyme'
import Immutable from 'immutable'
import { DropdownRecipeList } from '../DropdownRecipeList'
import { DropdownRecipeListContainer } from '../DropdownRecipeListContainer'

describe('DropdownRecipeList', () => {
  describe('When there is an array of recipe variants', () => {
    describe('When there are recipe variants', () => {
      let wrapper
      const recipeVariants = [
        { id: '1230-1230', coreRecipeId: '1230', displayName: 'Variant One' },
        { id: '1234-1234', coreRecipeId: '1234', displayName: 'Variant Two' }
      ]
      const selectedRecipe = {
        displayName: 'Chicken curry',
        coreRecipeId: '6789'
      }

      beforeEach(() => {
        wrapper = mount(<DropdownRecipeList
          recipeVariants={recipeVariants}
          selectedRecipe={selectedRecipe}
          collectionId="1234abcd"
          isOnDetailScreen={false}
          selectRecipeVariant={() => {}}
          menuRecipeDetailVisibilityChange={() => {}}
          trackVariantListDisplay={() => {}}
        />)
      })
      test('then it should render the dropdown list', () => {
        expect(wrapper.find('.dropdownList')).toHaveLength(1)
      })

      test('then it should render an unordered list', () => {
        expect(wrapper.find('.dropdownListText')).toHaveLength(1)
      })

      test('then it should render three radio button inputs', () => {
        expect(wrapper.find('.listItem')).toHaveLength(3)
      })

      describe('When the user has not yet selected a variant', () => {
        test('then the default recipe should have a checked radio button', () => {
          expect(wrapper.find('input[value="6789"]').prop('checked')).toEqual(true)
        })

        test('then the variants should not have a checked radio button', () => {
          expect(wrapper.find('input[value="1230"]').prop('checked')).toEqual(false)
          expect(wrapper.find('input[value="1234"]').prop('checked')).toEqual(false)
        })
      })

      describe('When user clicks on variant', () => {
        const selectRecipeVariant = jest.fn()
        const trackVariantListDisplay = jest.fn()
        beforeEach(() => {
          wrapper = mount(<DropdownRecipeList
            recipeVariants={recipeVariants}
            selectedRecipe={selectedRecipe}
            collectionId="1234abcd"
            isOnDetailScreen={false}
            selectRecipeVariant={selectRecipeVariant}
            menuRecipeDetailVisibilityChange={() => {}}
            trackVariantListDisplay={trackVariantListDisplay}
          />)
        })
        test('should call selectRecipeVariant', () => {
          wrapper.find('input[value="1230"]').first().simulate('change')
          expect(selectRecipeVariant).toHaveBeenCalledWith('6789', '1230', '1234abcd', 'grid')
        })

        test('should call trackVariantListDisplay with grid', () => {
          expect(trackVariantListDisplay).toHaveBeenCalledWith('grid')
        })
        describe('When on details screen', () => {
          const menuRecipeDetailVisibilityChange = jest.fn()
          beforeEach(() => {
            wrapper = mount(<DropdownRecipeList
              recipeVariants={recipeVariants}
              selectedRecipe={selectedRecipe}
              collectionId="1234abcd"
              isOnDetailScreen
              selectRecipeVariant={() => {}}
              menuRecipeDetailVisibilityChange={menuRecipeDetailVisibilityChange}
              trackVariantListDisplay={trackVariantListDisplay}
            />)
          })
          test('should call menuRecipeDetailVisibilityChange', () => {
            wrapper.find('input[value="1230"]').first().simulate('change')
            expect(menuRecipeDetailVisibilityChange).toHaveBeenCalledWith('1230')
          })

          test('should call trackVariantListDisplay with details', () => {
            expect(trackVariantListDisplay).toHaveBeenCalledWith('details')
          })
        })
      })
    })
  })
})

describe('DropdownRecipeListContainer', () => {
  test('should render DropdownRecipeList', () => {
    const wrapper = mount(<DropdownRecipeListContainer recipeId="123" />, {
      context: {
        store: {
          dispatch: () => {},
          getState: () => ({
            recipes: Immutable.fromJS({
              123: {
                id: 123,
                title: 'recipe-title'
              }
            }),
            basket: Immutable.fromJS({
              numPortion: 2
            }),
            routing: {
              locationBeforeTransitions: {
                query: {
                  collection: 'all-recipes'}
              }
            },
            menuCollections: Immutable.fromJS([
              {
                id: '1234adb',
                slug: 'all-recipes',
                published: true
              }
            ]),
            menuCollectionRecipes: Immutable.Map({
              '1234adb': Immutable.List(['2334']),
            }),
            menu: Immutable.Map({
              menuVariants: Immutable.Map({
                123: []
              })
            })
          }),
          subscribe: () => {}
        }
      }
    })
    expect(wrapper.find('DropdownRecipeList').exists()).toBe(true)
  })
})
