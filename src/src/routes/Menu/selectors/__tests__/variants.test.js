import Immutable from 'immutable'
import { getVariantsForRecipe, getAlternativesForRecipe, getSidesForRecipe, getSidesData } from '../variants'

describe('getVariantsForRecipe', () => {
  describe('when no variants', () => {
    const variants = null
    const coreRecipeId = '123'

    test('should return null', () => {
      const result = getVariantsForRecipe.resultFunc(variants, coreRecipeId)
      expect(result).toBe(null)
    })
  })

  describe('when no recipeVariants', () => {
    const variants = Immutable.Map({
      143: {}
    })
    const coreRecipeId = '123'

    test('should return null', () => {
      const result = getVariantsForRecipe.resultFunc(variants, coreRecipeId)
      expect(result).toBe(null)
    })
  })

  describe('when variants exists for recipe id', () => {
    const variants = Immutable.fromJS({
      123: {
        displayName: 'recipe',
        alternatives: [{
          id: 'abd123',
          coreRecipeId: '132',
          displayName: 'recipeVariant'
        }]
      }
    })
    const coreRecipeId = '123'

    test('should return variant', () => {
      const result = getVariantsForRecipe.resultFunc(variants, coreRecipeId)
      expect(result).toEqual({
        type: 'alternatives',
        alternatives: Immutable.fromJS(
          [
            {
              id: 'abd123',
              coreRecipeId: '132',
              displayName: 'recipeVariant'
            }
          ]
        ),
        variantsList: Immutable.fromJS(
          [
            {
              id: 'abd123',
              coreRecipeId: '132',
              displayName: 'recipeVariant'
            }
          ]
        )
      })
    })
  })
})

describe('getAlternativesForRecipe', () => {
  describe('when no variants', () => {
    const variants = null
    const coreRecipeId = '123'

    test('should return null', () => {
      const result = getAlternativesForRecipe.resultFunc(variants, coreRecipeId)
      expect(result).toBe(null)
    })
  })

  describe('when no recipeVariants', () => {
    const variants = Immutable.Map({
      143: {}
    })
    const coreRecipeId = '123'

    test('should return null', () => {
      const result = getAlternativesForRecipe.resultFunc(variants, coreRecipeId)
      expect(result).toBe(null)
    })
  })

  describe('when alternative variants exists for recipe id', () => {
    const variants = Immutable.fromJS({
      123: {
        displayName: 'recipe',
        alternatives: [{
          id: 'abd123',
          coreRecipeId: '132',
          displayName: 'recipeVariant'
        }]
      }
    })
    const coreRecipeId = '123'

    test('should return variant', () => {
      const result = getAlternativesForRecipe.resultFunc(variants, coreRecipeId)
      expect(result).toEqual(Immutable.fromJS(
        [
          {
            id: 'abd123',
            coreRecipeId: '132',
            displayName: 'recipeVariant'
          }
        ]
      ))
    })
  })

  describe('when side variants exists for recipe id', () => {
    const variants = Immutable.fromJS({
      123: {
        displayName: 'recipe',
        sides: [{
          id: 'abd123',
          coreRecipeId: '132',
          displayName: 'recipeVariant'
        }]
      }
    })
    const coreRecipeId = '123'

    test('should return null', () => {
      const result = getAlternativesForRecipe.resultFunc(variants, coreRecipeId)
      expect(result).toEqual(null)
    })
  })
})

