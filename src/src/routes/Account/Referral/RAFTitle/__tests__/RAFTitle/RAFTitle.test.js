import React from 'react'
import { shallow } from 'enzyme'
import { RAFTitle } from '../../RAFTitle'

describe('RAFTitle', () => {
  describe('render', () => {
    const wrapper = shallow(<RAFTitle title="Invite your friends to try out Craft!" />)

    test('should render RAF title', () => {
      expect(wrapper.find('.rafTitle').length).toEqual(1)
    })
    test('should have callback for RAF title', () => {
      expect(wrapper.find('h1').text()).toEqual('Invite your friends to try out Craft!')
    })
  })
})
