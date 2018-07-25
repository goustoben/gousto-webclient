import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

describe('content', function() {
	describe('fetchContentBySlug', function() {
		let fetchSpy

		function fetchContentBySlug(content) {
			fetchSpy = sinon.stub().returns(new Promise(resolve => { resolve(content) }))

			const fetchContentBySlugMocked = require('inject-loader?config/endpoint&utils/fetch!apis/content')({
				'utils/fetch': fetchSpy,
				'config/endpoint': sinon.stub().returns('gousto-endpoint'),
			}).fetchContentBySlug

			return fetchContentBySlugMocked('token', 'welcome', { 'includes[]': 'fields', 'vars[]': 'variation-a' })
		}

		it('should call the correct URL', async function() {
			await fetchContentBySlug({})
			expect(fetchSpy.args[0][0]).to.equal(null)
			expect(fetchSpy.args[0][1]).to.equal('gousto-endpoint/pages/slug/welcome')
		})

		it('should call with additional data', async function() {
			await fetchContentBySlug({})
			expect(fetchSpy.args[0][0]).to.equal(null)
			expect(fetchSpy.args[0][2]).to.deep.equal({ 'includes[]': 'fields', 'vars[]': 'variation-a' })
			expect(fetchSpy.args[0][3]).to.equal('GET')
		})

		it('should return fetched data', async function() {
			const response = await fetchContentBySlug(['welcome', ['sections', ['components', ['fields', ['attributes']]]]])

			expect(response).to.deep.equal(['welcome', ['sections', ['components', ['fields', ['attributes']]]]])
		})
	})
})
