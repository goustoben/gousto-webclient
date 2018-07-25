import React from 'react'
import { shallow } from 'enzyme'

import sinon from 'sinon'

import * as Elements from 'Page/Elements'

describe('Page Elements', () => {
	let wrapper

	Object.keys(Elements).forEach(elementName => {
		describe(`${elementName} rendering`, () => {
			const expectedType = elementName.toLowerCase()
			const El = Elements[elementName]

			beforeEach(() => {
				wrapper = shallow(
					<El
						disabled
						data-tracking={1}
						aria-something="2"
						type="something"
						b
					/>,
				)
			})

			test(`should return <${expectedType}>`, () => {
				expect(wrapper.type()).toEqual(expectedType)
			})

			test('should pass on all supported props', () => {
				expect(wrapper.prop('disabled')).toEqual(true)
				expect(wrapper.prop('data-tracking')).toEqual(1)
				expect(wrapper.prop('aria-something')).toEqual('2')
				expect(wrapper.prop('b')).toEqual(undefined)
			})
		})
	})
})
