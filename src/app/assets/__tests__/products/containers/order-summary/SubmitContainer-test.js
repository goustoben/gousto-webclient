import React from 'react'
import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import Immutable from 'immutable' /* eslint-disable new-cap */
import SubmitContainer from 'products/containers/order-summary/SubmitContainer'
import { shallow, mount } from 'enzyme'

import Submit from 'order-summary/components/submit/Submit'
import configureStore from 'redux-mock-store'
const mockStore = configureStore()

describe('products/containers/order-summary/SubmitContainer', () => {
	let wrapper
	let testData
	describe('rendering', () => {
		beforeEach(() => {
			testData = {
				store: mockStore({}),
			}
		})
		it('should render one <SubmitContainer>', () => {
			wrapper = shallow(<SubmitContainer {...testData} />)
			expect(wrapper.length).to.be.equal(1)
			expect(wrapper.type().displayName).to.be.equal('OrderSummarySubmit')
		})
	})
})
