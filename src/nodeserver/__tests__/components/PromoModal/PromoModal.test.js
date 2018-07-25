import sinon from 'sinon'

import React from 'react'
import { shallow } from 'enzyme'

import PromoModal from 'components/PromoModal/PromoModal'
import ModalPanel from 'Modal/ModalPanel'

describe('PromoModal', () => {
	let wrapper

	test('should return a ModalPanel with no props', () => {
		wrapper = shallow(<PromoModal />)
		expect(wrapper.type()).toEqual(ModalPanel)
	})
})
