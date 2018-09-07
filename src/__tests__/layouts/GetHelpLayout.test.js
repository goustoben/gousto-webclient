import React from 'react'
import { shallow } from 'enzyme'
import GetHelpLayout from 'layouts/GetHelpLayout/GetHelpLayout'
import BottomBar from 'BottomBar'

describe('GetHelpLayout', () => {
	let wrapper

	beforeEach(() => {
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

	test('component is rendering bottom bar correctly', () => {
		console.log('where is BottomBar', wrapper.html())
		const PageContent = wrapper.find('PageContent')
		const bodyContent = PageContent.find('.bodyContent')


		expect(bodyContent.find('BottomBar')).toHaveLength(0)
		expect(PageContent.find('BottomBar')).toHaveLength(1)
	})

	test('component content is rendering correctly', () => {
		const bodyContent = wrapper
			.find('PageContent')
			.find('.bodyContent')

		expect(bodyContent.find('.unique')).toHaveLength(1)
	})
})
