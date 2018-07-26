import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import actionTypes from 'actions/actionTypes'
import jobActions from 'actions/jobs'
const jobsApi = require('apis/workable')

describe('jobs action', () => {
	let sandbox
	let dispatchSpy
	let fetchJobsSpy

	beforeEach(function() {
		sandbox = sinon.sandbox.create()
		dispatchSpy = sinon.spy()
		fetchJobsSpy = sandbox.stub(jobsApi, 'fetchJobs').returns(new Promise((resolve) => {
			resolve({ results: { job1: 'a', job2: 'b' } })
		}))
	})

	afterEach(() => {
		sandbox.restore()
	})

	it('should create an action to add a todo', () => {
		const department = 'test department'
		const expectedAction = {
			type: actionTypes.JOBS_DEPARTMENT_CHANGE,
			department,
		}
		expect(jobActions.selectDepartment(department)).to.deep.equal(expectedAction)
	})

	it('should fetch jobs', async function() {
		await jobActions.fetchOpenJobs()(dispatchSpy)
		// eslint-disable-next-line no-unused-expressions
		expect(fetchJobsSpy).to.have.been.called.once
		// eslint-disable-next-line no-unused-expressions
		expect(dispatchSpy).to.have.been.called.once
	})
})
