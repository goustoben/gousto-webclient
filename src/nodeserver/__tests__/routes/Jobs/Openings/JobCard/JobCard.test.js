import React from 'react'
import { shallow } from 'enzyme'

import JobCard from 'routes/Jobs/Openings/JobCard/JobCard'
import css from 'routes/Jobs/Openings/JobCard/JobCard.css'

describe('Jobs Card', () => {
	test('should render 1 job title', () => {
		const wrapper = shallow(<JobCard />)
		const className = `.${css.jobTitle.split(' ').join('.')}`
		expect(wrapper.find(className)).toHaveLength(1)
	})

	test('should render 1 job department', () => {
		const wrapper = shallow(<JobCard />)
		const className = `.${css.jobDepartment.split(' ').join('.')}`
		expect(wrapper.find(className)).toHaveLength(1)
	})

	test('should render 1 job link', () => {
		const wrapper = shallow(<JobCard />)
		const className = `.${css.jobCTA.split(' ').join('.')}`
		expect(wrapper.find(className)).toHaveLength(1)
	})
})
