import React from 'react';
import { Map } from 'immutable'
import { shallow } from 'enzyme'

import Confirm from 'routes/Unsubscribe/Confirm'
import Unsubscribed from 'routes/Unsubscribe/Unsubscribed'
import Unsubscribe from 'routes/Unsubscribe/Unsubscribe'

describe('<Unsubscribe />', () => {
	test('<Confirm /> is rendering correctly', () => {
		const wrapper = shallow(
			<Unsubscribe
				error={''}
				pending={false}
				isUserUnsubscribed={false}
				copy={{
					confirmHeader: '',
					unsubscribedHeader: '',
					defaultError: '',
					body1: '',
					body2: '',
					link: '',
					button: '',
				}}
				userUnsubscribeAction={() => {}}
			/>
		)

		expect(wrapper.find(Confirm).length).toBe(1)
		expect(wrapper.find(Unsubscribed).length).toBe(0)
	})

	test('<Unsubscribed /> is being redered instead of <Confirm />', () => {
		const wrapper = shallow(
			<Unsubscribe
				error={''}
				pending={false}
				isUserUnsubscribed
				copy={{
					confirmHeader: '',
					unsubscribedHeader: '',
					defaultError: '',
					body1: '',
					body2: '',
					link: '',
					button: '',
				}}
				userUnsubscribeAction={() => {}}
			/>
		)


		expect(wrapper.find(Unsubscribed).length).toBe(1)
		expect(wrapper.find(Confirm).length).toBe(0)
	})
})
