import React from 'react'
import sinon from 'sinon'
import { shallow } from 'enzyme'

import { List } from 'routes/GetHelp/OrderIssue/List/List'
import { Item } from 'routes/GetHelp/OrderIssue/List/Item'


describe('<List />', () => {
	const categories = [{ name: 'test', url: '/test' }]

	test('list component renders correctly', () => {
		const orderIssueSelected = sinon.spy()
		const wrapper = shallow(
			<List categories={categories} orderIssueSelected={orderIssueSelected} />
		)

		expect(wrapper.find('ul')).toHaveLength(1)
		expect(wrapper.find(Item)).toHaveLength(1)

		wrapper.find(Item).simulate('click')

		expect(orderIssueSelected.calledOnce).toBe(true)
	})
})
