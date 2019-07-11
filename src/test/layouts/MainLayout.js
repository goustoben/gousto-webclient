import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
import sinon from 'sinon'

import React from 'react'
import { shallow } from 'enzyme'
import { Div } from 'Page/Elements'
import MainLayout from 'layouts/MainLayout/MainLayout'
import { Header } from 'Header'
import Footer from 'Footer'
chai.use(sinonChai)

describe('MainLayout', function() {
  let email
  let isAuthenticated
  let userFetchShippingAddressesSpy
  let userClearDataSpy
  let userLoadOrders
  let userLoadData
  let menuLoadBoxPrices

  beforeEach(function() {
    userLoadData = sinon.stub()
    userLoadOrders = sinon.stub()
    userClearDataSpy = sinon.stub()
    userFetchShippingAddressesSpy = sinon.stub()
    menuLoadBoxPrices = sinon.stub()
    email = 'test@email.com'
    isAuthenticated = true
  })

  it('should return a <Div>', function() {
    const wrapper = shallow(<MainLayout email={email} isAuthenticated={isAuthenticated} />)

    expect(wrapper.type()).to.equal(Div)
  })

  it('should return a <Header>', function() {
    const wrapper = shallow(<MainLayout email={email} isAuthenticated={isAuthenticated} />)

    expect(wrapper.find(Header).length).to.equal(1)
  })

  it('should return a <Footer>', function() {
    const wrapper = shallow(<MainLayout email={email} isAuthenticated={isAuthenticated} />)

    expect(wrapper.find(Footer).length).to.equal(1)
  })

  it('should call the userFetchShippingAddresses prop if the isAuthenticated prop is truthy', function() {
    const wrapper = shallow(<MainLayout
      email={email}
      userFetchShippingAddresses={userFetchShippingAddressesSpy}
      userLoadData={userLoadData}
      userLoadOrders={userLoadOrders}
      menuLoadBoxPrices={menuLoadBoxPrices}
    />)
    wrapper.setProps({ isAuthenticated })
    expect(userFetchShippingAddressesSpy).to.have.been.calledOnce
  })

  it('should call the userClearData prop if the isAuthenticated prop is not set', function() {
    const wrapper = shallow(<MainLayout email={email} isAuthenticated={isAuthenticated} userClearData={userClearDataSpy} menuLoadBoxPrices={menuLoadBoxPrices} userFetchShippingAddresses={userFetchShippingAddressesSpy} />)
    wrapper.setProps({ isAuthenticated: '' })
    expect(userClearDataSpy).to.have.been.calledOnce
  })

  it('should not call the userClearData prop if the isAuthenticated prop was previously falsey', function() {
    const wrapper = shallow(<MainLayout email={email} isAuthenticated={''} userClearData={userClearDataSpy} menuLoadBoxPrices={menuLoadBoxPrices} userFetchShippingAddresses={userFetchShippingAddressesSpy} />)
    wrapper.setProps({ isAuthenticated: '' })
    expect(userClearDataSpy).not.to.have.been.called
  })

  it('should call menuLoadBoxPrices when user logs in', function() {
    const wrapper = shallow(
      <MainLayout
        email={email}
        isAuthenticated=""
        menuLoadBoxPrices={menuLoadBoxPrices}
        userFetchShippingAddresses={userFetchShippingAddressesSpy}
        userLoadOrders={userLoadOrders}
      />)
    wrapper.setProps({ isAuthenticated: 'loggedin-token' })

    expect(menuLoadBoxPrices).to.have.been.calledOnce
  })

  it('should call menuLoadBoxPrices when user logs out', function() {
    const wrapper = shallow(<MainLayout email={email} isAuthenticated={isAuthenticated} userClearData={userClearDataSpy} menuLoadBoxPrices={menuLoadBoxPrices} />)
    wrapper.setProps({ isAuthenticated: '' })

    expect(menuLoadBoxPrices).to.have.been.calledOnce
  })
})
