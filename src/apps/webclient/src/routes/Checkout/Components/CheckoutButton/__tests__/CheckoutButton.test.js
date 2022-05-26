import React from 'react'

import { shallow } from 'enzyme'

import { CheckoutButton } from '../CheckoutButton'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(() => true),
  useSelector: jest.fn(),
}))

describe('CheckoutButton', () => {
  let wrapper
  const onClick = jest.fn()

  beforeEach(() => {
    wrapper = shallow(<CheckoutButton onClick={onClick}>go to delivery</CheckoutButton>)
  })

  test('Should render correctly', () => {
    expect(wrapper.find('button').exists()).toBeTruthy()
  })

  describe('When button is clicked', () => {
    beforeEach(() => {
      wrapper.simulate('click')
    })

    test('Then onClick should be called', () => {
      expect(onClick).toHaveBeenCalled()
    })
  })
})
