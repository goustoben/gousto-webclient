import React from 'react'
import { mount } from 'enzyme'

import Item from 'routes/GetHelp/components/Item'
import ItemExpandable from 'routes/GetHelp/components/ItemExpandable'
import css from 'routes/GetHelp/components/ItemExpandable/ItemExpandable.css'


describe('<ItemExpandable />', () => {
	const ChildComponent = () => (<div>Test child</div>)
	let wrapper

	beforeEach(() => {
		wrapper = mount(
			<ItemExpandable label="item-label">
				<ChildComponent/>
				<ChildComponent/>
			</ItemExpandable>
		)
	})

	describe('rendering', () => {
		test('it renders the label', () => {
			expect(wrapper.text()).toContain('item-label')
		})

		test('by default, the arrow points right and the children are not shown', () => {
			expect(wrapper.find(`.${css.itemArrowRight}`)).toHaveLength(1)
			expect(wrapper.find(`.${css.itemArrowDown}`)).toHaveLength(0)
			expect(wrapper.find(ChildComponent)).toHaveLength(0)
		})
	})

	describe('behaviour', () => {
		test('when clicking the arrow points down', () => {
			wrapper.simulate('click')

			expect(wrapper.find(`.${css.itemArrowRight}`)).toHaveLength(0)
			expect(wrapper.find(`.${css.itemArrowDown}`)).toHaveLength(1)
		})

		test('when clicking the children are shown, if clicked again it is hidden', () => {
			wrapper.simulate('click')

			expect(wrapper.find(ChildComponent)).toHaveLength(2)

			wrapper.simulate('click')

			expect(wrapper.find(ChildComponent)).toHaveLength(0)
		})

		test('the click event is propagated, so the <Item> onClick function is called', () => {
			const trackClickSpy =  jest.fn()
			wrapper = mount(
				<Item trackClick={trackClickSpy}>
					<ItemExpandable label="item-label">
						<ChildComponent/>
					</ItemExpandable>
				</Item>
			)
			wrapper.find(`.${css.itemContent}`).simulate('click')

			expect(trackClickSpy).toHaveBeenCalledTimes(1)
		})
	})
})
