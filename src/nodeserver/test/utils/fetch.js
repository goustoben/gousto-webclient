import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import Immutable from 'immutable' /* eslint-disable new-cap */
/* eslint-disable global-require */

describe('fetch', function() {
	let fetchMock
	let fetchSpy
	let clock
	let timestamp
	beforeEach(function() {
		fetchSpy = sinon.stub()
		fetchMock = (data, status = 200) => (
			fetchSpy.returns(
				new Promise(resolve => {
					resolve({
						text: () => data,
						status,
					})
				})
			)
		)
		timestamp = Date.now()
		clock = sinon.useFakeTimers(timestamp)
	})

	afterEach(function() {
		clock.restore()
	})

	it('should return with JSON', async function() {
		const data = {
			status: 'ok',
			data: {
				recipe_title: 'Test',
				meat_ingredients: [
					'chicken',
					'prawn_with_shell',
				],
				nutInfo: {
					e_nergy: 100,
				},
			},
		}

		const expected = {
			recipeTitle: 'Test',
			meatIngredients: [
				'chicken',
				'prawn_with_shell',
			],
			nutInfo: {
				eNergy: 100,
			},
		}

		const fetch = require('inject-loader?isomorphic-fetch!utils/fetch')({
			'isomorphic-fetch': fetchMock(JSON.stringify(data)),
		}).default

		const result = await fetch('token', 'test')
		expect(result).to.deep.equal({ data: expected, meta: null })
	})

	it('should return with error if response has not ok status', async function() {
		const data = {
			status: 'error',
			error: 'test error',
		}

		const fetch = require('inject-loader?isomorphic-fetch!utils/fetch')({
			'isomorphic-fetch': fetchMock(JSON.stringify(data)),
		}).default
		try {
			await fetch('token', 'test')
		} catch (err) {
			expect(err.message).to.equal('test error')
		}
	})

	it('should return with error if response is not in a recognised JSON format', async function() {
		const data = {
			something: '...',
		}

		const fetch = require('inject-loader?isomorphic-fetch!utils/fetch')({
			'isomorphic-fetch': fetchMock(JSON.stringify(data)),
		}).default
		try {
			await fetch('token', 'test')
		} catch (err) {
			expect(err.message).to.equal('Response is malformed')
		}
	})

	it('should return with error if response is not a JSON string', async function() {
		const fetch = require('inject-loader?isomorphic-fetch!utils/fetch')({
			'isomorphic-fetch': fetchMock('not json'),
		}).default
		try {
			await fetch('token', 'test')
		} catch (err) {
			expect(err.message).to.be.ok
		}
	})

	it('should not have body set for GET requests', async function() {
		const data = {
			status: 'ok',
			data: { recipe: 'Test Recipe' },
		}
		const fetch = require('inject-loader?isomorphic-fetch!utils/fetch')({
			'isomorphic-fetch': fetchMock(JSON.stringify(data)),
		}).default

		const expectedRequest = {
			method: 'GET',
			headers: {},
			cache: 'default',
		}

		const result = await fetch('', 'test')

		expect(result).to.deep.equal({ data: { recipe: 'Test Recipe' }, meta: null })
		expect(fetchSpy).to.have.been.calledOnce
		const args = fetchSpy.args[0]
		expect(args[0]).to.equal('test')
		expect(args[1]).to.deep.equal(expectedRequest)
	})

	it('should have correct querystring set for GET requests', async function() {
		const data = {
			status: 'ok',
			data: { recipe: 'Test Recipe' },
		}
		const fetch = require('inject-loader?isomorphic-fetch!utils/fetch')({
			'isomorphic-fetch': fetchMock(JSON.stringify(data)),
		}).default

		const expectedRequest = {
			method: 'GET',
			headers: {},
			cache: 'default',
		}

		const result = await fetch('', 'test/', { id: 1, include: ['test1', 'test2'] })

		expect(result).to.deep.equal({ data: { recipe: 'Test Recipe' }, meta: null })
		expect(fetchSpy).to.have.been.calledOnce
		const args = fetchSpy.args[0]
		expect(args[0]).to.equal('test?id=1&include%5B0%5D=test1&include%5B1%5D=test2')
		expect(args[1]).to.deep.equal(expectedRequest)
	})

	describe('experiments in fetch parameters', function() {
		let fetch

		beforeEach(function() {
			const data = {
				status: 'ok',
				data: { recipe: 'Test Recipe' },
			}
			fetch = require('inject-loader?isomorphic-fetch&store!utils/fetch')({
				'isomorphic-fetch': fetchMock(JSON.stringify(data)),
				store: {
					store: {
						getState: sinon.stub().returns({
							features: Immutable.fromJS({
								feature1: {
									value: 'feature1Value',
									experiment: true,
								},
								feature2: {
									value: 'feature2Value',
									experiment: false,
								},
								feature3: {
									value: true,
									experiment: true,
								},
							}),
						}),
					},
				},
			}).default
		})

		it('should include features flagged as experiments in querystring by default', async function() {
			const result = await fetch('', 'test/')

			expect(result).to.deep.equal({ data: { recipe: 'Test Recipe' }, meta: null })
			expect(fetchSpy).to.have.been.calledOnce
			const args = fetchSpy.args[0]
			expect(args[0]).to.equal('test?experiments%5Bfeature1%5D=feature1Value&experiments%5Bfeature3%5D=true')
			const expectedRequest = {
				method: 'GET',
				headers: {},
				cache: 'default',
			}
			expect(args[1]).to.deep.equal(expectedRequest)
		})

		it('should NOT include features flagged as experiments in querystring if indicated so', async function() {
			const result = await fetch('', 'test/', {}, 'GET', 'default', {}, null, false, false)

			expect(result).to.deep.equal({ data: { recipe: 'Test Recipe' }, meta: null })
			expect(fetchSpy).to.have.been.calledOnce
			const args = fetchSpy.args[0]
			expect(args[0]).to.equal('test')
			const expectedRequest = {
				method: 'GET',
				headers: {},
				cache: 'default',
			}
			expect(args[1]).to.deep.equal(expectedRequest)
		})
	})

	it('should have body and content-type set for non-GET requests', async function() {
		const data = {
			status: 'ok',
			data: { recipe: 'Test Recipe' },
		}
		const fetch = require('inject-loader?isomorphic-fetch!utils/fetch')({
			'isomorphic-fetch': fetchMock(JSON.stringify(data)),
		}).default

		const expectedRequest = {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			cache: 'default',
			body: 'id=1&include%5B0%5D=test1&include%5B1%5D=test2',
		}

		const result = await fetch('', 'test', { id: 1, include: ['test1', 'test2'] }, 'POST')

		expect(result).to.deep.equal({ data: { recipe: 'Test Recipe' }, meta: null })
		expect(fetchSpy).to.have.been.calledOnce
		const args = fetchSpy.args[0]
		expect(args[0]).to.equal('test')
		expect(args[1]).to.deep.equal(expectedRequest)
	})

	it('should append a unix timestamp to the request URL when cache mode is no-store', async function() {
		const cacheMode = 'no-store'
		const data = {
			status: 'ok',
			data: { recipe: 'Test Recipe' },
		}
		const expectedRequest = {
			method: 'GET',
			headers: {},
			cache: cacheMode,
		}
		const fetch = require('inject-loader?isomorphic-fetch!utils/fetch')({ 'isomorphic-fetch': fetchMock(JSON.stringify(data)) }).default
		const result = await fetch('', 'test/', { id: 1, include: ['test1', 'test2'] }, 'GET', cacheMode)

		expect(result).to.deep.equal({ data: { recipe: 'Test Recipe' }, meta: null })
		expect(fetchSpy).to.have.been.calledOnce
		const args = fetchSpy.args[0]
		expect(args[0]).to.equal(`test?id=1&include%5B0%5D=test1&include%5B1%5D=test2&_=${timestamp}`)
		expect(args[1]).to.deep.equal(expectedRequest)

		clock.restore()
	})
	it('should append a unix timestamp to the request URL when cache mode is reload', async function() {
		const cacheMode = 'reload'
		const data = {
			status: 'ok',
			data: { recipe: 'Test Recipe' },
		}
		const expectedRequest = {
			method: 'GET',
			headers: {},
			cache: cacheMode,
		}
		const fetch = require('inject-loader?isomorphic-fetch!utils/fetch')({ 'isomorphic-fetch': fetchMock(JSON.stringify(data)) }).default
		const result = await fetch('', 'test/', { id: 1, include: ['test1', 'test2'] }, 'GET', cacheMode)

		expect(result).to.deep.equal({ data: { recipe: 'Test Recipe' }, meta: null })
		expect(fetchSpy).to.have.been.calledOnce
		const args = fetchSpy.args[0]
		expect(args[0]).to.equal(`test?id=1&include%5B0%5D=test1&include%5B1%5D=test2&_=${timestamp}`)
		expect(args[1]).to.deep.equal(expectedRequest)
	})
	it('should append a unix timestamp to the request URL when cache mode is no-cache', async function() {
		const cacheMode = 'no-cache'
		const data = {
			status: 'ok',
			data: { recipe: 'Test Recipe' },
		}
		const expectedRequest = {
			method: 'GET',
			headers: {},
			cache: cacheMode,
		}
		const fetch = require('inject-loader?isomorphic-fetch!utils/fetch')({ 'isomorphic-fetch': fetchMock(JSON.stringify(data)) }).default
		const result = await fetch('', 'test/', { id: 1, include: ['test1', 'test2'] }, 'GET', cacheMode)

		expect(result).to.deep.equal({ data: { recipe: 'Test Recipe' }, meta: null })
		expect(fetchSpy).to.have.been.calledOnce
		const args = fetchSpy.args[0]
		expect(args[0]).to.equal(`test?id=1&include%5B0%5D=test1&include%5B1%5D=test2&_=${timestamp}`)
		expect(args[1]).to.deep.equal(expectedRequest)
	})

	it('should throw an error with the response if the status code is >= 400', async function() {
		const data = {
			status: 'ok',
			data: { recipe: 'Test Recipe' },
		}
		const cacheMode = 'no-cache'
		const fetch = require('inject-loader?isomorphic-fetch!utils/fetch')({ 'isomorphic-fetch': fetchMock(JSON.stringify(data), 500) }).default

		try {
			await fetch('', 'test/', { id: 1, include: ['test1', 'test2'] }, 'GET', cacheMode)
		} catch (err) {
			expect(err.message).to.be.ok
			expect(err.message).to.deep.equal({ recipe: 'Test Recipe' })
		}

		expect(fetchSpy).to.have.been.calledOnce
	})

	it('should throw a string if an Error is thrown from the fetch', async function() {
		const cacheMode = 'no-cache'
		const fetch = require('inject-loader?isomorphic-fetch!utils/fetch')({ 'isomorphic-fetch': fetchMock('lol', 500) }).default

		try {
			await fetch('', 'test/', { id: 1, include: ['test1', 'test2'] }, 'GET', cacheMode)
		} catch (err) {
			expect(err.message).to.be.ok
			expect(err.message).to.equal('An error occurred, please try again.')
		}

		expect(fetchSpy).to.have.been.calledOnce
	})
})
