const mockFetchCollections = jest.fn()
const mockFetchCollectionRecipes = jest.fn()

jest.mock('apis/collections', () => ({
  fetchCollections: mockFetchCollections,
  fetchCollectionRecipes: mockFetchCollectionRecipes
}))

const ARG_INDICES = {
  fetchCollections: {
    accessCode: 0,
    path: 1,
    requestData: 2
  },
  fetchCollectionRecipes: {
    accessCode: 0,
    collectionId: 1,
    requestData: 2
  }
}

describe('collections', () => {
  describe('getCollections', () => {
    // this require here is so that the mock above is picked up correctly
    const { getCollections } = require('../collections')

    describe('when useMenuService is false', () => {
      const collections = [
        { slug: 'bob' },
        { slub: 'apple' }
      ]
      const accessCode = 'abc'
      const useMenuService = false
      const date = '2019-01-01T00:00:00'
      let includeJustForYou = false

      beforeEach(() => {
        includeJustForYou = false
        mockFetchCollections.mockReset()
        mockFetchCollections.mockResolvedValue({ data: collections })
      })

      test('should call fetchCollections with access code', async () => {
        await getCollections(accessCode, date, includeJustForYou, useMenuService)

        expect(mockFetchCollections.mock.calls[0][ARG_INDICES.fetchCollections.accessCode]).toEqual(accessCode)
      })

      test('should call fetchCollections with correct path', async () => {
        await getCollections(accessCode, date, includeJustForYou, useMenuService)

        expect(mockFetchCollections.mock.calls[0][ARG_INDICES.fetchCollections.path]).toEqual('')
      })

      test('should call fetchCollections with correct date', async () => {
        await getCollections(accessCode, date, includeJustForYou, useMenuService)

        expect(mockFetchCollections.mock.calls[0][ARG_INDICES.fetchCollections.requestData]['filters']).toEqual({
          available_on: date
        })
      })

      describe('includeJustForYou is true', () => {
        beforeEach(() => {
          includeJustForYou = true
        })
        
        test('should call fetchCollections with correct experiments', async () => {
          await getCollections(accessCode, date, includeJustForYou, useMenuService)

          expect(mockFetchCollections.mock.calls[0][ARG_INDICES.fetchCollections.requestData]['experiments']).toEqual({
            'justforyou_v2': true,
          })
        })
      })

      describe('includeJustForYou is false', () => {
        beforeEach(() => {
          includeJustForYou = false
        })
        
        test('should call fetchCollections with correct experiments', async () => {
          await getCollections(accessCode, date, includeJustForYou, useMenuService)

          expect(mockFetchCollections.mock.calls[0][ARG_INDICES.fetchCollections.requestData]['experiments']).toEqual(undefined)
        })
      })

      test('should return the result of fetchCollections.data', async () => {
        const response = await getCollections(accessCode, date, includeJustForYou, useMenuService)

        expect(response).toEqual(collections)
      })
    })
  })

  describe('getCollectionRecipesForMenuId', () => {
    // this require here is so that the mock above is picked up correctly
    const { getCollectionRecipesForMenuId } = require('../collections')

    describe('when useMenuService is false', () => {
      const recipes = [
        { id: '1234' },
        { id: '1234' }
      ]
      const useMenuService = false
      const accessCode = 'abc'
      const collectionId = '123'
      const menuId = '456'
      let idsOnly = false

      beforeEach(() => {
        idsOnly = false
        mockFetchCollectionRecipes.mockReset()
        mockFetchCollectionRecipes.mockResolvedValue({ data: recipes })
      })

      test('should call fetchCollectionsRecipes with access code', async () => {
        await getCollectionRecipesForMenuId(accessCode, collectionId, menuId, idsOnly, useMenuService)

        expect(mockFetchCollectionRecipes.mock.calls[0][ARG_INDICES.fetchCollectionRecipes.accessCode]).toEqual(accessCode)
      })

      test('should call fetchCollectionsRecipes with collection id', async () => {
        await getCollectionRecipesForMenuId(accessCode, collectionId, menuId, idsOnly, useMenuService)

        expect(mockFetchCollectionRecipes.mock.calls[0][ARG_INDICES.fetchCollectionRecipes.collectionId]).toEqual(collectionId)
      })

      test('should call fetchCollectionsRecipes with correct includes', async () => {
        await getCollectionRecipesForMenuId(accessCode, collectionId, menuId, idsOnly, useMenuService)

        expect(mockFetchCollectionRecipes.mock.calls[0][ARG_INDICES.fetchCollectionRecipes.requestData]['includes']).toEqual(['ingredients', 'allergens', 'taxonomy'])
      })

      test('should call fetchCollectionsRecipes with correct filters', async () => {
        await getCollectionRecipesForMenuId(accessCode, collectionId, menuId, idsOnly, useMenuService)

        expect(mockFetchCollectionRecipes.mock.calls[0][ARG_INDICES.fetchCollectionRecipes.requestData]['filters[menu_id]']).toEqual(menuId)
      })

      describe('idsOnly is true', () => {
        beforeEach(() => {
          idsOnly = true
        })
        
        test('should call fetchCollectionsRecipes with correct fields[]', async () => {
          await getCollectionRecipesForMenuId(accessCode, collectionId, menuId, idsOnly, useMenuService)

          expect(mockFetchCollectionRecipes.mock.calls[0][ARG_INDICES.fetchCollectionRecipes.requestData]['fields[]']).toEqual('id')
        })
      })

      describe('idsOnly is false', () => {
        beforeEach(() => {
          idsOnly = false
        })
        
        test('should not set fields[] when calling fetchCollectionsRecipes', async () => {
          await getCollectionRecipesForMenuId(accessCode, collectionId, menuId, idsOnly, useMenuService)

          expect(mockFetchCollectionRecipes.mock.calls[0][ARG_INDICES.fetchCollectionRecipes.requestData]['fields[]']).toEqual(undefined)
        })
      })

      test('should return the result of fetchCollectionsRecipes.data', async () => {
        const response = await getCollectionRecipesForMenuId(accessCode, collectionId, menuId, idsOnly, useMenuService)

        expect(response).toEqual(recipes)
      })
    })
  })

  describe('getCollectionRecipesForDate', () => {
    // this require here is so that the mock above is picked up correctly
    const { getCollectionRecipesForDate } = require('../collections')

    describe('when useMenuService is false', () => {
      const recipes = [
        { id: '1234' },
        { id: '1234' }
      ]
      const accessCode = 'abc'
      const collectionId = '123'
      const date = '2019-09-01T00:00:00'
      const useMenuService = false
      let idsOnly = false

      beforeEach(() => {
        idsOnly = false
        mockFetchCollectionRecipes.mockReset()
        mockFetchCollectionRecipes.mockResolvedValue({ data: recipes })
      })

      test('should call fetchCollectionsRecipes with access code', async () => {
        await getCollectionRecipesForDate(accessCode, collectionId, date, idsOnly, useMenuService)

        expect(mockFetchCollectionRecipes.mock.calls[0][ARG_INDICES.fetchCollectionRecipes.accessCode]).toEqual(accessCode)
      })

      test('should call fetchCollectionsRecipes with collection id', async () => {
        await getCollectionRecipesForDate(accessCode, collectionId, date, idsOnly, useMenuService)

        expect(mockFetchCollectionRecipes.mock.calls[0][ARG_INDICES.fetchCollectionRecipes.collectionId]).toEqual(collectionId)
      })

      test('should call fetchCollectionsRecipes with correct includes', async () => {
        await getCollectionRecipesForDate(accessCode, collectionId, date, idsOnly, useMenuService)

        expect(mockFetchCollectionRecipes.mock.calls[0][ARG_INDICES.fetchCollectionRecipes.requestData]['includes']).toEqual(['ingredients', 'allergens', 'taxonomy'])
      })

      test('should call fetchCollectionsRecipes with correct filters', async () => {
        await getCollectionRecipesForDate(accessCode, collectionId, date, idsOnly, useMenuService)

        expect(mockFetchCollectionRecipes.mock.calls[0][ARG_INDICES.fetchCollectionRecipes.requestData]['filters[available_on]']).toEqual(date)
      })

      describe('idsOnly is true', () => {
        beforeEach(() => {
          idsOnly = true
        })
        
        test('should call fetchCollectionsRecipes with correct fields[]', async () => {
          await getCollectionRecipesForDate(accessCode, collectionId, date, idsOnly, useMenuService)

          expect(mockFetchCollectionRecipes.mock.calls[0][ARG_INDICES.fetchCollectionRecipes.requestData]['fields[]']).toEqual('id')
        })
      })

      describe('idsOnly is false', () => {
        beforeEach(() => {
          idsOnly = false
        })

        test('should not set fields[] when calling fetchCollectionsRecipes', async () => {
          await getCollectionRecipesForDate(accessCode, collectionId, date, idsOnly, useMenuService)

          expect(mockFetchCollectionRecipes.mock.calls[0][ARG_INDICES.fetchCollectionRecipes.requestData]['fields[]']).toEqual(undefined)
        })
      })

      test('should return the result of fetchCollectionsRecipes.data', async () => {
        const response = await getCollectionRecipesForDate(accessCode, collectionId, date, idsOnly, useMenuService)

        expect(response).toEqual(recipes)
      })
    })
  })
})
