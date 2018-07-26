import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import sinon from 'sinon'

import RangeBadge from 'Recipe/RangeBadge'
import InfoBadge from 'Recipe/InfoBadge'
import colors from 'styles/colors.css'

describe('<RangeBadge />', () => {
	test('should not render by default', () => {
		const wrapper = shallow(<RangeBadge />)

		expect(wrapper.find(InfoBadge).length).toBe(0)
	})

	describe('snapshots', () => {
		test('should render when given a preconfigured range', () => {
			const whiteStub = sinon.stub(colors, 'White').get(() => '#FFFFFF')
			const tree = renderer
				.create(<RangeBadge range={'ten_to_table'} />)
				.toJSON()

			expect(tree).toMatchSnapshot()
			whiteStub.reset()
		})
	})
})
