import React from 'react'
import { shallow } from 'enzyme'
import { ReferAFriendModal } from '../ReferAFriendModal'
import { ReferAFriendContainer } from '../../ReferAFriend'

describe('ReferAFriendModal', () => {
  let wrapper
  const onClose = jest.fn()

  beforeEach(() => {
    wrapper = shallow(
      <ReferAFriendModal onClose={onClose} credit="£15" />
    )
  })

  it('should render ReferAFriendContainer component', () => {
    expect(wrapper.find(ReferAFriendContainer).length).toEqual(1)
  })

  it('should render a heading', () => {
    expect(wrapper.find('h4').text()).toEqual('Refer a friend - Get £15')
  })
})
