import sinon from 'sinon'

import React from 'react'
import { shallow } from 'enzyme'

import createCtaContainer from 'utils/createCtaContainer'
import { Button } from 'goustouicomponents'
import Link from 'Link'

describe('createCtaContainer', () => {
	let ConnectContainer
	let wrapper

	const store = {
		default: () => {},
		subscribe: () => {},
		dispatch: () => {},
		getState: () => {},
	}

	test('should return connected Button by default', () => {
		ConnectContainer = createCtaContainer({ text: '' })

		wrapper = shallow(<ConnectContainer store={store} />)

		expect(wrapper.type()).toEqual(Button)
	})

	test('should return connected Link if type is "Link"', () => {
		ConnectContainer = createCtaContainer({ type: 'Link', text: '' })

		wrapper = shallow(<ConnectContainer store={store} />)

		expect(wrapper.type()).toEqual(Link)
	})

	test('should map children to text by default', () => {
		ConnectContainer = createCtaContainer({ text: 'Sample Text' })

		wrapper = shallow(<ConnectContainer store={store} />)

		expect(wrapper.prop('children')).toEqual('Sample Text')
	})

	test('should map children to passed in prop "text" if set', () => {
		ConnectContainer = createCtaContainer({ text: 'Sample Text' })

		wrapper = shallow(<ConnectContainer store={store} text="Override Text" />)

		expect(wrapper.prop('children')).toEqual('Override Text')
	})

	test('should map onClick to passed in action', () => {
		const actionSpy = sinon.spy()
		ConnectContainer = createCtaContainer({ action: actionSpy, text: '' })

		wrapper = shallow(<ConnectContainer store={store} />)
		wrapper.simulate('click')

		expect(actionSpy.callCount).toEqual(1)
	})
})
