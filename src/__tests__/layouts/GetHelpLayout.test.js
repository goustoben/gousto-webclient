import React from 'react'
import { shallow } from 'enzyme'
import GetHelpLayout from 'layouts/GetHelpLayout/GetHelpLayout'

describe('GetHelpLayout', () => {
	let wrapper

	beforeEach(() => {
		const BottomBar = () => (<div>Bottom Bar</div>)

		wrapper = shallow(
			<GetHelpLayout title="test title" body="test body description">
				<div className="unique" />
				<BottomBar />
			</GetHelpLayout>
		)
	})

	test('component is rendering header correctly', () => {
		expect(wrapper.find('PageHeader').prop('title')).toBe('test title')
	})

	test('component is rendering button bar correctly', () => {
		const bodyContent = wrapper
			.find('PageContent')
			.find('.bodyContent')
		const PageContent = wrapper
			.find('PageContent')

		expect(bodyContent.find('BottomBar')).toHaveLength(0)

		expect(PageContent).toHaveLength(1)
	})

	test('component content is rendering correctly', () => {
		const bodyContent = wrapper
			.find('PageContent')
			.find('.bodyContent')

		expect(bodyContent.find('.unique')).toHaveLength(1)
	})
})
