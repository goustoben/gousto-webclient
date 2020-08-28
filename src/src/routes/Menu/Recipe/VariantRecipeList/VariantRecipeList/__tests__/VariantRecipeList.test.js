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
      const recipeVariantsArray = [
        { id: '1230-1230', coreRecipeId: '1230', displayName: 'Variant One' },
        { id: '1234-1234', coreRecipeId: '1234', displayName: 'Variant Two' }
      ]
      let recipeVariants = {
        type: 'sides',
        variantsList: Immutable.fromJS(recipeVariantsArray)
      }
      const selectedRecipe = {
        displayName: 'Chicken curry',
        coreRecipeId: '6789'
      }

      beforeEach(() => {
        wrapper = shallow(<VariantRecipeList
          recipeVariants={recipeVariants}
          recipeVariantsArray={recipeVariantsArray}
          selectedRecipe={selectedRecipe}
          originalId="9999"
          collectionId="1234abcd"
          isOnDetailScreen={false}
          selectRecipeVariant={() => { }}
          menuRecipeDetailVisibilityChange={() => { }}
          trackVariantListDisplay={() => { }}
          selectRecipeSide={() => {}}
        />)
      })
      test('then it should render the recipe list', () => {
        expect(wrapper.find('.recipeList')).toHaveLength(1)
      })

      test('should render sorted variants', () => {
        expect(wrapper.find(VariantRecipeListItemContainer).at(0).prop('recipeName')).toEqual('Variant One')
        expect(wrapper.find(VariantRecipeListItemContainer).at(1).prop('recipeName')).toEqual('Variant Two')
        expect(wrapper.find(VariantRecipeListItemContainer).at(2).prop('recipeName')).toEqual('Chicken curry')
      })

      describe('When user is on details screen', () => {
        beforeEach(() => {
          wrapper = shallow(<VariantRecipeList
            recipeVariants={recipeVariants}
            recipeVariantsArray={recipeVariantsArray}
            selectedRecipe={selectedRecipe}
            originalId="9999"
            collectionId="1234abcd"
            isOnDetailScreen
            selectRecipeVariant={() => { }}
            menuRecipeDetailVisibilityChange={() => { }}
            trackVariantListDisplay={() => { }}
          />)
        })

        it('should not sort variants', () => {
          expect(wrapper.find(VariantRecipeListItemContainer).at(0).prop('recipeName')).toEqual('Variant One')
          expect(wrapper.find(VariantRecipeListItemContainer).at(1).prop('recipeName')).toEqual('Variant Two')
        })
      })

      describe('When user clicks on variant', () => {
        const selectRecipeVariant = jest.fn()
        const trackVariantListDisplay = jest.fn()

        let eventSpy
        beforeEach(() => {
          recipeVariants = {
            type: null,
            variantsList: Immutable.fromJS([])
          }
          wrapper = shallow(<VariantRecipeList
            recipeVariants={recipeVariants}
            recipeVariantsArray={recipeVariantsArray}
            selectedRecipe={selectedRecipe}
            originalId="9999"
            collectionId="1234abcd"
            isOnDetailScreen={false}
            selectRecipeVariant={selectRecipeVariant}
            menuRecipeDetailVisibilityChange={() => { }}
            trackVariantListDisplay={trackVariantListDisplay}
            selectRecipeSide={() => {}}
          />)
          eventSpy = {
            stopPropagation: jest.fn(),
          }
        })
        test('should call selectRecipeVariant', () => {
          const changeCheckedRecipe = wrapper.find(VariantRecipeListItemContainer).first().prop('changeCheckedRecipe')

          changeCheckedRecipe(recipeVariantsArray[0].coreRecipeId, false)
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
              recipeVariantsArray={recipeVariantsArray}
              selectedRecipe={selectedRecipe}
              collectionId="1234abcd"
              isOnDetailScreen
              selectRecipeVariant={() => { }}
              menuRecipeDetailVisibilityChange={menuRecipeDetailVisibilityChange}
              trackVariantListDisplay={trackVariantListDisplay}
              selectRecipeSide={() => {}}
            />)
          })
          test('should call menuRecipeDetailVisibilityChange', () => {
            const changeCheckedRecipe = wrapper.find(VariantRecipeListItemContainer).first().prop('changeCheckedRecipe')

            changeCheckedRecipe(recipeVariantsArray[0].coreRecipeId, false)

            expect(menuRecipeDetailVisibilityChange).toHaveBeenCalledWith('1230')
          })

          test('should call trackVariantListDisplay with details', () => {
            expect(trackVariantListDisplay).toHaveBeenCalledWith('details')
          })
        })
      })

      describe('When user clicks on variant with sides', () => {
        const selectRecipeVariant = jest.fn()
        const trackVariantListDisplay = jest.fn()
        const selectRecipeSide = jest.fn()
        const unselectRecipeSide = jest.fn()
        const basketRecipeAdd = jest.fn()
        const basketRecipeRemove = jest.fn()

        beforeEach(() => {
          recipeVariants = {
            type: 'sides',
            variantsList: Immutable.fromJS(recipeVariantsArray)
          }
          wrapper = shallow(<VariantRecipeList
            recipeVariants={recipeVariants}
            recipeVariantsArray={recipeVariantsArray}
            selectedRecipe={selectedRecipe}
            originalId="9999"
            collectionId="1234abcd"
            isOnDetailScreen={false}
            selectRecipeVariant={selectRecipeVariant}
            menuRecipeDetailVisibilityChange={() => { }}
            trackVariantListDisplay={trackVariantListDisplay}
            selectRecipeSide={selectRecipeSide}
            basketRecipeAdd={basketRecipeAdd}
            basketRecipeRemove={basketRecipeRemove}
            unselectRecipeSide={unselectRecipeSide}
          />)
        })
        test('should call selectRecipeVariant', () => {
          const changeCheckedRecipe = wrapper.find(VariantRecipeListItemContainer).first().prop('changeCheckedRecipe')

          changeCheckedRecipe(recipeVariantsArray[0].coreRecipeId, false)
          expect(selectRecipeSide).toHaveBeenCalledWith('9999', '1230')
        })

        test('should call unselectRecipeSide', () => {
          wrapper.setProps({ selectedRecipeSide: '567' })
          const changeCheckedRecipe = wrapper.find(VariantRecipeListItemContainer).first().prop('changeCheckedRecipe')

          changeCheckedRecipe(recipeVariantsArray[0].coreRecipeId, false)
          expect(unselectRecipeSide).toHaveBeenCalledWith('9999')
        })

        test('should call basketRecipeAdd', () => {
          wrapper.setProps({ hasRecipeAddedToBasket: true, firstSideRecipeId: '8888' })
          const changeCheckedRecipe = wrapper.find(VariantRecipeListItemContainer).first().prop('changeCheckedRecipe')

          changeCheckedRecipe(recipeVariantsArray[0].coreRecipeId, false)
          expect(basketRecipeAdd).toHaveBeenCalledWith('8888')
          expect(basketRecipeRemove).toHaveBeenCalledWith('9999')
          expect(selectRecipeSide).toHaveBeenCalledWith('9999', '1230')
        })

        describe('when has side added to basket', () => {
          describe('when changing checked recipe', () => {
            test('should swap side with base recipe', () => {
              wrapper.setProps({ hasSideAddedToBasket: true, firstSideRecipeId: '8888' })
              const changeCheckedRecipe = wrapper.find(VariantRecipeListItemContainer).first().prop('changeCheckedRecipe')

              changeCheckedRecipe(recipeVariantsArray[0].coreRecipeId, false)

              expect(basketRecipeRemove).toHaveBeenCalledWith('8888')
              expect(basketRecipeAdd).toHaveBeenCalledWith('9999')
            })
          })
        })
      })
    })

    describe('When recipe variants is an null', () => {
      let wrapper
      const recipeVariantsArray = []
      const recipeVariants = null
      const selectedRecipe = {
        displayName: 'Chicken curry',
        coreRecipeId: '6789'
      }

      beforeEach(() => {
        wrapper = shallow(<VariantRecipeList
          recipeVariants={recipeVariants}
          recipeVariantsArray={recipeVariantsArray}
          selectedRecipe={selectedRecipe}
          collectionId="1234abcd"
          isOnDetailScreen={false}
          selectRecipeVariant={() => { }}
          menuRecipeDetailVisibilityChange={() => { }}
          trackVariantListDisplay={() => { }}
          selectRecipeSide={() => {}}
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
        recipeVariantsArray={[]}
        selectedRecipe={selectedRecipe}
        collectionId="1234abcd"
        isOnDetailScreen={false}
        selectRecipeVariant={() => { }}
        menuRecipeDetailVisibilityChange={() => { }}
        trackVariantListDisplay={() => { }}
        selectRecipeSide={() => {}}
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
                published: true,
                recipesInCollection: ['2334']
              }
            ]),
            menu: Immutable.Map({
              menuVariants: Immutable.Map({
                123: []
              }),
              selectedRecipeSides: {}
            })
          }),
          subscribe: () => { }
        }
      }
    })
    expect(wrapper.find('VariantRecipeList').exists()).toBe(true)
  })

  describe('is in sides modal', () => {
    let wrapper
    const recipeVariantsArray = [
      { id: '1230-1230', coreRecipeId: '1230', displayName: 'Variant One' },
      { id: '1234-1234', coreRecipeId: '1234', displayName: 'Variant Two' }
    ]
    const recipeVariants = {
      type: 'sides',
      variantsList: Immutable.fromJS(recipeVariantsArray)
    }
    const selectedRecipe = {
      displayName: 'Chicken curry',
      coreRecipeId: '6789'
    }

    beforeEach(() => {
      wrapper = shallow(<VariantRecipeList
        recipeVariants={recipeVariants}
        recipeVariantsArray={recipeVariantsArray}
        selectedRecipe={selectedRecipe}
        originalId="9999"
        collectionId="1234abcd"
        isOnDetailScreen={false}
        selectRecipeVariant={() => { }}
        menuRecipeDetailVisibilityChange={() => { }}
        trackVariantListDisplay={() => { }}
        selectRecipeSide={() => {}}
        isOnSidesModal
      />)
    })
    test('then it renders recipeList', () => {
      expect(wrapper.find('.recipeList')).toHaveLength(1)
    })
  })
})
