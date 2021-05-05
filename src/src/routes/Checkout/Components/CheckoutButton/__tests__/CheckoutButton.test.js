import React from 'react'
import { shallow } from 'enzyme'
import { CheckoutButton } from '../CheckoutButton'

describe('CheckoutButton', () => {
  let wrapper
  const onClick = jest.fn()

  beforeEach(() => {
    wrapper = shallow(<CheckoutButton stepName="go to delivery" onClick={onClick} />)
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
