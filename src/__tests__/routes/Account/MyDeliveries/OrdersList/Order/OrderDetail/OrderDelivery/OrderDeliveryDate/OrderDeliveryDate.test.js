import React from 'react'
import { shallow } from 'enzyme'
import { Alert } from 'goustouicomponents'
import { EditDate } from 'routes/Account/MyDeliveries/OrdersList/Order/OrderDetail/OrderDelivery/OrderDeliveryDate/EditDate'
import { LinkButton } from 'routes/Account/MyDeliveries/OrdersList/Order/OrderDetail/OrderDelivery/OrderDeliveryDate/Link'
import { OrderDeliveryDate } from 'routes/Account/MyDeliveries/OrdersList/Order/OrderDetail/OrderDelivery/OrderDeliveryDate'

describe('OrderDeliveryDate', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<OrderDeliveryDate
      date="Monday 17 August"
      timeStart="6am"
      timeEnd="3pm"
      editDeliveryMode={false}
      fetchSuccess
      orderState="scheduled"
      orderId={8}
      availableFrom="from"
      availableTo="to"
    />)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('render', () => {
    test('should render the date passed',() => {
      expect(wrapper.text()).toContain('Monday 17 August')
    })

    test('should format and render the start time and end time passed',() => {
      expect(wrapper.text()).toContain('6am - 3pm')
    })

    test('should not render a <LinkButton/> if state is scheduled',() => {
      expect(wrapper.find(LinkButton).length).toEqual(0)
    })

    test('should render a <LinkButton/> if state is menu open',() => {
      wrapper = shallow(<OrderDeliveryDate
        orderState="menu open"
      />)
      expect(wrapper.find(LinkButton).length).toEqual(1)
    })

    test('should render <EditDate/> if editDeliveryMode and fetchSuccess is true',() => {
      wrapper = shallow(<OrderDeliveryDate
        editDeliveryMode
        fetchSuccess
      />)
      expect(wrapper.find(EditDate).length).toEqual(1)
    })

    test('should not render <EditDate/> if editDeliveryMode is false',() => {
      wrapper = shallow(<OrderDeliveryDate
        editDeliveryMode={false}
        fetchSuccess
      />)
      expect(wrapper.find(EditDate).length).toEqual(0)
    })
    test('should not render <EditDate/> if fetchSuccess is false',() => {
      wrapper = shallow(<OrderDeliveryDate
        fetchSuccess={false}
        editDeliveryMode
      />)
      expect(wrapper.find(EditDate).length).toEqual(0)
    })
    test('should render Alert if hasError is true',() => {
      wrapper = shallow(<OrderDeliveryDate
        hasError
      />)

      expect(wrapper.find(Alert).length).toEqual(1)
    })

  })
})
