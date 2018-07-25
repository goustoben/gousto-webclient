import React from 'react'
import { shallow } from 'enzyme'
import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import Helmet from 'react-helmet'
import SiteVerification from 'Helmet/SiteVerification'

describe('Helmet SiteVerification', function() {
	const wrapper = shallow(<SiteVerification />)

	it('should return 1 Helmet', function() {
		expect(wrapper.type()).to.equal(Helmet)
	})

	it('should set correct google-site-verification', function() {
		expect(wrapper.prop('meta')).to.contain({
			name: 'google-site-verification',
			content: 'DGVXZ3PvnmsDtu8yQMQ0sw5gADyU_gd_cbN7ZZXozQ4',
		})
	})

	it('should set correct p:domain_verify', function() {
		expect(wrapper.prop('meta')).to.contain({
			name: 'p:domain_verify',
			content: 'adfa0b85592a79dcce9f843e17825583',
		})
	})
})
