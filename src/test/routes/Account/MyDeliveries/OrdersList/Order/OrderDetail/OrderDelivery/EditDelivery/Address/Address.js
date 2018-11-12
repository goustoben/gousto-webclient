import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import React from 'react'
import { shallow } from 'enzyme'
import Address from 'routes/Account/MyDeliveries/OrdersList/Order/OrderDetail/OrderDelivery/EditDelivery/Address/Address'
import css from 'routes/Account/MyDeliveries/OrdersList/Order/OrderDetail/OrderDelivery/EditDelivery/Address/Address.css'

describe('Address', function() {
  let sandbox
  let wrapper
  const selectAddressSpy = sinon.spy()

  beforeEach(function() {
    sandbox = sinon.sandbox.create()
  })
  afterEach(function() {
    sandbox.restore()
  })
  describe('rendering', function() {
    wrapper = shallow(<Address
      addressName="Home"
      address="Flat 4, Morris House"
      town="London"
      postcode="W3 7UP"
      isSelected
      addressId="33"
      selectAddress={selectAddressSpy}
    />)

    it('should render a <div>', function() {
      expect(wrapper.type()).to.equal('div')
    })

    it('should render a checkbox', function() {
      const className = `.${css.square.split(' ').join('.')}`
      expect(wrapper.find(className)).to.have.length(1)
    })

    it('if this address is selected the checkbox should be inactive', function() {
      const className = `.${css.cantClick.split(' ').join('.')}`
      expect(wrapper.find(className)).to.have.length(1)
    })

    it('onClick, selectAddress should NOT be called when the address is selected', function() {
      const className = `.${css.square.split(' ').join('.')}`
      const checkbox = wrapper.find(className)
      checkbox.simulate('click')
      expect(selectAddressSpy).not.to.be.called
    })

    it('should show the address name and address correctly', function() {
      const className = `.${css.addressContainer.split(' ').join('.')}`
      expect(wrapper.find(className)).to.have.length(1)
      expect(wrapper.find(className).text()).to.contain('Home')
      expect(wrapper.find(className).text()).to.contain('Flat 4, Morris House')
      expect(wrapper.find(className).text()).to.contain('London')
      expect(wrapper.find(className).text()).to.contain('W3 7UP')
    })

    it('When the address is not selected the checkbox should not have the class cantclick', function() {
      wrapper = shallow(<Address
        addressName="Home"
        address="Flat 4, Morris House"
        town="London"
        postcode="W3 7UP"
        isSelected={false}
        addressId="3d3"
        selectAddress={selectAddressSpy}
      />)
      const className = `.${css.cantClick.split(' ').join('.')}`
      expect(wrapper.find(className)).to.have.length(0)
    })

    it('onClick, selectAddress should be called', function() {
      const className = `.${css.square.split(' ').join('.')}`
      const checkbox = wrapper.find(className)
      checkbox.simulate('click')
      expect(selectAddressSpy).to.be.called
    })
  })
})
