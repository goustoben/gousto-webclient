import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'
import config from 'config/jobs'
import Openings from 'routes/Jobs/Openings/Openings'

describe('The Openings component', () => {
  let jobs
  let wrapper
  let departments
  let selectedDepartment
  let selectDepartment

  describe('the layout', () => {
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

    test('renders a pre-header', () => {
      expect(wrapper.find('.preHeader')).toHaveLength(1)
    })

    test('renders a main header', () => {
      expect(wrapper.find('.header')).toHaveLength(1)
    })

    test('renders one JobCard for each job passed as prop', () => {
      expect(wrapper.find('JobCard')).toHaveLength(4)
    })

    test('renders one deptContainer with a jobSelector per department', () => {
      wrapper = shallow(<Openings jobs={jobs} depts={departments} />)
      const jsclassName = `.${css.jobSelector.split(' ').join('.')}`
      const dcclassName = `.${css.deptContainer.split(' ').join('.')}`
      expect(wrapper.find(jsclassName)).toHaveLength(departments.length - 1)
      expect(wrapper.find(dcclassName)).toHaveLength(1)
    })

    test('renders one active jobSelector', () => {
      wrapper = shallow(
        <Openings
          jobs={jobs}
          depts={departments}
          selectedDepartment={selectedDepartment}
        />
      )
      const className = `.${css.activeJobSelector.split(' ').join('.')}`
      expect(wrapper.find(className)).toHaveLength(1)
    })
  })

  describe('the layout when there are no jobs to display', () => {
    beforeEach(() => {
      departments = Object.keys(config.Openings)
      selectedDepartment = 'Customer Care'
      jobs = Immutable.Map()

      wrapper = shallow(
        <Openings
          jobs={jobs}
          depts={departments}
          selectedDepartment={selectedDepartment}
        />
      )
    })

    test('shows the no jobs paragraph', () => {
      expect(wrapper.find('.noJobsText').length).toBe(1)
    })

    test('shows the correct email link', () => {
      expect(wrapper.find('GoustoLink').props('to').to).toBe('mailto:jobs@gousto.co.uk')
    })
  })

  describe('the component functionality', () => {
    beforeEach(() => {
      departments = Object.keys(config.Openings)
      selectedDepartment = 'All'
      jobs = Immutable.fromJS({
        1: { title: 'a job' },
        2: { title: 'another job' },
        3: { title: 'another job2' },
        4: { title: 'another job3' },
      })
      selectDepartment = jest.fn()

      wrapper = shallow(
        <Openings
          jobs={jobs}
          depts={departments}
          selectedDepartment={selectedDepartment}
          selectDepartment={selectDepartment}
        />
      )
    })
    test('calls the function to filters jobs when a department is selected', () => {
      const targetJobSelector = wrapper.find('.jobSelector').at(1)
      targetJobSelector.simulate('click')
      expect(selectDepartment).toHaveBeenCalledWith(targetJobSelector.key())
    })
  })
})
