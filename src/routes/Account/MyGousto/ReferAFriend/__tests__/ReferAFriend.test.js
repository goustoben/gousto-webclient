import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'
import { ReferAFriend } from '../ReferAFriend'

describe('Refer A Friend', () => {

  const referralDetails = Immutable.Map({
    referralCount: '2',
    referralCredit: '30',
  })
  let wrapper = shallow(<ReferAFriend referralDetails={referralDetails} />)

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

  describe('onClick', () => {
    it('should call redirect with /my-referrals', () => {
      const redirectSpy = jest.fn()
      wrapper = shallow(<ReferAFriend referralDetails={referralDetails} redirect={redirectSpy}/>)
      wrapper.find('Button').simulate('click')
      expect(redirectSpy).toHaveBeenCalledWith('/my-referrals')

    })
  })
})
