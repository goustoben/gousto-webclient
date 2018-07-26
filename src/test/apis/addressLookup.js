import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

describe('addressLookup', function() {
	let fetchSpy

	function fetchAddressByPostcode(postcode) {
		fetchSpy = sinon.stub().returns(new Promise(resolve => { resolve(postcode) }))

		const fetchAddressByPostcodeMocked = require('inject-loader?utils/fetch!apis/addressLookup')({
			'utils/fetch': fetchSpy
		}).fetchAddressByPostcode

		return fetchAddressByPostcodeMocked(postcode)
	}

	it('should call the correct URL', async function() {
		const postcode = 'AB1 2CD'

		await fetchAddressByPostcode(postcode)

		expect(fetchSpy.args[0][0]).to.equal(null)
		expect(fetchSpy.args[0][1]).to.equal('/address/postcode-lookup')
		expect(fetchSpy.args[0][2]).to.deep.equal({
			postcode,
		})
	})
})
