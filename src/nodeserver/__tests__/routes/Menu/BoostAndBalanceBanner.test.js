import React from 'react'
import { shallow } from 'enzyme'

import BoostAndBalanceBanner from 'routes/Menu/BoostAndBalanceBanner'

describe('<BoostAndBalanceBanner />', () => {
	let wrapper

	test('should render by default', () => {
		wrapper = shallow(<BoostAndBalanceBanner />)

		expect(wrapper.find('div').length).toBeGreaterThanOrEqual(1)
	})

	test('should hide when hide prop is set to true', () => {
		wrapper = shallow(<BoostAndBalanceBanner hide />)

		expect(wrapper.find('div').length).toEqual(0)
	})
})
