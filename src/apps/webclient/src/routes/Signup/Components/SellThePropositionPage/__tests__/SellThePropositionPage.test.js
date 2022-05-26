import React from 'react'

import { shallow } from 'enzyme'

import { SellThePropositionPage } from '../SellThePropositionPage'

describe('SellThePropositionPage', () => {
  let wrapper
  const signupGoToMenu = jest.fn()

  beforeEach(() => {
    wrapper = shallow(<SellThePropositionPage signupGoToMenu={signupGoToMenu} />)
  })

  test('renders correctly', () => {
    expect(wrapper.find('.list').exists()).toBe(true)
    expect(wrapper.find('CheckoutButton').exists()).toBe(true)
  })

  describe('when the primary button is clicked', () => {
    beforeEach(() => {
      wrapper.find('CheckoutButton').simulate('click')
    })

    test('then the signupGoToMenu action should be dispatched', () => {
      expect(signupGoToMenu).toHaveBeenCalled()
    })
  })
})
