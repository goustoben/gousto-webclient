import React from 'react'
import { shallow } from 'enzyme'
import ProductHeader from '../../../js/products/components/header/ProductHeader'
import ConfirmationHeader from '../../../js/products/components/header/ConfirmationHeader'

describe('ProductHeader', () => {
	it('should show <div/>', () => {
		const result = shallow(<ProductHeader />)
		expect(result.type()).toEqual('div')
	})
	it('should not show order confirmation if showConfirmation is false', () => {
		const result = shallow(<ProductHeader showConfirmation={false} />)
		expect(result.find('ConfirmationHeader').length).toEqual(0)
	})
	it('should show order confirmation if showConfirmation is true', () => {
		const result = shallow(<ProductHeader showConfirmation={true} />)
		expect(result.find('ConfirmationHeader').length).toEqual(1)
	})
})
