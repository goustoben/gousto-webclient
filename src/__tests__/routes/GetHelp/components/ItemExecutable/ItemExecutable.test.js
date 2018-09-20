import React from 'react'
import { mount } from 'enzyme'

import Item from 'routes/GetHelp/components/Item'
import ItemExecutable from 'routes/GetHelp/components/ItemExecutable'
import css from 'routes/GetHelp/components/ItemExecutable/ItemExecutable.css'


describe('<ItemExecutable />', () => {
	describe('render', () => {
		const wrapper = mount(
			<ItemExecutable label="item-label"/>
		)

		test('it renders the label', () => {
			expect(wrapper.text()).toContain('item-label')
		})

		test('it renders the arrow right', () => {
			expect(wrapper.find(`.${css.itemArrowRight}`)).toHaveLength(1)
		})
	})

	describe('behaviour', () => {
		test('the onClick function is executed', () => {
			const onClickSpy = jest.fn()
			const wrapper = mount(
				<ItemExecutable
					label="item-label"
					onClick={onClickSpy}
				/>
			)
			wrapper.simulate('click')

			expect(onClickSpy).toHaveBeenCalledTimes(1)
		})

		test('the click event is propagated, so the <Item> onClick function is called', () => {
			const trackClickSpy =  jest.fn()
			const onClickSpy = jest.fn()
			const wrapper = mount(
				<Item trackClick={trackClickSpy}>
					<ItemExecutable
						label="item-label"
						onClick={onClickSpy()}
					/>
				</Item>
			)
			const itemExecutable = wrapper.find('ItemExecutable')
			itemExecutable.simulate('click')

			expect(onClickSpy).toHaveBeenCalledTimes(1)
			expect(trackClickSpy).toHaveBeenCalledTimes(1)
		})
	})
})
