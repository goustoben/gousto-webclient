import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'
import { VariantRecipeList } from '../VariantRecipeList'
import { VariantRecipeListContainer } from '../VariantRecipeListContainer'
import { VariantRecipeListItemContainer } from '../../VariantRecipeListItem'

describe('VariantRecipeList', () => {
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
        wrapper = shallow(<VariantRecipeList
          recipeVariants={recipeVariants}
          selectedRecipe={selectedRecipe}
          originalId="9999"
          collectionId="1234abcd"
          isOnDetailScreen={false}
          selectRecipeVariant={() => { }}
          menuRecipeDetailVisibilityChange={() => { }}
          trackVariantListDisplay={() => { }}
        />)
      })
      test('then it should render the recipe list', () => {
        expect(wrapper.find('.recipeList')).toHaveLength(1)
      })

      describe('When user clicks on variant', () => {
        const selectRecipeVariant = jest.fn()
        const trackVariantListDisplay = jest.fn()
        let eventSpy
        beforeEach(() => {
          wrapper = shallow(<VariantRecipeList
            recipeVariants={recipeVariants}
            selectedRecipe={selectedRecipe}
            originalId="9999"
            collectionId="1234abcd"
            isOnDetailScreen={false}
            selectRecipeVariant={selectRecipeVariant}
            menuRecipeDetailVisibilityChange={() => { }}
            trackVariantListDisplay={trackVariantListDisplay}
          />)
          eventSpy = {
            stopPropagation: jest.fn(),
          }
        })
        test('should call selectRecipeVariant', () => {
          wrapper.find(VariantRecipeListItemContainer).first().prop('changeCheckedRecipe')({
            target: {
              value: {
                recipeId: recipeVariants[0].coreRecipeId,
                outOfStock: false
              }
            }
          })
          expect(selectRecipeVariant).toHaveBeenCalledWith('9999', '1230', '1234abcd', false, 'grid')
        })

        test('should stop propagation on click event', () => {
          wrapper.find('[role="button"]').first().prop('onClick')(eventSpy)
          expect(eventSpy.stopPropagation).toHaveBeenCalled()
        })

        test('should call trackVariantListDisplay with grid', () => {
          expect(trackVariantListDisplay).toHaveBeenCalledWith('grid')
        })
        describe('When on details screen', () => {
          const menuRecipeDetailVisibilityChange = jest.fn()
          beforeEach(() => {
            wrapper = shallow(<VariantRecipeList
              recipeVariants={recipeVariants}
              selectedRecipe={selectedRecipe}
              collectionId="1234abcd"
              isOnDetailScreen
              selectRecipeVariant={() => { }}
              menuRecipeDetailVisibilityChange={menuRecipeDetailVisibilityChange}
              trackVariantListDisplay={trackVariantListDisplay}
            />)
          })
          test('should call menuRecipeDetailVisibilityChange', () => {
            wrapper.find(VariantRecipeListItemContainer).first().prop('changeCheckedRecipe')({
              target: {
                value: {
                  recipeId: recipeVariants[0].coreRecipeId,
                  outOfStock: false
                }
              }
            })
            expect(menuRecipeDetailVisibilityChange).toHaveBeenCalledWith('1230')
          })

          test('should call trackVariantListDisplay with details', () => {
            expect(trackVariantListDisplay).toHaveBeenCalledWith('details')
          })
        })
      })
    })

    describe('When recipe variants is an empty array', () => {
      let wrapper
      const recipeVariants = []
      const selectedRecipe = {
        displayName: 'Chicken curry',
        coreRecipeId: '6789'
      }

      beforeEach(() => {
        wrapper = shallow(<VariantRecipeList
          recipeVariants={recipeVariants}
          selectedRecipe={selectedRecipe}
          collectionId="1234abcd"
          isOnDetailScreen={false}
          selectRecipeVariant={() => { }}
          menuRecipeDetailVisibilityChange={() => { }}
          trackVariantListDisplay={() => { }}
        />)
      })
      test('then it should not render a recipe list', () => {
        expect(wrapper.find('.recipeList')).toHaveLength(0)
      })
    })
  })

  describe('When there are no recipe variants', () => {
    let wrapper
    const recipeVariants = null
    const selectedRecipe = {
      displayName: 'Chicken curry',
      coreRecipeId: '6789'
    }

    beforeEach(() => {
      wrapper = shallow(<VariantRecipeList
        recipeVariants={recipeVariants}
        selectedRecipe={selectedRecipe}
        collectionId="1234abcd"
        isOnDetailScreen={false}
        selectRecipeVariant={() => { }}
        menuRecipeDetailVisibilityChange={() => { }}
        trackVariantListDisplay={() => { }}
      />)
    })
    test('then it should not render a recipe list', () => {
      expect(wrapper.find('.recipeList')).toHaveLength(0)
    })
  })
})

describe('VariantRecipeListContainer', () => {
  test('should render VariantRecipeList', () => {
    const wrapper = shallow(<VariantRecipeListContainer recipeId="123" />, {
      context: {
        store: {
          dispatch: () => { },
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
                  collection: 'all-recipes'
                }
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
          subscribe: () => { }
        }
      }
    })
    expect(wrapper.find('VariantRecipeList').exists()).toBe(true)
  })
})
