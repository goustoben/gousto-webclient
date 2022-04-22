import Immutable from 'immutable'
import { renderHook } from '@testing-library/react-hooks'
import { CollectionSlug } from '../../../domains/collections'
import * as BasketHooks from '../../../domains/basket'
import * as RecipeContext from '../../../context/recipeContext'
import { useAttributes } from './useAttributes'

const getRecipe = ({
  chefPrepared = false,
  cookingTime = 30,
  cookingTimeFamily = 40,
  equipment = Immutable.List([]),
  shelfLifeDays = '2',
  fiveADay = 3,
  dietType = 'vegan',
  nutritionalInformation = {
    perPortion: {
      energyKcal: 100,
    },
  },
  cuisine = 'british',
  dietaryClaims = [
    {
      name: 'Gluten free',
      slug: CollectionSlug.GlutenFree,
    },
  ],
}: any = {}) =>
  Immutable.fromJS({
    id: 'recipe identification string',
    title: 'Sweet Chilli Turkey Noodles',
    rating: {
      count: 0,
      average: 0,
    },
    ...(chefPrepared !== undefined && { chefPrepared }),
    ...(cookingTime !== undefined && { cookingTime }),
    ...(cookingTimeFamily !== undefined && { cookingTimeFamily }),
    ...(equipment !== undefined && { equipment }),
    ...(shelfLifeDays !== undefined && { shelfLifeDays }),
    ...(fiveADay !== undefined && { fiveADay }),
    ...(dietType !== undefined && { dietType }),
    nutritionalInformation,
    ...(cuisine !== undefined && { cuisine }),
    ...(dietaryClaims !== undefined && { dietaryClaims }),
  })

const mockRecipeContext = (args?: any) =>
  jest.spyOn(RecipeContext, 'useRecipe').mockImplementation(() => getRecipe(args))

