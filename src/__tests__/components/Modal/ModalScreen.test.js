import React from 'react'
import { shallow } from 'enzyme'

import ModalScreen from 'components/Modal/ModalScreen'
import ModalHeader from 'components/Modal/ModalHeader'

describe('ModalScreen', () => {
	let wrapper

	test('should render a <div>', () => {
		wrapper = shallow(<ModalScreen />)

		expect(wrapper.type()).toEqual('div')
	})

	test('should render a <ModalHeader> with title as children if title is provided', () => {
		wrapper = shallow(<ModalScreen title="test title" />)
		const firstChildWrapper = wrapper.children().first()

		expect(firstChildWrapper.type()).toEqual(ModalHeader)
		expect(firstChildWrapper.prop('children')).toEqual('test title')
	})

	test('should render children', () => {
		wrapper = shallow(
			<ModalScreen>
				<p>Child</p>
			</ModalScreen>,
		)
		const firstChildWrapper = wrapper.children().first()

		expect(firstChildWrapper.type()).toEqual('p')
		expect(firstChildWrapper.prop('children')).toEqual('Child')
	})
})
