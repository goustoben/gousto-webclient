import React from 'react'
import sinon from 'sinon'

import { shallow, mount } from 'enzyme'
import Immutable from 'immutable' /* eslint-disable new-cap */
import config from 'config/jobs'

import Openings from 'routes/Jobs/Openings/Openings'
import css from 'routes/Jobs/Openings/Openings.css'

import JobCard from 'routes/Jobs/Openings/JobCard'

describe('Openings/Openings', () => {
  let jobs
  let wrapper
  let departments
  let selectedDepartment

  beforeEach(() => {
    departments = Object.keys(config.Openings)
    selectedDepartment = 'All'

    jobs = Immutable.fromJS({
      1: { title: 'a job' },
      2: { title: 'another job' },
      3: { title: 'another job2' },
      4: { title: 'another job3' },
    })
    wrapper = shallow(<Openings jobs={jobs} depts={departments} />)
  })
  afterEach(() => {})
  test('should contain an h1', () => {
    expect(wrapper.find('h1')).toHaveLength(1)
  })
  test('should contain an h2', () => {
    expect(wrapper.find('h2')).toHaveLength(1)
  })
  test('should render one JobCard for each job passed as prop', () => {
    // stub this.props.jobs to return defined set of x jobs
    expect(wrapper.find(JobCard)).toHaveLength(4)
  })
  test('should render one deptContainer with a jobSelector per department', () => {
    wrapper = shallow(<Openings jobs={jobs} depts={departments} />)
    const jsclassName = `.${css.jobSelector.split(' ').join('.')}`
    const dcclassName = `.${css.deptContainer.split(' ').join('.')}`
    expect(wrapper.find(jsclassName)).toHaveLength(departments.length - 1)
    expect(wrapper.find(dcclassName)).toHaveLength(1)
  })
  test('should render one active jobSelector', () => {
    wrapper = shallow(
      <Openings
        jobs={jobs}
        depts={departments}
        selectedDepartment={selectedDepartment}
      />,
    )
    const className = `.${css.activeJobSelector.split(' ').join('.')}`
    expect(wrapper.find(className)).toHaveLength(1)
  })
})
