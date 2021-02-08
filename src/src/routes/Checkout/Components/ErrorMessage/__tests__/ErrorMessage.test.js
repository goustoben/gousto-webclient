import React from 'react'
import { shallow } from 'enzyme'
import { ErrorMessage } from '../ErrorMessage'

describe('given ErrorMessage', () => {
  let wrapper
  const onLoginClick = jest.fn()

  beforeEach(() => {
    wrapper = shallow(<ErrorMessage isCheckoutOverhaulEnabled onLoginClick={onLoginClick} />)
  })

  describe('when errorType is user-exists', () => {
    beforeEach(() => {
      wrapper.setProps({
        errorType: 'user-exists',
      })
    })

    test('then it should render correctly', () => {
      expect(wrapper.find('CustomerCareDetails').exists()).toBeFalsy()
      expect(wrapper.find('a').exists()).toBeTruthy()
      expect(wrapper.find('a').prop('children')).toBe('Log in')
    })

    describe('and when the Log in link is clicked', () => {
      beforeEach(() => {
        wrapper.find('a').simulate('click', { preventDefault: jest.fn() })
      })

      test('then the onLoginClick callback should be invoked', () => {
        expect(onLoginClick).toBeCalled()
      })
    })
  })
})
