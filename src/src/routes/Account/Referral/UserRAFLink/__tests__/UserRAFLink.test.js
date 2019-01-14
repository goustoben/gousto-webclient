import React from 'react'
import { shallow } from 'enzyme'
import { UserRAFLink } from '../UserRAFLink'

describe('rendering', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<UserRAFLink isModal={false} referralCode="12345" >children</UserRAFLink>)
  })

  describe('UserRAFLink', () => {
    test('should have position top 45px if not in modal', () => {
      expect(wrapper.find('.positionTop45').length).toEqual(1)
    })

    test('should render the children', () => {
      expect(wrapper.find('CopyToClipboard').children().get(0)).toEqual('children')
    })
  })
})