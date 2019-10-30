import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'
import { ReferAFriend } from '../ReferAFriend'

describe('Refer A Friend', () => {
  const referralDetails = Immutable.Map({
    referralCount: '2',
    referralCredit: '30',
  })
  const wrapper = shallow(<ReferAFriend referralDetails={referralDetails} />)

  it('should render an image div', () => {
    expect(wrapper.find('.rafImageWrapper').length).toEqual(1)
  })

  it('should render 2 stamp elements', () => {
    expect(wrapper.find('.rafStamp').length).toEqual(2)
  })

  it('should render number of friends referred in first stamp', () => {
    expect(wrapper.find('.rafDetailsValue').at(0).text()).toEqual('2')
  })

  it('should render Gousto credit you have earned in second stamp', () => {
    expect(wrapper.find('.rafDetailsValue').at(1).text()).toEqual('£30')
  })

  it('should render a shareExperience element', () => {
    expect(wrapper.find('.shareExperience').length).toEqual(1)
  })
})
