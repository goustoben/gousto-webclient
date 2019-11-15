import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import Immutable from 'immutable'

import React from 'react'
import { shallow, mount } from 'enzyme'
import Order from 'routes/Account/MyDeliveries/OrdersList/Order/Order'
import OrderRescheduledNotification from 'routes/Account/MyDeliveries/OrdersList/Order/OrderRescheduledNotification'
import OrderDate from 'routes/Account/MyDeliveries/OrdersList/Order/OrderDate'
import OrderDetail from 'routes/Account/MyDeliveries/OrdersList/Order/OrderDetail'
import OrderCollapseExpand from 'routes/Account/MyDeliveries/OrdersList/Order/OrderCollapseExpand'
import OrderRestoreButton from 'routes/Account/MyDeliveries/OrdersList/Order/OrderRestoreButton'
import actions from 'actions/user'

describe('Order', function() {
  let sandbox
  let wrapper
  let userOpenCloseOrderCard
  let userToggleEditDateSection
  const context = {
    store: {
      getState: () => ({
        orderPricing: Immutable.Map({}),
      }),
      subscribe: () => {},
      dispatch: () => {},
    },
  }
  const orderIdSample = '7'

  beforeEach(function() {
    sandbox = sinon.sandbox.create()
    context.store.dispatch = sandbox.spy()
    userOpenCloseOrderCard = sandbox.spy(actions, 'userOpenCloseOrderCard')
    userToggleEditDateSection = sandbox.spy(actions, 'userToggleEditDateSection')
  })

  afterEach(function(done) {
    sandbox.restore()
    done()
  })

  describe('rendering', function() {
    beforeEach(function() {
      wrapper = shallow(<Order collapsed />)
    })

    it('should render a <div> with no props', function() {
      expect(wrapper.type()).to.equal('div')
    })

    it('should render a reschedule notification when the delivery day is rescheduled', function() {
      wrapper = shallow(<Order
        deliveryDayRescheduled="2018-01-02 00:00:00"
        orderDateTime="2018-01-01 00:00:00"
        deliveryDayRescheduledReason="Zombie apocalypse"
      />)
      const rescheduledNotification = wrapper.find(OrderRescheduledNotification)
      expect(rescheduledNotification.prop('oldDeliveryDay')).to.equal('Monday 1 January')
      expect(rescheduledNotification.prop('reason')).to.equal('Zombie apocalypse')
      expect(rescheduledNotification.length).to.equal(1)
    })

    it('should NOT render a reschedule notification when deliveryDayRescheduled is null', function() {
      wrapper = shallow(<Order
        deliveryDayRescheduled={null}
      />)
      expect(wrapper.find(OrderRescheduledNotification).length).to.equal(0)
    })

    it('should render the rescheduled day under the notification instead of the original when the delivery day is rescheduled', function() {
      wrapper = shallow(<Order
        deliveryDayRescheduled="2018-01-02 00:00:00"
        orderDateTime="2018-01-01 00:00:00"
      />)
      expect(wrapper.find(OrderDate).prop('date')).to.equal('Tuesday 2 January')
    })

    it('should render a specific list of subcomponents when the order is scheduled', function() {
      wrapper = shallow(<Order orderState="scheduled" collapsed />)
      const renderedSubcomponents =
        '<OrderCollage />' +
        '<OrderDate />' +
        '<OrderTime />' +
        '<OrderState />' +
        '<OrderStatus />' +
        '<OrderPricing />' +
        '<OrderCollapseExpand />'
      expect(wrapper.text()).to.equal(renderedSubcomponents)
    })

    it('should render a specific list of subcomponents when the order is cancelled', function() {
      wrapper = shallow(<Order collapsed orderState="cancelled" />)
      const renderedSubcomponents =
        '<OrderCollage />' +
        '<OrderDate />' +
        '<OrderTime />' +
        '<OrderState />' +
        '<OrderStatus />'
      expect(wrapper.text()).to.equal(renderedSubcomponents)
    })

    it('should render a <OrderDetail> when the component is not collapsed', function() {
      wrapper = shallow(<Order collapsed={false} />)
      expect(wrapper.find(OrderDetail)).to.have.length(1)
    })

    it('the component should dispatch an action to set the application state of the order to collapsed', function() {
      mount(<Order collapsed orderId={orderIdSample} />, { context })
      expect(context.store.dispatch).to.have.been.calledTwice
      expect(userOpenCloseOrderCard).to.have.been.calledOnce
      expect(userOpenCloseOrderCard).calledWithExactly(orderIdSample, true)
      expect(userToggleEditDateSection).to.have.been.calledOnce
      expect(userToggleEditDateSection).calledWithExactly(orderIdSample, false)
    })

    it('should render <OrderButtonRestore> when the order is restorable', function() {
      wrapper = shallow(<Order restorable />)
      expect(wrapper.find(OrderRestoreButton)).to.have.length(1)
    })

    it('should NOT render <OrderButtonRestore> when the order is not restorable', function() {
      wrapper = shallow(<Order restorable={false} />)
      expect(wrapper.find(OrderRestoreButton)).to.have.length(0)
    })

    it('should NOT render <OrderButtonRestore> by default', function() {
      wrapper = shallow(<Order restorable={false} />)
      expect(wrapper.find(OrderRestoreButton)).to.have.length(0)
    })
  })

  describe('component methods', function() {
    it('an action for expand should be dispatched when the component is collapsed and the arrow is clicked', function() {
      wrapper = mount(<Order collapsed orderId={orderIdSample} />, { context })
      wrapper.find(OrderCollapseExpand).simulate('click')
      expect(context.store.dispatch).to.have.been.calledThrice
      expect(userOpenCloseOrderCard).to.have.been.calledTwice
      expect(userOpenCloseOrderCard.secondCall).calledWithExactly(orderIdSample, false)
    })

    it('an action for collapse should be dispatched when the component is expanded and the arrow is clicked', function() {
      wrapper = mount(<Order collapsed={false} orderId={orderIdSample} />, { context })
      wrapper.find(OrderCollapseExpand).simulate('click')
      expect(context.store.dispatch).to.have.been.calledThrice
      expect(userOpenCloseOrderCard).to.have.been.calledTwice
      expect(userOpenCloseOrderCard.secondCall).calledWithExactly(orderIdSample, true)
    })
  })
})
