import sinon from 'sinon'

import { shallow } from 'enzyme'
import React from 'react'
import Immutable from 'immutable' /* eslint-disable new-cap */
import OpeningsContainer from 'routes/Jobs/Openings/OpeningsContainer'

describe('Openings Container', () => {
	let sandbox
	let jobsFilterStub
	let store
	let jobsExpectedResult
	// eslint-disable-next-line no-unused-vars

	beforeEach(() => {
		const jobs = {
			1: 'this',
			2: 'that',
			filter: () => {},
		}
		const selectedDepartment = 'Creative'
		jobsExpectedResult = {
			1: 'this',
			2: 'that',
		}
		store = {
			getState: () => ({
				jobs: Immutable.Map({
					jobs,
				}),
				jobsDepartment: Immutable.Map({
					selectedDepartment,
				}),
			}),
		}
		sandbox = sinon.sandbox.create()
		jobsFilterStub = sandbox.stub(jobs, 'filter')
		jobsFilterStub.returns(jobsExpectedResult)
	})

	afterEach(() => {
		sandbox.restore()
	})

	test('map state to props', () => {
		const wrapper = shallow(<OpeningsContainer store={store} />)
		expect(wrapper.prop('jobs')).toEqual(jobsExpectedResult)
	})
})
