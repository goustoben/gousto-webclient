import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import Immutable from 'immutable' /* eslint-disable new-caps */
import actionTypes from 'actions/actionTypes'
import cookbookActions from 'actions/cookbook'
import * as collectionsApi from 'apis/collections'
import statusActions from 'actions/status'

describe('Cookbook actions', function() {
  let sandbox
  let dispatch
  let errorLoad

  describe('cookbookLoadCollections', function() {
    let fetchCollections
    const getState = () => ({
      auth: Immutable.fromJS({
        accessToken: 'access-token',
      }),
    })

    beforeEach(function() {
      sandbox = sinon.sandbox.create()
      dispatch = sandbox.spy()
      fetchCollections = sandbox.stub(collectionsApi, 'fetchCollections').returns({
        data: [
          { id: 1, name: 'Collection 1' },
          { id: 2, name: 'Collection 2' },
        ],
        meta: {
          offset: 0,
          total: 20,
        },
      })
      errorLoad = sandbox.stub(statusActions, 'errorLoad')
    })

    afterEach(function() {
      sandbox.restore()
    })

    it('should dispatch status action with collection set being loaded as first call for COLLECTIONS_RECIEVE_COLLECTIONS', async function() {
      await cookbookActions.cookbookLoadCollections({ setNum: 3 })(dispatch, getState)
      expect(dispatch.firstCall).to.be.calledWithExactly({
        type: actionTypes.PENDING,
        key: actionTypes.COOKBOOK_RECIEVE_COLLECTIONS,
        value: 3,
      })
    })

    it('should dispatch error action with null as second call for COLLECTIONS_RECIEVE_COLLECTIONS', async function() {
      await cookbookActions.cookbookLoadCollections()(dispatch, getState)
      expect(dispatch.getCall(1)).to.be.calledWithExactly({
        type: actionTypes.ERROR,
        key: actionTypes.COOKBOOK_RECIEVE_COLLECTIONS,
        value: null,
      })
    })

    it('should dispatch pending action with false as last call for COLLECTIONS_RECIEVE_COLLECTIONS', async function() {
      await cookbookActions.cookbookLoadCollections()(dispatch, getState)
      expect(dispatch.lastCall).to.be.calledWithExactly({
        type: actionTypes.PENDING,
        key: actionTypes.COOKBOOK_RECIEVE_COLLECTIONS,
        value: false,
      })
    })

    it('should call errorLoad once with fetch-collections-fail error if the api call fails', async function() {
      fetchCollections.rejects()
      await cookbookActions.cookbookLoadCollections()(dispatch, getState)
      expect(errorLoad.firstCall.args[0]).to.equal(actionTypes.COOKBOOK_RECIEVE_COLLECTIONS)
      expect(errorLoad.firstCall.args[1].error).to.equal('fetch-collections-fail')
    })

    it('should call fetchCollections once with access token & correct default args', async function() {
      await cookbookActions.cookbookLoadCollections()(dispatch, getState)
      expect(fetchCollections).to.have.been.calledOnce
      expect(fetchCollections).to.be.calledWithExactly('access-token', '', {
        filters: {
          type: 'cookbook',
        },
        limit: undefined,
        offset: undefined,
      })
    })

    it('should call fetchCollections with correct offset & limit if limit provided', async function() {
      await cookbookActions.cookbookLoadCollections({ limit: 20 })(dispatch, getState)
      expect(fetchCollections).to.be.calledWithExactly('access-token', '', {
        filters: {
          type: 'cookbook',
        },
        limit: 20,
        offset: 0,
      })
    })

    it('should call fetchCollections with limit if limit & setNum provided', async function() {
      await cookbookActions.cookbookLoadCollections({ limit: 20, setNum: 1 })(dispatch, getState)
      expect(fetchCollections).to.be.calledWithExactly('access-token', '', {
        filters: {
          type: 'cookbook',
        },
        limit: 20,
        offset: 0,
      })

      fetchCollections.reset()
      await cookbookActions.cookbookLoadCollections({ limit: 30, setNum: 2 })(dispatch, getState)
      expect(fetchCollections).to.be.calledWithExactly('access-token', '', {
        filters: {
          type: 'cookbook',
        },
        limit: 30,
        offset: 30,
      })

      fetchCollections.reset()
      await cookbookActions.cookbookLoadCollections({ limit: 40, setNum: 3 })(dispatch, getState)
      expect(fetchCollections).to.be.calledWithExactly('access-token', '', {
        filters: {
          type: 'cookbook',
        },
        limit: 40,
        offset: 80,
      })
    })

    it('should dispatch action COOKBOOK_RECIEVE_COLLECTIONS with collections response, setNum, & meta', async function() {
      await cookbookActions.cookbookLoadCollections()(dispatch, getState)
      expect(dispatch).to.be.calledWithExactly({
        type: actionTypes.COOKBOOK_RECIEVE_COLLECTIONS,
        collections: [
          { id: 1, name: 'Collection 1' },
          { id: 2, name: 'Collection 2' },
        ],
        setNum: 1,
        meta: {
          offset: 0,
          total: 20,
        },
      })
    })
  })

  describe('cookbookLoadCollectionRecipes', function() {
    let fetchCollectionRecipes
    const getState = () => ({
      auth: Immutable.fromJS({
        accessToken: 'access-token',
      }),
    })

    beforeEach(function() {
      sandbox = sinon.sandbox.create()
      dispatch = sandbox.spy()
      fetchCollectionRecipes = sandbox.stub(collectionsApi, 'fetchCollectionRecipes').returns({
        data: {
          recipes: [
            { id: 1, name: 'Recipe 1' },
            { id: 2, name: 'Recipe 2' },
          ],
        },
        meta: {
          recipes: {
            offset: 0,
            total: 20,
          },
        },
      })
      errorLoad = sandbox.stub(statusActions, 'errorLoad')
    })

    afterEach(function() {
      sandbox.restore()
    })

    it('should dispatch status action with collection recipe set loaded as first call for COOKBOOK_RECIEVE_COLLECTION_RECIPES', async function() {
      await cookbookActions.cookbookLoadCollectionRecipes('collection-x', { setNum: 3 })(dispatch, getState)
      expect(dispatch.firstCall).to.be.calledWithExactly({
        type: actionTypes.PENDING,
        key: actionTypes.COOKBOOK_RECIEVE_COLLECTION_RECIPES,
        value: 3,
      })
    })

    it('should dispatch error action with null as second call for COOKBOOK_RECIEVE_COLLECTION_RECIPES', async function() {
      await cookbookActions.cookbookLoadCollectionRecipes()(dispatch, getState)
      expect(dispatch.getCall(1)).to.be.calledWithExactly({
        type: actionTypes.ERROR,
        key: actionTypes.COOKBOOK_RECIEVE_COLLECTION_RECIPES,
        value: null,
      })
    })

    it('should dispatch pending action with false as last call for COOKBOOK_RECIEVE_COLLECTION_RECIPES', async function() {
      await cookbookActions.cookbookLoadCollectionRecipes()(dispatch, getState)
      expect(dispatch.lastCall).to.be.calledWithExactly({
        type: actionTypes.PENDING,
        key: actionTypes.COOKBOOK_RECIEVE_COLLECTION_RECIPES,
        value: false,
      })
    })

    it('should call errorLoad once with fetch-collection-recipes-fail error if the api call fails', async function() {
      fetchCollectionRecipes.rejects()
      await cookbookActions.cookbookLoadCollectionRecipes()(dispatch, getState)
      expect(errorLoad.firstCall.args[0]).to.equal(actionTypes.COOKBOOK_RECIEVE_COLLECTION_RECIPES)
      expect(errorLoad.firstCall.args[1].error).to.equal('fetch-collection-recipes-fail')
    })

    it('should call fetchCollectionRecipes once with no access token, correct collection id, & correct default args', async function() {
      await cookbookActions.cookbookLoadCollectionRecipes('collection-x')(dispatch, getState)
      expect(fetchCollectionRecipes).to.have.been.calledOnce
      expect(fetchCollectionRecipes).to.be.calledWithExactly(null, 'collection-x', {
        filters: {
          type: 'cookbook',
          is_item_published: 1,
        },
        limit: undefined,
        offset: undefined,
      }, false)
    })

    it('should call fetchCollectionRecipes with correct offset & limit if limit provided', async function() {
      await cookbookActions.cookbookLoadCollectionRecipes(undefined, { limit: 20 })(dispatch, getState)
      expect(fetchCollectionRecipes).to.be.calledWithExactly(null, undefined, {
        filters: {
          type: 'cookbook',
          is_item_published: 1,
        },
        limit: 20,
        offset: 0,
      }, false)
    })

    it('should call fetchCollectionRecipes with limit if limit & setNum provided', async function() {
      await cookbookActions.cookbookLoadCollectionRecipes(undefined, { limit: 20, setNum: 1 })(dispatch, getState)
      expect(fetchCollectionRecipes).to.be.calledWithExactly(null, undefined, {
        filters: {
          type: 'cookbook',
          is_item_published: 1,
        },
        limit: 20,
        offset: 0,
      }, false)

      fetchCollectionRecipes.reset()
      await cookbookActions.cookbookLoadCollectionRecipes(undefined, { limit: 30, setNum: 2 })(dispatch, getState)
      expect(fetchCollectionRecipes).to.be.calledWithExactly(null, undefined, {
        filters: {
          type: 'cookbook',
          is_item_published: 1,
        },
        limit: 30,
        offset: 30,
      }, false)

      fetchCollectionRecipes.reset()
      await cookbookActions.cookbookLoadCollectionRecipes(undefined, { limit: 40, setNum: 3 })(dispatch, getState)
      expect(fetchCollectionRecipes).to.be.calledWithExactly(null, undefined, {
        filters: {
          type: 'cookbook',
          is_item_published: 1,
        },
        limit: 40,
        offset: 80,
      }, false)
    })

    it('should dispatch action COOKBOOK_RECIEVE_COLLECTION_RECIPES with collection recipes response, setNum, & meta', async function() {
      await cookbookActions.cookbookLoadCollectionRecipes('collection-x')(dispatch, getState)
      expect(dispatch).to.be.calledWithExactly({
        type: actionTypes.COOKBOOK_RECIEVE_COLLECTION_RECIPES,
        collectionId: 'collection-x',
        recipes: [
          { id: 1, name: 'Recipe 1' },
          { id: 2, name: 'Recipe 2' },
        ],
        setNum: 1,
        meta: {
          offset: 0,
          total: 20,
        },
      })
    })
  })

  describe('cookbookLoadCollectionSets', function() {
    it('should return action type COOKBOOK_LOAD_COLLECTION_SETS with startSet & endSet', async function() {
      const result = cookbookActions.cookbookLoadCollectionSets({ startSet: 1, endSet: 2 })
      expect(result).to.deep.equal({
        type: actionTypes.COOKBOOK_LOAD_COLLECTION_SETS,
        startSet: 1,
        endSet: 2,
      })
    })
  })

  describe('cookbookLoadRecipeSets', function() {
    it('should return action type COOKBOOK_LOAD_RECIPE_SETS with startSet & endSet', async function() {
      const result = cookbookActions.cookbookLoadRecipeSets({ startSet: 1, endSet: 2 })
      expect(result).to.deep.equal({
        type: actionTypes.COOKBOOK_LOAD_RECIPE_SETS,
        startSet: 1,
        endSet: 2,
      })
    })
  })

  describe('cookbookResetCollectionRecipes', function() {
    it('should return action type COOKBOOK_RESET_RECIPE_SETS', async function() {
      const result = cookbookActions.cookbookResetCollectionRecipes()
      expect(result).to.deep.equal({ type: actionTypes.COOKBOOK_RESET_RECIPE_SETS })
    })
  })
})
