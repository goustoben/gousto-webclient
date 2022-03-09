import React from 'react'
import { shallow } from 'enzyme'
import { useSelector } from 'react-redux'
import { CheckoutCounter } from '../CheckoutCounter'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}))

describe('CheckoutCounter', () => {
  let wrapper

  beforeEach(() => {
    useSelector.mockReturnValue(2)
    wrapper = shallow(<CheckoutCounter />)
  })

  test('renders correctly', () => {
    expect(wrapper.text()).toBe('2/4')
  })
})
