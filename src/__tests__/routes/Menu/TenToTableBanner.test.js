import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import Gel from 'Gel'
import Segment from 'Button/Segment'

import TenToTableBanner from 'routes/Menu/TenToTableBanner/TenToTableBanner'

describe('<TenToTableBanner />', () => {
	let wrapper

	test('should render by default', () => {
		wrapper = shallow(<TenToTableBanner />)

		expect(wrapper.find(Gel).length).toBeGreaterThanOrEqual(1)
	})

	test('should not render when hide is true', () => {
		wrapper = shallow(<TenToTableBanner hide />)

		expect(wrapper.find(Gel).length).toBe(0)
	})

	test('should trigger a menuCurrentCollectionChange when Button is clicked', () => {
		const collectionFilterChangeSpy = sinon.spy()
		wrapper = shallow(
			<TenToTableBanner
				collectionFilterChange={collectionFilterChangeSpy}
			/>,
		)
		wrapper
			.find(Segment)
			.first()
			.simulate('click')

		expect(collectionFilterChangeSpy.callCount).toBeGreaterThanOrEqual(1)
	})
})
