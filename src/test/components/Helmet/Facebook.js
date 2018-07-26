import React from 'react'
import { shallow } from 'enzyme'
import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import Helmet from 'react-helmet'
import Facebook from 'Helmet/Facebook'

describe('Helmet Facebook', function() {
	it('should return 1 Helmet', function() {
		expect(shallow(<Facebook />).type()).to.equal(Helmet)
	})

	it('should set meta content for fb:app_id property to provided appID', function() {
		const meta = shallow(<Facebook appID="sampleappid" />).prop('meta')
		expect(meta).to.contain({
			property: 'fb:app_id',
			content: 'sampleappid',
		})
	})

	it('should set 1 meta content for fb:admins property for each provided admins', function() {
		const meta = shallow(<Facebook admins={['admin1', 'admin2', 'admin3']} />).prop('meta')
		expect(meta).to.contain({
			property: 'fb:admins',
			content: 'admin1',
		})
		expect(meta).to.contain({
			property: 'fb:admins',
			content: 'admin1',
		})
		expect(meta).to.contain({
			property: 'fb:admins',
			content: 'admin1',
		})
	})
})
