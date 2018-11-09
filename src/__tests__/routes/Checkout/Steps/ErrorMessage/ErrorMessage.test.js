import sinon from 'sinon'

import React from 'react'
import { shallow } from 'enzyme'
import ErrorMessage from 'routes/Checkout/Components/ErrorMessage/ErrorMessage'
import { Alert } from 'goustouicomponents'
import config from 'config/checkout'

describe('ErrorMessage', () => {
  describe('rendering', () => {
    let errorMessageStub

    beforeEach(() => {
      errorMessageStub = sinon.stub(config, 'errorMessage').get(function() {
        return {
          generic: 'generic configured message',
          specificMessage: 'specific configured message',
        }
      })
    })

    afterEach(() => {
      errorMessageStub.restore()
    })

    test('should return null by default', () => {
      const wrapper = shallow(<ErrorMessage />)
      expect(wrapper.type()).toEqual(null)
    })

    test('should return div if error provided', () => {
      const wrapper = shallow(<ErrorMessage errorType="some-error-type" />)
      expect(wrapper.type()).toEqual('div')
    })

    test('should contain 1 Alert if error provided', () => {
      const wrapper = shallow(<ErrorMessage errorType="some-error-type" />)
      expect(wrapper.find(Alert).length).toEqual(1)
    })

    test('should contain child with default error message if no configured match is found', () => {
      const wrapper = shallow(
				<ErrorMessage errorType="some-unknown-error-type" />,
      )
      expect(wrapper.find(Alert).prop('children')).toEqual(
        'generic configured message',
      )
    })

    test('should display error message for matching type if available', () => {
      const wrapper = shallow(<ErrorMessage errorType="specificMessage" />)
      expect(wrapper.find(Alert).prop('children')).toEqual(
        'specific configured message',
      )
    })
  })
})
