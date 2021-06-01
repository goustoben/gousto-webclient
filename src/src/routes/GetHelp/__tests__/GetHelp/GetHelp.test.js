import React from 'react'
import { mount } from 'enzyme'
import { client } from 'config/routes'
import { GetHelp } from 'routes/GetHelp/GetHelp'

describe('<GetHelp />', () => {
  let wrapper
  const storeGetHelpOrderIdSpy = jest.fn()
  const validateLatestOrderSpy = jest.fn().mockResolvedValue(
    { data: { valid: true } }
  )
  const loadOrderAndRecipesByIds = jest.fn()

  describe('rendering', () => {
    beforeAll(() => {
      wrapper = mount(
        <GetHelp
          didRequestError={false}
          isRequestPending={false}
          loadOrderAndRecipesByIds={loadOrderAndRecipesByIds}
          orderId="7"
          order={{ id: '7', recipeItems: ['123456']}}
          user={{ id: '123', accessToken: 'test' }}
          recipes={{}}
          storeGetHelpOrderId={storeGetHelpOrderIdSpy}
          validateLatestOrder={validateLatestOrderSpy}
          location=""
        >
          <div className="test" />
        </GetHelp>
      )
    })

    test('error component is being displayed', () => {
      wrapper = mount(
        <GetHelp
          didRequestError
          isRequestPending={false}
          loadOrderAndRecipesByIds={loadOrderAndRecipesByIds}
          orderId=""
          order={{ id: '1', recipeItems: ['123456']}}
          user={{ id: '123', accessToken: 'test' }}
          recipes={{}}
          storeGetHelpOrderId={storeGetHelpOrderIdSpy}
          validateLatestOrder={validateLatestOrderSpy}
          location=""
        >
          <div className="test" />
        </GetHelp>
      )

      expect(wrapper.find('Error')).toHaveLength(1)
      expect(wrapper.contains(<div className="test" />)).toBe(false)
    })

    describe('when loading', () => {
      beforeEach(() => {
        wrapper = mount(
          <GetHelp
            didRequestError={false}
            loadOrderAndRecipesByIds={loadOrderAndRecipesByIds}
            orderId="7"
            order={{ id: '', recipeItems: [] }}
            recipes={{}}
            user={{ id: '123', accessToken: 'test' }}
            storeGetHelpOrderId={storeGetHelpOrderIdSpy}
            validateLatestOrder={validateLatestOrderSpy}
            isRequestPending
            location=""
          >
            <div className="test" />
          </GetHelp>
        )
      })

      test('should not render Error or children', () => {
        expect(wrapper.find('Error')).toHaveLength(0)
        expect(wrapper.contains(<div className="test" />)).toBe(false)
      })

      test('should render a Loading animation', () => {
        expect(wrapper.find('Loading')).toHaveLength(1)
      })
    })

    describe('when the path is Contact Us page', () => {
      beforeEach(() => {
        wrapper = mount(
          <GetHelp
            didRequestError={false}
            isRequestPending={false}
            loadOrderAndRecipesByIds={loadOrderAndRecipesByIds}
            orderId=""
            order={{ id: '', recipeItems: [] }}
            recipes={{}}
            user={{ id: '123', accessToken: 'test' }}
            storeGetHelpOrderId={storeGetHelpOrderIdSpy}
            validateLatestOrder={validateLatestOrderSpy}
            location={{ pathname: `${client.getHelp.index}/${client.getHelp.contact}`}}
          >
            <div className="test" />
          </GetHelp>
        )
      })

      test('data is not fetched', () => {
        storeGetHelpOrderIdSpy.mockReset()
        loadOrderAndRecipesByIds.mockReset()
        validateLatestOrderSpy.mockReset()
        expect(storeGetHelpOrderIdSpy).not.toHaveBeenCalled()
        expect(loadOrderAndRecipesByIds).not.toHaveBeenCalled()

        expect(wrapper.contains(<div className="test" />)).toBe(true)
      })
    })
  })

  describe('behaviour', () => {
    beforeAll(() => {
      mount(
        <GetHelp
          didRequestError={false}
          isRequestPending={false}
          loadOrderAndRecipesByIds={loadOrderAndRecipesByIds}
          orderId="7"
          user={{ id: '123', accessToken: 'test' }}
          recipes={{}}
          storeGetHelpOrderId={storeGetHelpOrderIdSpy}
          validateLatestOrder={validateLatestOrderSpy}
          location=""
        >
          <div className="test" />
        </GetHelp>
      )
    })

    test('calls loadOrderAndRecipesByIds action', () => {
      expect(loadOrderAndRecipesByIds).toHaveBeenCalledWith('7')
    })

    test('store order ID', () => {
      expect(storeGetHelpOrderIdSpy).toHaveBeenCalledWith('7')
    })
  })
})