describe('useAttributes', () => {
  beforeAll(() => {
    jest.spyOn(BasketHooks, 'useBasket').mockImplementation(
      () =>
        ({
          numPortions: 2,
        } as any),
    )
  })

  afterEach(() => jest.clearAllMocks())

  describe('numPortions', () => {
    describe('when chefPrepared is TRUE', () => {
      describe('when has a TRUTHY value', () => {
        beforeEach(() => mockRecipeContext({ chefPrepared: true }))

        test('should appear in the result structure', () => {
          const { result } = renderHook(() => useAttributes())
          expect(result.current?.[0]).toEqual({
            name: 'numPortions',
            value: 2,
            icon: 'icon-servings',
            show: true,
          })
        })
      })
    })
    describe('when chefPrepared is FALSE', () => {
      describe('when has a TRUTHY value', () => {
        beforeEach(() => mockRecipeContext({ chefPrepared: false }))

        test('should NOT appear in the result structure', () => {
          const { result } = renderHook(() => useAttributes())
          expect(result.current?.map(({ name }: any) => name).indexOf('numPortions')).toEqual(-1)
        })
      })
    })
  })

  describe('cookingTime', () => {
    describe('when chefPrepared is ON', () => {
      describe('when cookingTime=ON', () => {
        beforeEach(() => mockRecipeContext({ chefPrepared: true, cookingTime: 10 }))
        test('should NOT be on the list', () => {
          const { result } = renderHook(() => useAttributes())
          expect(result.current?.map(({ name }: any) => name).indexOf('cookingTime')).toEqual(-1)
        })
      })
      describe('when cookingTime=OFF', () => {
        beforeEach(() => mockRecipeContext({ chefPrepared: true, cookingTime: 0 }))
        test('should NOT be on the list', () => {
          const { result } = renderHook(() => useAttributes())
          expect(result.current?.map(({ name }: any) => name).indexOf('cookingTime')).toEqual(-1)
        })
      })
    })
    describe('when chefPrepared is OFF', () => {
      describe('when cookingTime=ON', () => {
        beforeEach(() => mockRecipeContext({ chefPrepared: false, cookingTime: 10 }))
        test('should be on the list', () => {
          const { result } = renderHook(() => useAttributes())
          expect(
            result.current?.map(({ name }: any) => name).indexOf('cookingTime') as any,
          ).toBeGreaterThan(-1)
          expect(result.current?.[0]).toEqual({
            name: 'cookingTime',
            value: 10,
            icon: 'icon-time',
            show: true,
          })
        })
      })
      describe('when cookinfTime=OFF', () => {
        beforeEach(() => mockRecipeContext({ chefPrepared: false, cookingTime: 0 }))
        test('should NOT be on the list', () => {
          const { result } = renderHook(() => useAttributes())
          expect(result.current?.map(({ name }: any) => name).indexOf('cookingTime')).toEqual(-1)
        })
      })
    })
  })

  describe('useWithin', () => {
    describe('when shelfLifeDays is defined', () => {
      beforeEach(() => mockRecipeContext({ shelfLifeDays: '12' }))
      test('should be on the resulting list', () => {
        const { result } = renderHook(() => useAttributes())
        const index = result.current?.map(({ name }: any) => name).indexOf('useWithin') as any
        expect(index).toBeGreaterThan(-1)
        expect(result.current?.[index]).toEqual({
          name: 'useWithin',
          value: '12',
          icon: 'icon-use-within',
          show: true,
        })
      })
    })
    describe('when shelfLifeDays is not defined', () => {
      beforeEach(() => mockRecipeContext({ shelfLifeDays: null }))
      test('should NOT be on the list', () => {
        const { result } = renderHook(() => useAttributes())
        expect(result.current?.map(({ name }: any) => name).indexOf('useWithin')).toEqual(-1)
      })
    })
  })

  describe('glutenFree', () => {
    describe('when there is gluten-free tag', () => {
      beforeEach(() =>
        mockRecipeContext({
          dietaryClaims: [
            {
              name: 'Gluten free',
              slug: CollectionSlug.GlutenFree,
            },
          ],
        }),
      )
      test('should be on the list', () => {
        const { result } = renderHook(() => useAttributes())
        const index = result.current?.map(({ name }: any) => name).indexOf('glutenFree') as any
        expect(index).toBeGreaterThan(-1)
        expect(result.current?.[index]).toEqual({
          name: 'glutenFree',
          value: true,
          icon: 'icon-gluten-free',
          show: true,
        })
      })
    })
    describe('when there is NO tags', () => {
      beforeEach(() => mockRecipeContext({ dietaryClaims: [] }))
      test('should NOT be on the list', () => {
        const { result } = renderHook(() => useAttributes())
        expect(result.current?.map(({ name }: any) => name).indexOf('glutenFree')).toEqual(-1)
      })
    })
  })

  describe('dairyFree', () => {
    describe('when there is dairy-free tag', () => {
      beforeEach(() =>
        mockRecipeContext({
          dietaryClaims: [
            {
              name: 'Dairy free',
              slug: CollectionSlug.DairyFree,
            },
          ],
        }),
      )
      test('should be on the list', () => {
        const { result } = renderHook(() => useAttributes())
        const index = result.current?.map(({ name }: any) => name).indexOf('dairyFree') as any
        expect(index).toBeGreaterThan(-1)
        expect(result.current?.[index]).toEqual({
          name: 'dairyFree',
          value: true,
          icon: 'icon-dairy-free',
          show: true,
        })
      })
    })
    describe('when there is NO tags', () => {
      beforeEach(() => mockRecipeContext({ dietaryClaims: [] }))
      test('should NOT be on the list', () => {
        const { result } = renderHook(() => useAttributes())
        expect(result.current?.map(({ name }: any) => name).indexOf('dairyFree')).toEqual(-1)
      })
    })
  })

  describe('fiveADay', () => {
    describe('when there is fiveADay attribute on recipe', () => {
      beforeEach(() => mockRecipeContext({ fiveADay: 3 }))
      test('should be on the list', () => {
        const { result } = renderHook(() => useAttributes())
        const index = result.current?.map(({ name }: any) => name).indexOf('fiveADay') as any
        expect(index).toBeGreaterThan(-1)
        expect(result.current?.[index]).toEqual({
          name: 'fiveADay',
          value: 3,
          icon: 'icon-five-a-day',
          show: true,
        })
      })
    })
    describe('when there is NO such attribute', () => {
      beforeEach(() => mockRecipeContext({ fiveADay: 0 }))
      test('should NOT be on the list', () => {
        const { result } = renderHook(() => useAttributes())
        expect(result.current?.map(({ name }: any) => name).indexOf('fiveADay')).toEqual(-1)
      })
    })
  })

  describe('diet', () => {
    describe('when there is dietType attribute on recipe', () => {
      describe('when diet is one that we expose', () => {
        beforeEach(() => mockRecipeContext({ dietType: 'vegan' }))
        test('should be on the list', () => {
          const { result } = renderHook(() => useAttributes())
          const index = result.current?.map(({ name }: any) => name).indexOf('diet') as any
          expect(index).toBeGreaterThan(-1)
          expect(result.current?.[index]).toEqual({
            name: 'diet',
            value: 'vegan',
            icon: 'icon-diet',
            show: true,
          })
        })
      })
      describe('when diet is not listed', () => {
        beforeEach(() => mockRecipeContext({ dietType: 'meat' }))
        test('should NOT be on the list', () => {
          const { result } = renderHook(() => useAttributes())
          expect(result.current?.map(({ name }: any) => name).indexOf('diet')).toEqual(-1)
        })
      })
    })
    describe('when there is NO such attribute', () => {
      beforeEach(() => mockRecipeContext({ dietType: null }))
      test('should NOT be on the list', () => {
        const { result } = renderHook(() => useAttributes())
        expect(result.current?.map(({ name }: any) => name).indexOf('diet')).toEqual(-1)
      })
    })
  })

  describe('cals', () => {
    describe('when there is calories information', () => {
      beforeEach(() =>
        mockRecipeContext({
          nutritionalInformation: {
            perPortion: {
              energyKcal: 120,
            },
          },
        }),
      )
      test('should be on the list', () => {
        const { result } = renderHook(() => useAttributes())
        const index = result.current?.map(({ name }: any) => name).indexOf('cals') as any
        expect(index).toBeGreaterThan(-1)
        expect(result.current?.[index]).toEqual({
          name: 'cals',
          value: 120,
          icon: 'icon-calories',
          show: true,
        })
      })
    })
    describe('when there is NO calories information', () => {
      beforeEach(() => mockRecipeContext({ nutritionalInformation: null }))
      test('should NOT be on the list', () => {
        const { result } = renderHook(() => useAttributes())
        expect(result.current?.map(({ name }: any) => name).indexOf('cals')).toEqual(-1)
      })
    })
  })

  describe('cuisine', () => {
    describe('when there is cuisine information', () => {
      beforeEach(() => mockRecipeContext({ cuisine: 'british' }))
      test('should be on the list', () => {
        const { result } = renderHook(() => useAttributes())
        const index = result.current?.map(({ name }: any) => name).indexOf('cuisine') as any
        expect(index).toBeGreaterThan(-1)
        expect(result.current?.[index]).toEqual({
          name: 'cuisine',
          value: 'british',
          icon: 'icon-cuisine',
          show: true,
        })
      })
    })
    describe('when there is NO cuisine', () => {
      beforeEach(() => mockRecipeContext({ cuisine: null }))
      test('should NOT be on the list', () => {
        const { result } = renderHook(() => useAttributes())
        expect(result.current?.map(({ name }: any) => name).indexOf('cuisine')).toEqual(-1)
      })
    })
  })

  describe('maxNoAttributes', () => {
    describe('when not passed', () => {
      beforeEach(() => mockRecipeContext())
      test('all attributes are shown', () => {
        const { result } = renderHook(() => useAttributes())
        expect(result.current?.length).toEqual(7)
      })
    })
    describe('when defined', () => {
      beforeEach(() => mockRecipeContext())
      test('no more than defined number of options are shown', () => {
        const { result } = renderHook(() => useAttributes({ maxNoAttributes: 3 }))
        expect(result.current?.length).toEqual(3)
      })
    })
  })
})
