import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import Immutable from 'immutable' /* eslint-disable new-caps */
import actionTypes from 'actions/actionTypes'
import collectionActions from 'actions/collections'
import * as collectionsApi from 'apis/collections'
import statusActions from 'actions/status'

describe('Collections action', function() {
	let sandbox
	let dispatch
	let errorLoad

	describe('collectionsLoadCollections', function() {
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
			})
			errorLoad = sandbox.stub(statusActions, 'errorLoad')
		})

		afterEach(function() {
			sandbox.restore()
		})

		it('should dispatch status action with true as first call for COLLECTIONS_RECIEVE_COLLECTIONS', async function() {
			await collectionActions.collectionsLoadCollections()(dispatch, getState)
			expect(dispatch.firstCall).to.be.calledWithExactly({
				type: actionTypes.PENDING,
				key: actionTypes.COLLECTIONS_RECIEVE_COLLECTIONS,
				value: true,
			})
		})

		it('should dispatch error action with null as second call for COLLECTIONS_RECIEVE_COLLECTIONS', async function() {
			await collectionActions.collectionsLoadCollections()(dispatch, getState)
			expect(dispatch.getCall(1)).to.be.calledWithExactly({
				type: actionTypes.ERROR,
				key: actionTypes.COLLECTIONS_RECIEVE_COLLECTIONS,
				value: null,
			})
		})

		it('should dispatch pending action with false as last call for COLLECTIONS_RECIEVE_COLLECTIONS', async function() {
			await collectionActions.collectionsLoadCollections()(dispatch, getState)
			expect(dispatch.lastCall).to.be.calledWithExactly({
				type: actionTypes.PENDING,
				key: actionTypes.COLLECTIONS_RECIEVE_COLLECTIONS,
				value: false,
			})
		})

		it('should call errorLoad once with fetch-collections-fail error if the api call fails', async function() {
			fetchCollections.rejects()
			await collectionActions.collectionsLoadCollections()(dispatch, getState)
			expect(errorLoad.firstCall.args[0]).to.equal(actionTypes.COLLECTIONS_RECIEVE_COLLECTIONS)
			expect(errorLoad.firstCall.args[1].error).to.equal('fetch-collections-fail')
		})

		it('should call fetchCollections once with access token & correct default args', async function() {
			await collectionActions.collectionsLoadCollections()(dispatch, getState)
			expect(fetchCollections).to.have.been.calledOnce
			expect(fetchCollections).to.be.calledWithExactly('access-token', '', {
				filters: undefined,
				limit: undefined,
				offset: undefined,
			})
		})

		it('should call fetchCollections with available_on filter if provided', async function() {
			await collectionActions.collectionsLoadCollections({ date: 'datestring' })(dispatch, getState)
			expect(fetchCollections).to.be.calledWithExactly('access-token', '', {
				filters: {
					available_on: 'datestring',
				},
				limit: undefined,
				offset: undefined,
			})
		})

		it('should call fetchCollections with type filter if provided', async function() {
			await collectionActions.collectionsLoadCollections({ type: 'typestring' })(dispatch, getState)
			expect(fetchCollections).to.be.calledWithExactly('access-token', '', {
				filters: {
					type: 'typestring',
				},
				limit: undefined,
				offset: undefined,
			})
		})

		it('should call fetchCollections with offset if provided', async function() {
			await collectionActions.collectionsLoadCollections({ offset: 20 })(dispatch, getState)
			expect(fetchCollections).to.be.calledWithExactly('access-token', '', {
				filters: undefined,
				limit: undefined,
				offset: 20,
			})
		})

		it('should call fetchCollections with limit if provided', async function() {
			await collectionActions.collectionsLoadCollections({ limit: 20 })(dispatch, getState)
			expect(fetchCollections).to.be.calledWithExactly('access-token', '', {
				filters: undefined,
				limit: 20,
				offset: undefined,
			})
		})

		it('should dispatch action COLLECTIONS_RECIEVE_COLLECTIONS with collections response', async function() {
			await collectionActions.collectionsLoadCollections()(dispatch, getState)
			expect(dispatch).to.be.calledWithExactly({
				type: actionTypes.COLLECTIONS_RECIEVE_COLLECTIONS,
				collections: [
					{ id: 1, name: 'Collection 1' },
					{ id: 2, name: 'Collection 2' },
				],
			})
		})
	})

	describe('collectionsLoadCollectionBySlug', function() {
		let fetchCollectionBySlug

		beforeEach(function() {
			sandbox = sinon.sandbox.create()
			dispatch = sandbox.spy()
			fetchCollectionBySlug = sandbox.stub(collectionsApi, 'fetchCollectionBySlug').returns({
				data: { id: 1, name: 'Collection 1', slug: 'collection-1' },
			})
			errorLoad = sandbox.stub(statusActions, 'errorLoad')
		})

		afterEach(function() {
			sandbox.restore()
		})

		it('should dispatch status action with true as first call for COLLECTIONS_RECIEVE_COLLECTIONS', async function() {
			await collectionActions.collectionsLoadCollectionBySlug('collection-1')(dispatch)
			expect(dispatch.firstCall).to.be.calledWithExactly({
				type: actionTypes.PENDING,
				key: actionTypes.COLLECTIONS_RECIEVE_COLLECTIONS,
				value: 'collection-1',
			})
		})

		it('should dispatch error action with null as second call for COLLECTIONS_RECIEVE_COLLECTIONS', async function() {
			await collectionActions.collectionsLoadCollectionBySlug('collection-1')(dispatch)
			expect(dispatch.getCall(1)).to.be.calledWithExactly({
				type: actionTypes.ERROR,
				key: actionTypes.COLLECTIONS_RECIEVE_COLLECTIONS,
				value: null,
			})
		})

		it('should dispatch pending action with false as last call for COLLECTIONS_RECIEVE_COLLECTIONS', async function() {
			await collectionActions.collectionsLoadCollectionBySlug('collection-1')(dispatch)
			expect(dispatch.lastCall).to.be.calledWithExactly({
				type: actionTypes.PENDING,
				key: actionTypes.COLLECTIONS_RECIEVE_COLLECTIONS,
				value: false,
			})
		})

		it('should call errorLoad once with fetch-collection-fail error if the api call fails', async function() {
			fetchCollectionBySlug.rejects()
			await collectionActions.collectionsLoadCollectionBySlug('collection-1')(dispatch)
			expect(errorLoad.firstCall.args[0]).to.equal(actionTypes.COLLECTIONS_RECIEVE_COLLECTIONS)
			expect(errorLoad.firstCall.args[1].error).to.equal('fetch-collection-fail')
		})

		it('should call loadCollectionBySlug once with collection slug', async function() {
			await collectionActions.collectionsLoadCollectionBySlug('collection-1')(dispatch)
			expect(fetchCollectionBySlug).to.have.been.calledOnce
			expect(fetchCollectionBySlug).to.be.calledWithExactly('collection-1')
		})
	})

	describe('collectionsLoadCollectionRecipes', function() {
		let fetchCollectionRecipes

		beforeEach(function() {
			sandbox = sinon.sandbox.create()
			dispatch = sandbox.spy()
			fetchCollectionRecipes = sandbox.stub(collectionsApi, 'fetchCollectionRecipes').returns({
				data: [
					{ id: 1, name: 'Recipe 1' },
					{ id: 2, name: 'Recipe 2' },
				],
			})
			errorLoad = sandbox.stub(statusActions, 'errorLoad')
		})

		afterEach(function() {
			sandbox.restore()
		})

		it('should dispatch status action with true as first call for COLLECTIONS_RECIEVE_COLLECTION_RECIPES', async function() {
			await collectionActions.collectionsLoadCollectionRecipes(1)(dispatch)
			expect(dispatch.firstCall).to.be.calledWithExactly({
				type: actionTypes.PENDING,
				key: actionTypes.COLLECTIONS_RECIEVE_COLLECTION_RECIPES,
				value: true,
			})
		})

		it('should dispatch error action with null as second call for COLLECTIONS_RECIEVE_COLLECTION_RECIPES', async function() {
			await collectionActions.collectionsLoadCollectionRecipes(1)(dispatch)
			expect(dispatch.getCall(1)).to.be.calledWithExactly({
				type: actionTypes.ERROR,
				key: actionTypes.COLLECTIONS_RECIEVE_COLLECTION_RECIPES,
				value: null,
			})
		})

		it('should dispatch pending action with false as last call for COLLECTIONS_RECIEVE_COLLECTION_RECIPES', async function() {
			await collectionActions.collectionsLoadCollectionRecipes(1)(dispatch)
			expect(dispatch.lastCall).to.be.calledWithExactly({
				type: actionTypes.PENDING,
				key: actionTypes.COLLECTIONS_RECIEVE_COLLECTION_RECIPES,
				value: false,
			})
		})

		it('should call errorLoad once with fetch-collection-fail error if the api call fails', async function() {
			fetchCollectionRecipes.rejects()
			await collectionActions.collectionsLoadCollectionRecipes(1)(dispatch)
			expect(errorLoad.firstCall.args[0]).to.equal(actionTypes.COLLECTIONS_RECIEVE_COLLECTION_RECIPES)
			expect(errorLoad.firstCall.args[1].error).to.equal('fetch-collection-recipes-fail')
		})

		it('should call fetchCollectionRecipes once with null & collection id', async function() {
			await collectionActions.collectionsLoadCollectionRecipes(1)(dispatch)
			expect(fetchCollectionRecipes).to.have.been.calledOnce
			expect(fetchCollectionRecipes).to.be.calledWithExactly(null, 1)
		})
	})
})
