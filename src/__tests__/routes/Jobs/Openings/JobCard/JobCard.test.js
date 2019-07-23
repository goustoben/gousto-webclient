import React from 'react'
import { shallow } from 'enzyme'
import JobCard from 'routes/Jobs/Openings/JobCard/JobCard'

describe('The JobCard component', () => {
  let wrapper
  beforeEach(() => {
    const mockProps = {
      jobTitle: 'Test job',
      jobDepartment: 'Test department',
      jobLink: 'https://gousto.workable.com/jobs/123456',
    }
    wrapper = shallow(<JobCard {...mockProps} />)
  })

  test('should display the correct job title', () => {
    expect(wrapper.find('.jobTitle').text()).toBe('Test job')
  })

  test('should display the correct job department', () => {
    expect(wrapper.find('.jobDepartment').text()).toBe('Test department')
  })

  test('should display the job as a link to the correct Workable page', () => {
    expect(wrapper.find('GoustoLink').prop('to')).toBe('https://gousto.workable.com/jobs/123456')
  })

  test('should display a read more link to the correct Workable page', () => {
    expect(wrapper.find('.jobCTA').prop('to')).toBe('https://gousto.workable.com/jobs/123456')
  })

  test('should use the Gousto Workable link if no specific job link is provided', () => {
    wrapper = shallow(<JobCard />)
    expect(wrapper.find('GoustoLink').prop('to')).toBe('https://gousto.workable.com/')
  })
})
