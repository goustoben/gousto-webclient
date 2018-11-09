import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import React from 'react'
import { shallow } from 'enzyme'
import Banner from 'Banner'
import PromoBanner from 'routes/Home/PromoBanner/PromoBanner'

describe('PromoBanner', function() {
  let wrapper
  let promoChange
  let promoToggleModalVisibility

  beforeEach(function() {
    promoChange = sinon.stub().returns('returned from promoChange')
    promoToggleModalVisibility = sinon.stub().returns('returned from promoToggleModalVisibility')
  })

  it('should render a Banner', function() {
    wrapper = shallow(<PromoBanner promoCode="tv" />)
    expect(wrapper.type()).to.equal(Banner)
  })

  describe('should hide', function() {
    it('when user is logged in', function() {
      wrapper = shallow(<PromoBanner isAuthenticated promoCode="tv" />)

      expect(wrapper.prop('hide')).to.equal(true)
    })

    it('when user has a promoCode applied', function() {
      wrapper = shallow(<PromoBanner basketPromoCode="test" promoCode="tv" />)

      expect(wrapper.prop('hide')).to.equal(true)
    })

    it('when a promo_code exists in the query property', function() {
      wrapper = shallow(<PromoBanner promoChange={promoChange} isAuthenticated={false} promoToggleModalVisibility={promoToggleModalVisibility} promoCode="tv" />)
      wrapper.setState({ query: {
        promo_code: 'test',
      } })

      expect(wrapper.prop('hide')).to.equal(true)
    })
  })

  describe('should not hide', function() {
    it('when user is not logged in', function() {
      wrapper = shallow(<PromoBanner isAuthenticated={false} promoCode="tv" />)

      expect(wrapper.prop('hide')).to.equal(false)
    })

    it('when user has does not have a promoCode applied', function() {
      wrapper = shallow(<PromoBanner basketPromoCode="" promoCode="tv" />)

      expect(wrapper.prop('hide')).to.equal(false)
    })

    it('when a promo_code does not exist in the query property', function() {
      wrapper = shallow(<PromoBanner promoChange={promoChange} isAuthenticated={false} promoToggleModalVisibility={promoToggleModalVisibility} promoCode="tv" />)
      wrapper.setState({ query: {
        promo_code: '',
      } })

      expect(wrapper.prop('hide')).to.equal(false)
    })
  })

  describe('when user is not logged in', function() {
    beforeEach(function() {
      wrapper = shallow(<PromoBanner promoChange={promoChange} isAuthenticated={false} promoToggleModalVisibility={promoToggleModalVisibility} promoCode="tv" />)
    })

    it('should dispatch a promoChange action when clicked', function() {
      wrapper.simulate('click')

      expect(promoChange).to.be.calledOnce
    })

    it('should call promoToggleModalVisibility action when clicked', async function() {
      wrapper.simulate('click')

      expect(promoChange).to.be.calledOnce
      setTimeout(function() {
        expect(promoToggleModalVisibility).to.be.calledOnce
      }, 50)
    })
  })

  describe('when user is logged in', function() {
    beforeEach(function() {
      wrapper = shallow(<PromoBanner promoChange={promoChange} isAuthenticated promoToggleModalVisibility={promoToggleModalVisibility} promoCode="tv" />)
    })

    it('should not dispatch a promoChange action when clicked', function() {
      wrapper.simulate('click')

      expect(promoChange).to.not.be.called
    })

    it('should not call promoToggleModalVisibility action when clicked', async function() {
      wrapper.simulate('click')

      expect(promoChange).to.not.be.called
      setTimeout(function() {
        expect(promoToggleModalVisibility).to.not.be.called
      }, 50)
    })
  })

  describe('when given a promo_code in the query string', function() {
    it('should not apply promocode', function() {
      wrapper = shallow(<PromoBanner promoChange={promoChange} isAuthenticated={false} promoToggleModalVisibility={promoToggleModalVisibility} promoCode="tv" />)
      wrapper.setState({ query: {
        promo_code: 'test',
      } })
      wrapper.simulate('click')

      expect(promoChange).to.not.have.been.called
    })
  })

  describe('canApplyPromo should return value based on criteria', function() {
    it('for an authenicated user', function() {
      expect(PromoBanner.canApplyPromo(true, 'loggedIn')).to.be.true
      expect(PromoBanner.canApplyPromo(true, 'loggedOut')).to.be.false
      expect(PromoBanner.canApplyPromo(true, 'any')).to.be.true
    })

    it('for non-authenticated user', function() {
      expect(PromoBanner.canApplyPromo(false, 'loggedIn')).to.be.false
      expect(PromoBanner.canApplyPromo(false, 'loggedOut')).to.be.true
      expect(PromoBanner.canApplyPromo(false, 'any')).to.be.true
    })
  })
})
