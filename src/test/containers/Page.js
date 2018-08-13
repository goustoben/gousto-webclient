import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import React from 'react'
import { mount } from 'enzyme'
import Immutable from 'immutable' /* eslint-disable new-cap */

describe('Page container', function() {

	describe('fetchData', function() {
		let userLoadData
		let Page
		let dispatch
		let getState
		beforeEach(function() {
			userLoadData = sinon.stub()
			Page = require('inject-loader!containers/Page')({
				actions: { userLoadData },
			}).default
			dispatch = sinon.stub().returns(new Promise(resolve => resolve()))
		})

		it('should call userLoadData when isAuthenticated is set and user email is not set', function(done) {
			getState = sinon.stub().returns({
				auth: Immutable.Map({
					isAuthenticated: 'test',
				}),
				user: Immutable.fromJS({
					email: '',
				}),
			})
			Page.fetchData({
				store: { dispatch, getState },
			}).then(function() {
				expect(userLoadData).to.have.been.calledOnce
				done()
			}).catch(err => {
				expect(err).to.equal(null)
			})
		})

		it('should not call userLoadData when isAuthenticated is not set and user email is not set', function(done) {
			getState = sinon.stub().returns({
				auth: Immutable.Map({
					isAuthenticated: '',
				}),
				user: Immutable.fromJS({
					email: '',
				}),
			})
			Page.fetchData({
				store: { dispatch, getState },
			}).then(function() {
				expect(userLoadData).not.to.have.been.called
				done()
			}).catch(err => {
				expect(err).to.equal(null)
			})
		})

		it('should not call userLoadData when isAuthenticated is set and user email is set', function(done) {
			getState = sinon.stub().returns({
				auth: Immutable.Map({
					isAuthenticated: 'test',
				}),
				user: Immutable.fromJS({
					email: 'test@email.com',
				}),
			})
			Page.fetchData({
				store: { dispatch, getState },
			}).then(function() {
				expect(userLoadData).not.to.have.been.called
				done()
			}).catch(err => {
				expect(err).to.equal(null)
			})
		})
	})

	describe('data layer', function() {
		let Page
		let getWindowSpy
		let dataScienceDataLayer
		beforeEach(function() {
			dataScienceDataLayer = []
			getWindowSpy = sinon.stub().returns({ dataScienceDataLayer })
			Page = require('inject-loader!containers/Page')({
				'react-helmet': () => <span />,
				'utils/window': {
					getWindow: getWindowSpy,
				},
			}).default
		})

		it('should push the goustoReference and email props to the dataScienceDataLayer on mount if the disabled prop is false and the isAuthenticated prop is true', function(){
			const wrapper = mount(<Page
				disabled={false}
				isAuthenticated
				email="devops@gousto.co.uk"
				goustoReference="12345"
			/>)
			expect(dataScienceDataLayer).to.have.length(1)
			expect(dataScienceDataLayer[0]).to.deep.equal({
				email: 'devops@gousto.co.uk',
				goustoReference: '12345',
			})
		})

		it('should also run on update', function() {
			const wrapper = mount(<Page
				disabled={false}
				isAuthenticated
				email="devops@gousto.co.uk"
				goustoReference="12345"
			/>)
			expect(dataScienceDataLayer).to.have.length(1)
			expect(dataScienceDataLayer[0]).to.deep.equal({
				email: 'devops@gousto.co.uk',
				goustoReference: '12345',
			})

			wrapper.setProps({
				email: 'alice@gousto.co.uk',
				goustoReference: '12345',
			})

			expect(dataScienceDataLayer).to.have.length(2)
			expect(dataScienceDataLayer[1]).to.deep.equal({
				email: 'alice@gousto.co.uk',
				goustoReference: '12345',
			})
		})
	})
})
