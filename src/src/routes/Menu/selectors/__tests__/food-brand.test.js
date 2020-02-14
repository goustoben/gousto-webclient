import Immutable from 'immutable'
import { getFoodBrandForSlug } from '../food-brand'

const createRecipe = (id, foodBrandInfo) => Immutable.fromJS({
  id,
  taxonomy: [
    {
      name: 'Food Brands',
      slug: 'food-brands',
      tags: [
        foodBrandInfo
      ]
    }
  ]
})

describe('Food Brand selectors', () => {
  const tenMinuteMeals = { name: '10 Minute Meals', slug: '10-minute-meals' }
  const globalKitchen = { name: 'Global Kitchen', slug: 'global-kitchen' }
  const firstRecipe = createRecipe('100', tenMinuteMeals)
  const secondRecipe = createRecipe('101', tenMinuteMeals)
  const thirdRecipe = createRecipe('102', globalKitchen)
  const inputRecipes = Immutable.fromJS([firstRecipe, secondRecipe, thirdRecipe])
  const inStockRecipes = Immutable.fromJS([secondRecipe])

  describe('getFoodBrandForSlug', () => {
    describe('when the slug is "10-minute-meals"', () => {
      test('should return the correct food brand', () => {
        const { foodBrand } = getFoodBrandForSlug.resultFunc(inputRecipes, inStockRecipes)('10-minute-meals')

        expect(foodBrand).toEqual(Immutable.fromJS(tenMinuteMeals))
      })

      test('should return all matching recipes with in stock first', () => {
        const { recipes } = getFoodBrandForSlug.resultFunc(inputRecipes, inStockRecipes)('10-minute-meals')

        expect(recipes).toEqual(Immutable.List([secondRecipe, firstRecipe]))
      })

      test('should return all matching recipeIds in original order', () => {
        const { recipeIds } = getFoodBrandForSlug.resultFunc(inputRecipes, inStockRecipes)('10-minute-meals')

        expect(recipeIds).toEqual(Immutable.List([
          firstRecipe.get('id'), secondRecipe.get('id')
        ]))
      })
    })

    describe('when the slug is "global-kitchen"', () => {
      test('should return the correct food brand', () => {
        const { foodBrand } = getFoodBrandForSlug.resultFunc(inputRecipes, inStockRecipes)('global-kitchen')

        expect(foodBrand).toEqual(Immutable.fromJS(globalKitchen))
      })

      test('should return all matching recipes', () => {
        const { recipes } = getFoodBrandForSlug.resultFunc(inputRecipes, inStockRecipes)('global-kitchen')

        expect(recipes).toEqual(Immutable.List([thirdRecipe]) )
      })

      test('should return all matching recipeIds in original order', () => {
        const { recipeIds } = getFoodBrandForSlug.resultFunc(inputRecipes, inStockRecipes)('global-kitchen')

        expect(recipeIds).toEqual(Immutable.List([thirdRecipe.get('id')]))
      })
    })

    describe('when slug matches no recipes', () => {
      test('should return null', () => {
        const result = getFoodBrandForSlug.resultFunc(inputRecipes, inStockRecipes)('some-non-matching-slug')

        expect(result).toEqual(null)
      })
    })
  })
})
