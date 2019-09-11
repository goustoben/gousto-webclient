import actionTypes from 'actions/actionTypes'
import Immutable from 'immutable' /* eslint-disable new-cap */
import cookbookReducer, { initialState } from 'reducers/cookbook'

describe('cookbook reducer', () => {
  test('should handle initial state', () => {
    expect(
      Immutable.is(cookbookReducer.cookbook(undefined, {}), initialState),
    ).toEqual(true)
  })

  test('should handle unknown actions', () => {
    const result = cookbookReducer.cookbook(initialState, { type: 'unknown' })

    expect(Immutable.is(result, initialState)).toEqual(true)
  })

  describe('COOKBOOK_RECIEVE_COLLECTIONS', () => {
    test('should add list of collection ids to collectionSets state keyed by setNum', () => {
      const result = cookbookReducer.cookbook(initialState, {
        type: actionTypes.COOKBOOK_RECIEVE_COLLECTIONS,
        collections: [
          { id: 'collection-1', title: 'collection 1' },
          { id: 'collection-2', title: 'collection 2' },
        ],
        setNum: 1,
      })

      const collectionSets = Immutable.Map({}).set(
        1,
        Immutable.List(['collection-1', 'collection-2']),
      )
      expect(
        Immutable.is(result.get('collectionSets'), collectionSets),
      ).toEqual(true)
    })

    test('should retain collectionSets already in state', () => {
      const initialCollectionSets = Immutable.Map({}).set(
        2,
        Immutable.List(['collection-3', 'collection-4']),
      )

      const result = cookbookReducer.cookbook(
        Immutable.Map({ collectionSets: initialCollectionSets }),
        {
          type: actionTypes.COOKBOOK_RECIEVE_COLLECTIONS,
          collections: [
            { id: 'collection-1', title: 'collection 1 updated title' },
            { id: 'collection-2', title: 'collection 2' },
          ],
          setNum: 1,
        },
      )

      const expectedCollectionSets = Immutable.Map({})
        .set(2, Immutable.List(['collection-3', 'collection-4']))
        .set(1, Immutable.List(['collection-1', 'collection-2']))
      expect(
        Immutable.is(result.get('collectionSets'), expectedCollectionSets),
      ).toEqual(true)
    })

    test('should override collectionSets already in state matching setNum', () => {
      const initialCollectionSets = Immutable.Map({}).set(
        2,
        Immutable.List(['collection-3', 'collection-4']),
      )

      const result = cookbookReducer.cookbook(
        Immutable.Map({ collectionSets: initialCollectionSets }),
        {
          type: actionTypes.COOKBOOK_RECIEVE_COLLECTIONS,
          collections: [
            { id: 'collection-1', title: 'collection 1 updated title' },
            { id: 'collection-2', title: 'collection 2' },
          ],
          setNum: 2,
        },
      )

      const expectedCollectionSets = Immutable.Map({}).set(
        2,
        Immutable.List(['collection-1', 'collection-2']),
      )
      expect(
        Immutable.is(result.get('collectionSets'), expectedCollectionSets),
      ).toEqual(true)
    })

    test('should set collectionsTotalSets', () => {
      const initialCollectionSets = Immutable.Map({}).set(
        2,
        Immutable.List(['collection-3', 'collection-4']),
      )
      const meta = {
        offset: 0,
        total: 150,
        limit: 20,
      }
      const result = cookbookReducer.cookbook(
        Immutable.Map({ collectionSets: initialCollectionSets }),
        {
          type: actionTypes.COOKBOOK_RECIEVE_COLLECTIONS,
          meta,
        },
      )

      expect(result.get('collectionsTotalSets')).toEqual(8)
    })
  })

  describe('COOKBOOK_RECIEVE_COLLECTION_RECIPES', () => {
    test('should add list of recipe ids to recipeSets state keyed by setNum', () => {
      const result = cookbookReducer.cookbook(initialState, {
        type: actionTypes.COOKBOOK_RECIEVE_COLLECTION_RECIPES,
        recipes: [
          { id: 'recipe-1', title: 'recipe 1' },
          { id: 'recipe-2', title: 'recipe 2' },
        ],
        setNum: 1,
      })

      const recipeSets = Immutable.Map({}).set(
        1,
        Immutable.List(['recipe-1', 'recipe-2']),
      )
      expect(Immutable.is(result.get('recipeSets'), recipeSets)).toEqual(true)
    })

    test('should retain recipeSets already in state', () => {
      const initialRecipeSets = Immutable.Map({}).set(
        2,
        Immutable.List(['recipe-3', 'recipe-4']),
      )

      const result = cookbookReducer.cookbook(
        Immutable.Map({ recipeSets: initialRecipeSets }),
        {
          type: actionTypes.COOKBOOK_RECIEVE_COLLECTION_RECIPES,
          recipes: [
            { id: 'recipe-1', title: 'recipe 1 updated title' },
            { id: 'recipe-2', title: 'recipe 2' },
          ],
          setNum: 1,
        },
      )

      const expectedRecipeSets = Immutable.Map({})
        .set(2, Immutable.List(['recipe-3', 'recipe-4']))
        .set(1, Immutable.List(['recipe-1', 'recipe-2']))
      expect(
        Immutable.is(result.get('recipeSets'), expectedRecipeSets),
      ).toEqual(true)
    })

    test('should override recipeSets already in state matching setNum', () => {
      const initialRecipeSets = Immutable.Map({}).set(
        2,
        Immutable.List(['recipe-3', 'recipe-4']),
      )

      const result = cookbookReducer.cookbook(
        Immutable.Map({ collectionSets: initialRecipeSets }),
        {
          type: actionTypes.COOKBOOK_RECIEVE_COLLECTION_RECIPES,
          recipes: [
            { id: 'recipe-1', title: 'recipe 1 updated title' },
            { id: 'recipe-2', title: 'recipe 2' },
          ],
          setNum: 2,
        },
      )

      const expectedRecipeSets = Immutable.Map({}).set(
        2,
        Immutable.List(['recipe-1', 'recipe-2']),
      )
      expect(
        Immutable.is(result.get('recipeSets'), expectedRecipeSets),
      ).toEqual(true)
    })

    test('should set recipesCollectionId', () => {
      const initialRecipeSets = Immutable.Map({}).set(
        2,
        Immutable.List(['recipe-3', 'recipe-4']),
      )
      const result = cookbookReducer.cookbook(
        Immutable.Map({ recipeSets: initialRecipeSets }),
        {
          type: actionTypes.COOKBOOK_RECIEVE_COLLECTION_RECIPES,
          collectionId: 'collection-y',
        },
      )

      expect(result.get('recipesCollectionId')).toEqual('collection-y')
    })

    test('should set recipeTotalSets', () => {
      const initialRecipeSets = Immutable.Map({}).set(
        2,
        Immutable.List(['recipe-3', 'recipe-4']),
      )
      const meta = {
        offset: 0,
        total: 150,
        limit: 20,
      }
      const result = cookbookReducer.cookbook(
        Immutable.Map({ recipeSets: initialRecipeSets }),
        {
          type: actionTypes.COOKBOOK_RECIEVE_COLLECTION_RECIPES,
          meta,
        },
      )

      expect(result.get('recipesTotalSets')).toEqual(8)
    })
  })

  describe('COOKBOOK_LOAD_COLLECTION_SETS', () => {
    test('should set collectionsStartSet if startSet is provided', () => {
      const result = cookbookReducer.cookbook(initialState, {
        type: actionTypes.COOKBOOK_LOAD_COLLECTION_SETS,
        startSet: 2,
      })

      expect(result.get('collectionsStartSet')).toEqual(2)
    })

    test('should set collectionsEndSet if endSet is provided', () => {
      const result = cookbookReducer.cookbook(initialState, {
        type: actionTypes.COOKBOOK_LOAD_COLLECTION_SETS,
        endSet: 5,
      })

      expect(result.get('collectionsEndSet')).toEqual(5)
    })
  })

  describe('COOKBOOK_LOAD_RECIPE_SETS', () => {
    test('should set recipesStartSet if startSet is provided', () => {
      const result = cookbookReducer.cookbook(initialState, {
        type: actionTypes.COOKBOOK_LOAD_RECIPE_SETS,
        startSet: 2,
      })

      expect(result.get('recipesStartSet')).toEqual(2)
    })

    test('should set collectionsEndSet if endSet is provided', () => {
      const result = cookbookReducer.cookbook(initialState, {
        type: actionTypes.COOKBOOK_LOAD_RECIPE_SETS,
        endSet: 5,
      })

      expect(result.get('recipesEndSet')).toEqual(5)
    })
  })

  describe('COOKBOOK_RESET_RECIPE_SETS', () => {
    const existingState = Immutable.fromJS({
      recipeSets: { 2: ['a', 'b'], 3: ['c', 'd'] },
      recipesCollectionId: 'collection-x',
      recipesStartSet: 3,
      recipesEndSet: 5,
      recipesTotalSets: 6,
    })

    test('should set recipeSets to its initial value', () => {
      const result = cookbookReducer.cookbook(existingState, {
        type: actionTypes.COOKBOOK_RESET_RECIPE_SETS,
      })

      expect(
        Immutable.is(result.get('recipeSets'), initialState.get('recipeSets')),
      ).toEqual(true)
    })

    test('should set recipesCollectionId to its initial value', () => {
      const result = cookbookReducer.cookbook(existingState, {
        type: actionTypes.COOKBOOK_RESET_RECIPE_SETS,
      })

      expect(
        Immutable.is(
          result.get('recipesCollectionId'),
          initialState.get('recipesCollectionId'),
        ),
      ).toEqual(true)
    })

    test('should set recipesStartSet to its initial value', () => {
      const result = cookbookReducer.cookbook(existingState, {
        type: actionTypes.COOKBOOK_RESET_RECIPE_SETS,
      })

      expect(
        Immutable.is(
          result.get('recipesStartSet'),
          initialState.get('recipesStartSet'),
        ),
      ).toEqual(true)
    })

    test('should set recipesEndSet to its initial value', () => {
      const result = cookbookReducer.cookbook(existingState, {
        type: actionTypes.COOKBOOK_RESET_RECIPE_SETS,
      })

      expect(
        Immutable.is(
          result.get('recipesEndSet'),
          initialState.get('recipesEndSet'),
        ),
      ).toEqual(true)
    })

    test('should set recipesTotalSets to its initial value', () => {
      const result = cookbookReducer.cookbook(existingState, {
        type: actionTypes.COOKBOOK_RESET_RECIPE_SETS,
      })

      expect(
        Immutable.is(
          result.get('recipesTotalSets'),
          initialState.get('recipesTotalSets'),
        ),
      ).toEqual(true)
    })
  })

  describe('COOKBOOK_FETCH_RECIPE_STEPS_BY_ID', () => {
    const resultState = Immutable.fromJS({
      recipesInstructions: {
        '123': [
          {
            'step_number': 1,
            'instruction': 'Instruction',
            'media': {}
          }
        ]
      }
    })

    describe('when no data sent', () => {
      test('should return initial state', () => {
        const result = cookbookReducer.cookbook(initialState, {
          type: actionTypes.COOKBOOK_FETCH_RECIPE_STEPS_BY_ID,
        })

        expect(
          Immutable.is(
            result.get('recipesInstructions'),
            initialState.get('recipesInstructions'),
          ),
        ).toEqual(true)
      })
    })

    describe('when sending data', () => {
      test('should set recipesInstructions with recipe steps', () => {
        const result = cookbookReducer.cookbook(initialState, {
          type: actionTypes.COOKBOOK_FETCH_RECIPE_STEPS_BY_ID,
          recipeId: '123',
          recipeStepsById: [
            {
              'step_number': 1,
              'instruction': 'Instruction',
              'media': {}
            }
          ]
        })

        expect(
          Immutable.is(
            result.get('recipesInstructions'),
            resultState.get('recipesInstructions'),
          ),
        ).toEqual(true)
      })
    })
  })
})
