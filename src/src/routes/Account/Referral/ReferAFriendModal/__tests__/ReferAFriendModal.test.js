import React from 'react'
import { shallow } from 'enzyme'
import { ReferAFriendModal } from '../ReferAFriendModal'
import ReferAFriend from '../../ReferAFriend'

describe('ReferAFriendModal', () => {
  let wrapper
  const onClose = jest.fn()

  beforeEach(() => {
    wrapper = shallow(
      <ReferAFriendModal onClose={onClose}/>
    )
  })

  it('should render ReferAFriend component', () => {
    expect(wrapper.find(ReferAFriend).length).toEqual(1)
  })
  
  it('should render a heading', () => {
    expect(wrapper.find('h4').text()).toEqual('Refer a friend - Get £15')
  })
  
})
