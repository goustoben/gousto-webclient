import React from 'react'
import { shallow } from 'enzyme'

import Perk from 'routes/Jobs/Perks/PerkCircle/Perk'

describe('Perk', () => {
	test('should render set of divs', () => {
		const wrapper = shallow(<Perk />)
		expect(wrapper.find('div')).toHaveLength(4)
	})
	test('should render svg span', () => {
		const wrapper = shallow(<Perk />)
		expect(wrapper.find('span')).toHaveLength(1)
	})
})
