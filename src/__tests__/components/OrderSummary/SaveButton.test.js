import React from 'react'

import { shallow } from 'enzyme'
import SaveButton from 'OrderSummary/SaveButton'
import { Button } from 'goustouicomponents'

describe('SaveButton', function() {
  test('should return a <div>', function() {
    const wrapper = shallow(<SaveButton />)
    expect(wrapper.type()).toEqual('div')
  })
  test('should show Button if saveRequired', function() {
    const wrapper = shallow(<SaveButton saveRequired />)
    expect(wrapper.find(Button).length).toEqual(1)
  })
  test('should not show Button if not saveRequired', function() {
    const wrapper = shallow(<SaveButton saveRequired={false} />)
    expect(wrapper.find(Button).length).toEqual(0)
  })
  test('should disable Button when saving', function() {
    const wrapper = shallow(<SaveButton saving saveRequired />)
    expect(wrapper.find(Button).prop('disabled')).toEqual(true)
  })
  test('should pass pending Button when saving', function() {
    const wrapper = shallow(<SaveButton saving saveRequired />)
    expect(wrapper.find(Button).prop('pending')).toEqual(true)
  })
  test('should call onClick function when clicked', function() {
    const clickSpy = jest.fn()
    const wrapper = shallow(<SaveButton onClick={clickSpy} saveRequired />)
    wrapper.find(Button).simulate('click')
    expect(clickSpy).toHaveBeenCalledTimes(1)
  })
  test('should set showError state if props saving flips off with error', function() {
    const wrapper = shallow(<SaveButton error saving />)
    expect(wrapper.state('showError')).toEqual(false)
    wrapper.setProps({ saving: false })
    expect(wrapper.state('showError')).toEqual(true)
    expect(wrapper.state('showSuccess')).toEqual(false)
  })
  test('should set showSuccess state if props saving flips off without error', function() {
    const wrapper = shallow(<SaveButton error={false} saving />)
    expect(wrapper.state('showSuccess')).toEqual(false)
    wrapper.setProps({ saving: false })
    expect(wrapper.state('showSuccess')).toEqual(true)
    expect(wrapper.state('showError')).toEqual(false)
  })
  test('should set showButton state if props saving flips off without error', function() {
    const wrapper = shallow(<SaveButton error={false} saving saveRequired />)
    expect(wrapper.state('showButton')).toEqual(true)
    wrapper.setProps({ saving: false })
    expect(wrapper.state('showButton')).toEqual(false)
  })
  test('should show button if showButton state true', function() {
    const wrapper = shallow(<SaveButton />)
    expect(wrapper.find('Button').length).toEqual(0)
    wrapper.setState({ showButton: true })
    expect(wrapper.find('Button').length).toEqual(1)
  })
  test('should show success div if showSucess state', function() {
    const wrapper = shallow(<SaveButton />)
    expect(wrapper.find('div').length).toEqual(1)
    wrapper.setState({ showSuccess: true })
    expect(wrapper.find('div').at(1).text()).toEqual('SAVED')
  })
  test('should show error div if showError state', function() {
    const wrapper = shallow(<SaveButton />)
    expect(wrapper.find('div').length).toEqual(1)
    wrapper.setState({ showError: true })
    expect(wrapper.find('div').at(1).text()).toEqual('ERROR SAVING CHOICES')
  })
  test('should add updateOrderButton class to the wrapper when onOrderConfirmationMobile is true', () => {
    const wrapper = shallow(<SaveButton onOrderConfirmationMobile/>)
    expect(wrapper.find('.updateOrderButton').length).toEqual(1)
    wrapper.setProps({ onOrderConfirmationMobile: false })
    expect(wrapper.find('.updateOrderButton').length).toEqual(0)
  })
})
