import React from 'react'
import { shallow } from 'enzyme'

import NewAddressForm from 'routes/Account/MyDeliveries/OrdersList/NewAddressModal//NewAddressForm'
import NewAddressModal from 'routes/Account/MyDeliveries/OrdersList/NewAddressModal/NewAddressModal'

describe('NewAddressModal', () => {
	let wrapper

	beforeEach(() => {
		wrapper = shallow(<NewAddressModal isModalOpen />, { context: { store: {} } })
	})

	test('should return a ModalPanel with no props', () => {
		expect(wrapper.text()).toBe('<Overlay />')
	})

	test('should return a <ModalPanel>', () => {
		expect(wrapper.find('ModalPanel').length).toBe(1)
	})

	test('should return the correct body text', () => {
		expect(wrapper.find('h2')).toHaveLength(1)
		expect(wrapper.find('h2').text()).toBe('Add new address')
	})

	test('Should render a newAddressForm component', () => {
		expect(wrapper.find(NewAddressForm)).toHaveLength(1)
	})
})
