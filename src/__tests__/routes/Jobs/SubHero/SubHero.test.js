import React from 'react'
import { shallow } from 'enzyme'

import SubHero from 'routes/Jobs/SubHero/SubHero'

describe('SubHero', () => {
	test('should have only 1 div', () => {
		const wrapper = shallow(<SubHero />)
		expect(wrapper.find('div')).toHaveLength(1)
	})
})
