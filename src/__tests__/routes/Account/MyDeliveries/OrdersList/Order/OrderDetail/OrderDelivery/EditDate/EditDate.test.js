import React from 'react'
import Immutable from 'immutable'
import { shallow } from 'enzyme'
import { Button } from 'goustouicomponents'
import orderActions from 'actions/order'
import { EditDate } from 'routes/Account/MyDeliveries/OrdersList/Order/OrderDetail/OrderDelivery/OrderDeliveryDate/EditDate/EditDate.js'
import DropdownInput from 'components/Form/Dropdown/DropdownInput'
import { getDeliveryDaysAndSlotsOptions } from 'routes/Account/MyDeliveries/OrdersList/Order/OrderDetail/OrderDelivery/OrderDeliveryDate/EditDate/util.js'

jest.mock('routes/Account/MyDeliveries/OrdersList/Order/OrderDetail/OrderDelivery/OrderDeliveryDate/EditDate/util.js', () => ({
  getDeliveryDaysAndSlotsOptions: jest.fn()
}))

jest.mock('actions/order', () => ({
  orderUpdateDayAndSlot: jest.fn()
}))

describe('EditDate', function () {

  const deliveryDays = Immutable.fromJS({
    aaa: { coreDayId: '45' },
    bbb: { coreDayId: '46' },
  })
  const recipesStock = Immutable.List(['a', 'b'])
  const recipes = Immutable.List([{id:'1'}, {id:'2'}])
  const orders = Immutable.List([{id:'1'}, {id:'2'}])
  const daysOptionsSample = [{
    value: '1241',
    label: '2018-02-11',
    disabled: false,
    icon: '',
  }]
  const slotsOptionsSample = {
    1241: [{
      uuid: '1234-1213-4124',
      value: '1',
      label: '7pm-9pm',
      subLabel: 'Not Free',
      isDefaultSlot: false,
    }, {
      uuid: 'dafa1c2e-12d1-11e6-b5f6-06ddb628bdc5',
      value: '3',
      label: '8am - 7pm',
      subLabel: 'Free',
      isDefaultSlot: true,
    }],
  }

  let wrapper
  let dispatchSpy
  let getStateSpy

  beforeEach(function () {
    jest.clearAllMocks()
    getDeliveryDaysAndSlotsOptions.mockReturnValue(
      {
        deliveryDaysOptions: daysOptionsSample,
        slotsOptions: slotsOptionsSample
      }
    )

    dispatchSpy = jest.fn()
    getStateSpy = jest.fn()

    wrapper = shallow(<EditDate
      editDeliveryMode
      orderId="ab23"
      deliveryDays={deliveryDays}
      coreDeliveryDayId="8"
      deliverySlotId="de03"
      recipesStock={recipesStock}
      recipes={recipes}
      orders={orders}
      numPortions='2'
    />, { context: { store: { dispatch: dispatchSpy, getState: getStateSpy } } })
  })

  describe('rendering', () => {

    it('should render 2 dropdown inputs', function () {
      expect(wrapper.find(DropdownInput).length).toEqual(2)
    })

    it('should render a button', function () {
      expect(wrapper.find(Button).length).toEqual(1)
    })

    it('should render the submit button enabled when the selected slot has changed', function () {
      wrapper.instance().onSlotChange('fg04')
      expect(wrapper.update()
        .find(Button)
        .last()
        .prop('disabled')
      ).toEqual(false)
    })
  })

  describe('componentDidMount', () => {
    it('should call setDayAndSlotOptionsAndSelected', () => {
      const setDayAndSlotOptionsAndSelectedSpy = jest.spyOn(wrapper.instance(), 'setDayAndSlotOptionsAndSelected')
      wrapper.instance().componentDidMount()
      expect(setDayAndSlotOptionsAndSelectedSpy).toHaveBeenCalled()
    })
  })

  describe('receive new props', function() {
    const newDeliveryDays = deliveryDays.set('ccc', { coreDayId: '47' })

    it('should call getDeliveryDaysAndSlotsOptions when deliveryDays prop is updated', function() {
      wrapper.setProps({ deliveryDays: newDeliveryDays }, () => {
        expect(getDeliveryDaysAndSlotsOptions).toHaveBeenCalledTimes(2)
        expect(getDeliveryDaysAndSlotsOptions).toHaveBeenCalledWith(newDeliveryDays, recipes, recipesStock, '2', '8', 'de03', orders)
      })
    })

    it('should call getDeliveryDaysAndSlotsOptions when recipesStock prop is updated', function() {
      const newRecipesStock = recipesStock.push('c')
      wrapper.setProps({ recipesStock: newRecipesStock })
      expect(getDeliveryDaysAndSlotsOptions).toHaveBeenCalledTimes(2)
      expect(getDeliveryDaysAndSlotsOptions).toHaveBeenCalledWith(deliveryDays, recipes, newRecipesStock, '2', '8', 'de03', orders)
    })

    it('should change the selected day to the first option when current selection is not available in the new props', function() {
      getDeliveryDaysAndSlotsOptions.mockReturnValueOnce({ deliveryDaysOptions: daysOptionsSample, slotsOptions: slotsOptionsSample })
      wrapper.setProps({ deliveryDays: newDeliveryDays })
      expect(wrapper.state('selectedDeliveryDayId')).toBe('1241')
    })

    it('should change the selected slot to the first option when current selection is not available in the new props', function() {
      getDeliveryDaysAndSlotsOptions.mockReturnValueOnce({ deliveryDaysOptions: daysOptionsSample, slotsOptions: slotsOptionsSample })
      wrapper.setProps({ deliveryDays: newDeliveryDays })
      expect(wrapper.state('selectedDeliverySlotId')).toBe('1')
    })
  })

  describe('submit button', function() {
    it('should call onSubmitFunction when clicking the submit button', function () {
      const onSubmitFunctionStub = jest.spyOn(EditDate.prototype, 'onSubmitFunction')
      wrapper.setState({ selectedDeliveryDayId: '1241', selectedDeliverySlotId: '3' })
      wrapper.find(Button).last().simulate('click')
      expect(onSubmitFunctionStub).toHaveBeenCalledTimes(1)
    })

    it('should dispatch orderUpdateDayAndSlot action when clicking the button if the deliverySlot changed', function() {
      orderActions.orderUpdateDayAndSlot.mockReturnValueOnce('orderUpdateDayAndSlot result')
      const slotsOptions = {
        '100': [
          { uuid: 'jk06', value: '777' },
          { uuid: 'whatever', value: '888' },
        ],
      }
      wrapper.setState({ selectedDeliveryDayId: '100', selectedDeliverySlotId: '777', slotsOptions, selectedDeliveryDate: '2017-07-01' })
      wrapper.find(Button).last().simulate('click')
      expect(dispatchSpy).toHaveBeenCalledTimes(1)
      expect(orderActions.orderUpdateDayAndSlot).toHaveBeenCalledTimes(1)
      expect(orderActions.orderUpdateDayAndSlot).toHaveBeenCalledWith('ab23', '100', '777', 'jk06', '2017-07-01', deliveryDays)
      expect(dispatchSpy).toHaveBeenCalledWith('orderUpdateDayAndSlot result')
    })

    it('should NOT dispatch orderUpdateDayAndSlot action when the deliverySlot remains unchanged', function() {
      wrapper.setState({ selectedDeliverySlotId: 'de03' })
      wrapper.find(Button).last().simulate('click')
      expect(orderActions.orderUpdateDayAndSlot).not.toHaveBeenCalled()
    })
  })
})
