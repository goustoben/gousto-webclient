import React from 'react'
import { mount } from 'enzyme'

import Item from 'routes/GetHelp/components/Item'
import css from 'routes/GetHelp/components/Item/Item.css'


describe('<Item />', () => {
	const ChildComponent = () => (<div>Test child</div>)

	describe('render', () => {
		test('it renders the children', () => {
			const wrapper = mount(
				<Item>
					<ChildComponent/>
					<ChildComponent/>
				</Item>
			)

			expect(wrapper.find('li')).toHaveLength(1)
			expect(wrapper.find(ChildComponent)).toHaveLength(2)
		})

		test('it hides on mobile when the corresponding prop is passed', () => {
			const wrapper = mount(
				<Item isHiddenOnMobile />
			)

			expect(wrapper.find(`.${css.hiddenOnMobile}`)).toHaveLength(1)
		})

		test('it does not hide on mobile when the corresponding prop is passed', () => {
			const wrapper = mount(
				<Item isHiddenOnMobile={false} />
			)

			expect(wrapper.find(`.${css.hiddenOnMobile}`)).toHaveLength(0)
		})
	})

	describe('behaviour', () => {
		test('it calls passed function when clicked', () => {
			const trackClickSpy = jest.fn()
			const wrapper = mount(
				<Item trackClick={trackClickSpy} />
			)
			wrapper.simulate('click')

			expect(trackClickSpy).toHaveBeenCalledTimes(1)
		})
	})
})
