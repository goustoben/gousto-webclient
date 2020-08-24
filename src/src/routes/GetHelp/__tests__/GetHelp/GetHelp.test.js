import React from 'react'
import { mount } from 'enzyme'
import Helmet from 'react-helmet'
import { client } from 'config/routes'
import { GetHelp } from 'routes/GetHelp/GetHelp'

describe('<GetHelp />', () => {
  describe('rendering', () => {
    let wrapper
    const storeGetHelpOrderIdSpy = jest.fn()
    const loadOrderByIdSpy = jest.fn().mockResolvedValue({})
    const validateLatestOrderSpy = jest.fn().mockResolvedValue(
      { data: { valid: true } }
    )
    const loadRecipesByIdSpy = jest.fn().mockResolvedValue({})

    beforeAll(() => {
      wrapper = mount(
        <GetHelp
          didRequestError={false}
          isRequestPending={false}
          orderId="7"
          order={{ id: '7', recipeItems: ['123456']}}
          user={{ id: '123', accessToken: 'test' }}
          recipes={{}}
          loadRecipesById={loadRecipesByIdSpy}
          storeGetHelpOrderId={storeGetHelpOrderIdSpy}
          loadOrderById={loadOrderByIdSpy}
          validateLatestOrder={validateLatestOrderSpy}
          location=""
        >
          <div className="test" />
        </GetHelp>
      )
    })

    test('component is redering correctly', () => {
      expect(wrapper.find(Helmet)).toHaveLength(1)
      expect(wrapper.contains(<div className="test" />)).toBe(true)
    })

    test('renders the default CTABack', () => {
      expect(wrapper.find('CTABack').exists()).toBe(true)
    })

    test('error component is being displayed', () => {
      wrapper = mount(
        <GetHelp
          didRequestError
          isRequestPending={false}
          orderId=""
          order={{ id: '1', recipeItems: ['123456']}}
          user={{ id: '123', accessToken: 'test' }}
          recipes={{}}
          loadRecipesById={loadRecipesByIdSpy}
          storeGetHelpOrderId={storeGetHelpOrderIdSpy}
          loadOrderById={loadOrderByIdSpy}
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
            orderId="7"
            order={{ id: '', recipeItems: [] }}
            recipes={{}}
            user={{ id: '123', accessToken: 'test' }}
            loadRecipesById={loadRecipesByIdSpy}
            storeGetHelpOrderId={storeGetHelpOrderIdSpy}
            loadOrderById={loadOrderByIdSpy}
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
            orderId=""
            order={{ id: '', recipeItems: [] }}
            recipes={{}}
            user={{ id: '123', accessToken: 'test' }}
            loadRecipesById={loadRecipesByIdSpy}
            storeGetHelpOrderId={storeGetHelpOrderIdSpy}
            loadOrderById={loadOrderByIdSpy}
            validateLatestOrder={validateLatestOrderSpy}
            location={{ pathname: `${client.getHelp.index}/${client.getHelp.contact}`}}
          >
            <div className="test" />
          </GetHelp>
        )
      })

      test('data is not fetched', () => {
        storeGetHelpOrderIdSpy.mockReset()
        loadOrderByIdSpy.mockReset()
        validateLatestOrderSpy.mockReset()
        expect(storeGetHelpOrderIdSpy).not.toHaveBeenCalled()
        expect(loadOrderByIdSpy).not.toHaveBeenCalled()

        expect(wrapper.contains(<div className="test" />)).toBe(true)
      })

      test('CTABack button links to MyGousto', () => {
        expect(wrapper.find('CTABack').prop('url')).toBe(client.myGousto)
      })

      describe('when orderId is passed', () => {
        beforeEach(() => {
          wrapper.setProps({ orderId: '12345' })
        })

        test('CTABack button links to SSR entry page', () => {
          expect(wrapper.find('CTABack').prop('url')).toBe(`${client.getHelp.index}?orderId=12345`)
        })
      })
    })
  })

  describe('behaviour', () => {
    const storeGetHelpOrderIdSpy = jest.fn()
    const loadOrderByIdSpy = jest.fn().mockResolvedValue({})
    const loadRecipesByIdSpy = jest.fn().mockResolvedValue({})
    const validateLatestOrderSpy = jest.fn().mockResolvedValue(
      { data: { valid: true } }
    )

    beforeAll(() => {
      mount(
        <GetHelp
          didRequestError={false}
          isRequestPending={false}
          orderId="7"
          order={{ id: '1', recipeItems: ['123456']}}
          user={{ id: '123', accessToken: 'test' }}
          recipes={{}}
          loadRecipesById={loadRecipesByIdSpy}
          storeGetHelpOrderId={storeGetHelpOrderIdSpy}
          loadOrderById={loadOrderByIdSpy}
          validateLatestOrder={validateLatestOrderSpy}
          location=""
        >
          <div className="test" />
        </GetHelp>
      )
    })

    test('calls customers order endpoint', () => {
      expect(loadOrderByIdSpy).toHaveBeenCalledWith(
        {accessToken: 'test', orderId: '7'}
      )
    })

    test('store order ID', () => {
      expect(storeGetHelpOrderIdSpy).toHaveBeenCalledWith('7')
    })

    test('calls recipe API by order ID', () => {
      expect(loadRecipesByIdSpy).toHaveBeenCalledWith(['123456'])
    })
  })
})