describe('getSidesForRecipe', () => {
  describe('when no variants', () => {
    const variants = null
    const coreRecipeId = '123'

    test('should return null', () => {
      const result = getSidesForRecipe.resultFunc(variants, coreRecipeId)
      expect(result).toBe(null)
    })
  })

  describe('when no recipeVariants', () => {
    const variants = Immutable.Map({
      143: {}
    })
    const coreRecipeId = '123'

    test('should return null', () => {
      const result = getSidesForRecipe.resultFunc(variants, coreRecipeId)
      expect(result).toBe(null)
    })
  })

  describe('when side variants exists for recipe id', () => {
    const variants = Immutable.fromJS({
      123: {
        displayName: 'recipe',
        sides: [{
          id: 'abd123',
          coreRecipeId: '132',
          displayName: 'recipeVariant'
        }]
      }
    })
    const coreRecipeId = '123'

    test('should return variant', () => {
      const result = getSidesForRecipe.resultFunc(variants, coreRecipeId)
      expect(result).toEqual(Immutable.fromJS(
        [
          {
            id: 'abd123',
            coreRecipeId: '132',
            displayName: 'recipeVariant'
          }
        ]
      ))
    })
  })

  describe('when alternative variants exists for recipe id', () => {
    const variants = Immutable.fromJS({
      123: {
        displayName: 'recipe',
        alternatives: [{
          id: 'abd123',
          coreRecipeId: '132',
          displayName: 'recipeVariant'
        }]
      }
    })
    const coreRecipeId = '123'

    test('should return null', () => {
      const result = getSidesForRecipe.resultFunc(variants, coreRecipeId)
      expect(result).toEqual(null)
    })
  })

  describe('getSidesData without sides', () => {
    const menuId = '321'
    const recipeId = '123'

    const recipe = Immutable.fromJS({
      id: recipeId,
      title: 'Chicken curry',
      isNew: true,
      isFineDineIn: true,
    })
    const state = {
      recipes: Immutable.fromJS({
        [recipeId]: recipe,
      }),
      basket: Immutable.fromJS({
        numPortions: 2,
        recipes: {},
        currentMenuId: menuId,
      }),
      menuRecipeStock: Immutable.fromJS({
        [recipeId]: { 2: 1000, 4: 1000 }
      }),
      menuCollections: Immutable.fromJS({
        a12345: {}
      }),
      menu: Immutable.fromJS({
        menuVariants: Immutable.fromJS({
          [menuId]: {}
        }),
        selectedRecipeSides: {},
      }),
      auth: Immutable.Map({
        isAuthenticated: false,
        accessToken: '',
        refreshToken: '',
        expiresAt: ''
      }),
    }
    const props = {
      recipeId,
    }

    test('should return null', () => {
      const result = getSidesData(state, props)
      expect(result).toEqual({firstSideRecipeId: null, hasSideAddedToBasket: false, hasSides: false, recipeVariants: null, sides: []})
    })
  })

  describe('getSidesData with sides', () => {
    const menuId = '321'
    const recipeId = '123'

    const recipe = Immutable.fromJS({
      id: recipeId,
      title: 'Chicken curry',
      isNew: true,
      isFineDineIn: true,
    })
    const state = {
      recipes: Immutable.fromJS({
        [recipeId]: recipe,
      }),
      basket: Immutable.fromJS({
        numPortions: 2,
        recipes: {},
        currentMenuId: menuId,
      }),
      menuRecipeStock: Immutable.fromJS({
        [recipeId]: { 2: 1000, 4: 1000 }
      }),
      menuCollections: Immutable.fromJS({
        a12345: {}
      }),
      menu: Immutable.fromJS({
        menuVariants: Immutable.fromJS({
          [menuId]: {
            [recipeId]: {
              sides: [
                {
                  coreRecipeId: '1000'
                }
              ]
            }
          }
        }),
        selectedRecipeSides: {},
      }),
      auth: Immutable.Map({
        isAuthenticated: false,
        accessToken: '',
        refreshToken: '',
        expiresAt: ''
      }),
    }
    const props = {
      recipeId,
    }

    test('should return null', () => {
      const result = getSidesData(state, props)
      expect(result).toEqual({firstSideRecipeId: '1000', hasSideAddedToBasket: false, hasSides: true, recipeVariants: {sides: Immutable.List([Immutable.Map({coreRecipeId: '1000'})]), type: 'sides', variantsList: Immutable.List([Immutable.Map({coreRecipeId: '1000'})]) }, sides: [{coreRecipeId: '1000'}]})
    })
  })
})
