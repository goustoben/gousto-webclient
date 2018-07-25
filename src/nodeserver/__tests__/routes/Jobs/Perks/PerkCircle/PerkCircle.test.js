import React from 'react'
import { shallow } from 'enzyme'

import PerkCircle from 'routes/Jobs/Perks/PerkCircle/PerkCircle'
import css from 'routes/Jobs/Perks/PerkCircle/PerkCircle.css'

describe('Perk Circles', () => {
	test('should render The perk flex container', () => {
		const wrapper = shallow(<PerkCircle />)
		const className = `.${css.flexContainer.split(' ').join('.')}`
		expect(wrapper.find(className)).toHaveLength(1)
	})
})
