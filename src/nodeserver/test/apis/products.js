import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

describe('product apis', function() {
	describe('fetchProduct', function() {
		let fetchProduct
		let fetchSpy

		beforeEach(function() {
			fetchSpy = sinon.stub().returns(new Promise(resolve => { resolve({ id: '1234' }) }))

			fetchProduct = require('inject-loader?utils/fetch!apis/products')({
				'utils/fetch': fetchSpy,
			}).fetchProduct
		})

		it('should call the endpoint with passed arguments', async function() {
			await fetchProduct('token', '1234')

			expect(fetchSpy.args[0][0]).to.equal('token')
			expect(fetchSpy.args[0][1].substr(-4)).to.equal('1234')
		})

		it('should return the results unchanged', async function() {
			const data = await fetchProduct('token', '1234')

			expect(data).to.deep.equal({ id: '1234' })
		})
	})

	describe('fetchProductCategories', function() {
		let fetchProductCategories
		let fetchSpy

		beforeEach(function() {
			fetchSpy = sinon.stub().returns(new Promise(resolve => { resolve([{ id: '1234' }, { id: '5678' }]) }))

			fetchProductCategories = require('inject-loader?utils/fetch!apis/products')({
				'utils/fetch': fetchSpy,
			}).fetchProductCategories
		})

		it('should call the endpoint with passed arguments', async function() {
			await fetchProductCategories('token')

			expect(fetchSpy.args[0][0]).to.equal('token')
		})

		it('should return the results unchanged', async function() {
			const data = await fetchProductCategories('token')

			expect(data).to.deep.equal([{ id: '1234' }, { id: '5678' }])
		})
	})

	describe('fetchProducts', function() {
		let fetchProducts
		let fetchSpy

		beforeEach(function() {
			fetchSpy = sinon.stub().returns(new Promise(resolve => { resolve([{ id: '1234' }, { id: '5678' }]) }))

			fetchProducts = require('inject-loader?utils/fetch!apis/products')({
				'utils/fetch': fetchSpy,
			}).fetchProducts
		})

		it('should call the endpoint with passed arguments', async function() {
			await fetchProducts('token')

			expect(fetchSpy.args[0][0]).to.equal('token')
		})

		it('should return the results unchanged', async function() {
			const data = await fetchProducts('token')

			expect(data).to.deep.equal([{ id: '1234' }, { id: '5678' }])
		})
	})

	describe('fetchRandomProducts', function() {
		let fetchRandomProducts
		let fetchSpy

		beforeEach(function() {
			fetchSpy = sinon.stub().returns(new Promise(resolve => { resolve([{ id: '4321' }, { id: '8765' }]) }))

			fetchRandomProducts = require('inject-loader?utils/fetch!apis/products')({
				'utils/fetch': fetchSpy,
			}).fetchRandomProducts
		})

		it('should call the endpoint with the arguments passed', async function() {
			await fetchRandomProducts('token', 'arg1', 'arg2')

			const data = {
				sort: 'shuffle',
				limit: 'arg1',
				image_sizes: 'arg2',
			}
			expect(fetchSpy.args[0][0]).to.equal('token')
			expect(fetchSpy.args[0][2]).to.deep.equal(data)
		})

		it('should return the results unchanged', async function() {
			const result = await fetchRandomProducts('token')

			expect(result).to.deep.equal([{ id: '4321' }, { id: '8765' }])
		})
	})

	describe('fetchProductStock', function() {
		let fetchProductStock
		let fetchSpy

		beforeEach(function() {
			fetchSpy = sinon.stub().returns(new Promise(resolve => { resolve({ 1234: { number: 1000 }, 5678: { number: 1234 } }) }))

			fetchProductStock = require('inject-loader?utils/fetch!apis/products')({
				'utils/fetch': fetchSpy,
			}).fetchProductStock
		})

		it('should call the endpoint with passed arguments', async function() {
			await fetchProductStock('token')

			expect(fetchSpy.args[0][0]).to.equal('token')
		})

		it('should return the results unchanged', async function() {
			const data = await fetchProductStock('token')

			expect(data).to.deep.equal({ 1234: { number: 1000 }, 5678: { number: 1234 } })
		})
	})
})
