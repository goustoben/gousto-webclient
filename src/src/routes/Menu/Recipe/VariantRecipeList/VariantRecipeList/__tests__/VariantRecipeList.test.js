import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'
import { safeJestMock } from '_testing/mocks'
import { VariantRecipeList } from '../VariantRecipeList'
import { VariantRecipeListContainer } from '../VariantRecipeListContainer'
import { VariantRecipeListItemContainer } from '../../VariantRecipeListItem'
import * as variantsActions from '../../../../selectors/variants'

describe('VariantRecipeList', () => {
  describe('When there is an array of recipe variants', () => {
    describe('When there are recipe variants', () => {
      let wrapper
      const recipeVariantsArray = [
        { id: '1230-1230', coreRecipeId: '1230', displayName: 'Variant One' },
        { id: '1234-1234', coreRecipeId: '1234', displayName: 'Variant Two' }
      ]
      let recipeVariants = {
        type: 'alternatives',
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
          />)
          eventSpy = {
            stopPropagation: jest.fn(),
          }
        })
        test('should call selectRecipeVariant', () => {
          const changeCheckedRecipe = wrapper.find(VariantRecipeListItemContainer).first().prop('changeCheckedRecipe')

          changeCheckedRecipe(recipeVariantsArray[0].coreRecipeId, false)
          expect(selectRecipeVariant).toHaveBeenCalledWith('9999', '1230', '1234abcd', false, 'grid', true)
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
      />)
    })
    test('then it should not render a recipe list', () => {
      expect(wrapper.find('.recipeList')).toHaveLength(0)
    })
  })
})

describe('VariantRecipeListContainer', () => {
  const getSidesDataMock = safeJestMock(variantsActions, 'getSidesData')
  let wrapper
  const state = {
    recipes: Immutable.fromJS({
      123: {
        id: 123,
        title: 'recipe-title'
      }
    }),
    basket: Immutable.fromJS({
      numPortion: 2,
      currentMenuId: '375'
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
        123: [],
        234: []
      }),
    })
  }

  describe('when getting variants', () => {
    beforeEach(() => {
      getSidesDataMock.mockReturnValue([])
      wrapper = shallow(<VariantRecipeListContainer recipeId="123" originalId="234" />, {
        context: {
          store: {
            dispatch: () => { },
            getState: () => ({
              ...state,
              basket: Immutable.fromJS({
                numPortion: 2,
                currentMenuId: '373'
              }),
              menuRecipeDetails: Immutable.Map({})
            }),
            subscribe: () => { }
          }
        }
      })
    })

    test('should call getSidesDataMock with recipeId', () => {
      expect(getSidesDataMock.mock.calls[0][1]).toEqual({recipeId: '123', categoryId: null})
    })
  })

  describe('when has category id in props', () => {
    beforeEach(() => {
      getSidesDataMock.mockReset()
      getSidesDataMock.mockReturnValue([])
      wrapper = shallow(<VariantRecipeListContainer recipeId="123" originalId="234" categoryId="category-1" />, {
        context: {
          store: {
            dispatch: () => { },
            getState: () => ({
              ...state,
              basket: Immutable.fromJS({
                numPortion: 2,
                currentMenuId: '373'
              }),
              menuRecipeDetails: Immutable.Map({})
            }),
            subscribe: () => { }
          }
        }
      })
    })

    test('should call getSidesDataMock with recipeId', () => {
      expect(getSidesDataMock.mock.calls[0][1]).toEqual({recipeId: '123', categoryId: 'category-1'})
    })
  })
})
