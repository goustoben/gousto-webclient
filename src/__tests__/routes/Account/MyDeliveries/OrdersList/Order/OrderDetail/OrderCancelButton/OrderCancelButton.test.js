import React from 'react'
import { shallow } from 'enzyme'
import OrderCancelButton from 'routes/Account/MyDeliveries/OrdersList/Order/OrderDetail/OrderCancelButton/OrderCancelButton'
import { Alert, Button } from 'goustouicomponents'
import Content from 'containers/Content'

describe('OrderCancelButton', () => {
  let wrapper

  describe('rendering', () => {
    beforeEach(() => {
      wrapper = shallow(<OrderCancelButton />)
    })

    it('should render a <div>', () => {
      expect(wrapper.type()).toEqual('div')
    })

    it('should render a <Button>', () => {
      expect(wrapper.find(Button).length).toEqual(1)
    })

    it('should render an Alert with CMS text with specific default when didCancelProjectedError is true', () => {
      wrapper = shallow(<OrderCancelButton didCancelProjectedError />)
      const alertWrapper = wrapper.find(Alert)
      expect(alertWrapper.length).toEqual(1)
      const contentWrapperProps = alertWrapper.find(Content).first().props()
      expect(contentWrapperProps.contentKeys).toEqual('mydeliveriesOrderOrdercancelbuttonCancelprojectederror')
      expect(contentWrapperProps.children.props.children).toEqual('Whoops, there was a problem cancelling this order, please try again.')
      wrapper = shallow(<OrderCancelButton didCancelProjectedError={false} />)
      expect(wrapper.find(Alert).length).toEqual(0)
    })
  })

  describe('cancel box', () => {

    describe('order NOT in state "scheduled"', () => {
      it('should call the orderCancelStart function when clicking the Cancel Box button', () => {
        const orderCancelStart = jest.fn()

        wrapper = shallow(<OrderCancelButton
          orderId="543"
          orderState="recipes chosen"
          deliveryDayId="34567"
          deliveryDay="2019-11-17 00:00:00"
          orderCancelStart={orderCancelStart}
        />)
        wrapper.find(Button).simulate('click')
        expect(orderCancelStart).toHaveBeenCalled()
        expect(orderCancelStart).toHaveBeenCalledWith('543', '34567', '2019-11-17 00:00:00', 'pending')
      })
    })

    describe('order is in state "scheduled"', () => {
      it('should call the orderCancelStart function when clicking the Cancel Box button', () => {
        const orderCancelStart = jest.fn()

        wrapper = shallow(<OrderCancelButton
          orderId="543"
          orderState="scheduled"
          deliveryDayId="34567"
          deliveryDay="2019-11-17 00:00:00"
          orderCancelStart={orderCancelStart}
        />)
        wrapper.find(Button).simulate('click')
        expect(orderCancelStart).toHaveBeenCalled()
        expect(orderCancelStart).toHaveBeenCalledWith(null, '34567', '2019-11-17 00:00:00', 'projected')
      })
    })
  })
})
