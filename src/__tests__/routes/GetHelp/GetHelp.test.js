import React from 'react'
import { mount } from 'enzyme'
import Helmet from 'react-helmet'
import { browserHistory } from 'react-router'
import GetHelp from 'routes/GetHelp/GetHelp'

describe('<GetHelp />', () => {
  describe('rendering', () => {
    let wrapper
    const storeGetHelpOrderIdSpy = jest.fn()
    const userLoadOrderSpy = jest.fn().mockResolvedValue({})
    const validateLatestOrderSpy = jest.fn().mockResolvedValue(
      { data: { valid: true } }
    )
    const recipesLoadRecipesByIdSpy = jest.fn().mockResolvedValue({})

    beforeAll(() => {
      wrapper = mount(
        <GetHelp
          didRequestError={false}
          isRequestPending={false}
          orderId={"7"}
          order={{ id: '7', recipeItems: ['123456']}}
          user={{ id: '123', accessToken: 'test' }}
          recipes={{}}
          recipesLoadRecipesById={recipesLoadRecipesByIdSpy}
          storeGetHelpOrderId={storeGetHelpOrderIdSpy}
          userLoadOrder={userLoadOrderSpy}
          validateLatestOrder={validateLatestOrderSpy}
        >
          <div className="test" />
        </GetHelp>
      )
    })

    test('component is redering correctly', () => {
      expect(wrapper.find(Helmet)).toHaveLength(1)
      expect(wrapper.contains(<div className="test" />)).toBe(true)
    })

    test('error component is being displayed', () => {
      wrapper = mount(
        <GetHelp
          didRequestError
          isRequestPending={false}
          orderId={""}
          order={{ id: '1', recipeItems: ['123456']}}
          user={{ id: '123', accessToken: 'test' }}
          recipes={{}}
          recipesLoadRecipesById={recipesLoadRecipesByIdSpy}
          storeGetHelpOrderId={storeGetHelpOrderIdSpy}
          userLoadOrder={userLoadOrderSpy}
          validateLatestOrder={validateLatestOrderSpy}
        >
          <div className="test" />
        </GetHelp>
      )

      expect(wrapper.find('Error')).toHaveLength(1)
      expect(wrapper.contains(<div className="test" />)).toBe(false)
    })

    test('when loading state is set neither Error or div is being displayed', () => {
      wrapper = mount(
        <GetHelp
          didRequestError={false}
          orderId={"7"}
          order={{}}
          recipes={{}}
          user={{ id: '123', accessToken: 'test' }}
          recipesLoadRecipesById={recipesLoadRecipesByIdSpy}
          storeGetHelpOrderId={storeGetHelpOrderIdSpy}
          userLoadOrder={userLoadOrderSpy}
          validateLatestOrder={validateLatestOrderSpy}
          isRequestPending
        >
          <div className="test" />
        </GetHelp>
      )

      expect(wrapper.find('Error')).toHaveLength(0)
      expect(wrapper.contains(<div className="test" />)).toBe(false)
    })

    test('when path is Contact Us page, data is not fetched', () => {
      storeGetHelpOrderIdSpy.mockReset()
      userLoadOrderSpy.mockReset()
      validateLatestOrderSpy.mockReset()

      wrapper = mount(
        <GetHelp
          didRequestError={false}
          isRequestPending={false}
          orderId={""}
          order={{}}
          recipes={{}}
          user={{ id: '123', accessToken: 'test' }}
          recipesLoadRecipesById={recipesLoadRecipesByIdSpy}
          storeGetHelpOrderId={storeGetHelpOrderIdSpy}
          userLoadOrder={userLoadOrderSpy}
          validateLatestOrder={validateLatestOrderSpy}
        >
          <div className="test" />
        </GetHelp>
      )

      expect(storeGetHelpOrderIdSpy).not.toHaveBeenCalled()
      expect(userLoadOrderSpy).not.toHaveBeenCalled()

      expect(wrapper.contains(<div className="test" />)).toBe(true)
    })
  })

  describe('behaviour', () => {
    const storeGetHelpOrderIdSpy = jest.fn()
    const userLoadOrderSpy = jest.fn().mockResolvedValue({})
    const recipesLoadRecipesByIdSpy = jest.fn().mockResolvedValue({})
    const validateLatestOrderSpy = jest.fn().mockResolvedValue(
      { data: { valid: true } }
    )

    beforeAll(() => {
      mount(
        <GetHelp
          didRequestError={false}
          isRequestPending={false}
          orderId={"7"}
          order={{ id: '1', recipeItems: ['123456']}}
          user={{ id: '123', accessToken: 'test' }}
          recipes={{}}
          recipesLoadRecipesById={recipesLoadRecipesByIdSpy}
          storeGetHelpOrderId={storeGetHelpOrderIdSpy}
          userLoadOrder={userLoadOrderSpy}
          validateLatestOrder={validateLatestOrderSpy}
        >
          <div className="test" />
        </GetHelp>
      )
    })

    test('calls validate order endpoint when order ID is present', () => {
      expect(validateLatestOrderSpy).toHaveBeenCalledWith(
        { accessToken: 'test', costumerId: '123', orderId: '7' }
      )
    })

    test('user is being redirected to /contact if validate order request fails', () => {
      browserHistory.push = jest.fn()

      validateLatestOrderSpy.mockImplementationOnce(() => {
        throw new Error('error')
      })

      mount(
        <GetHelp
          didRequestError={false}
          isRequestPending={false}
          orderId={"7"}
          order={{ id: '1', recipeItems: ['123456']}}
          user={{ id: '123', accessToken: 'test' }}
          recipes={{}}
          recipesLoadRecipesById={recipesLoadRecipesByIdSpy}
          storeGetHelpOrderId={storeGetHelpOrderIdSpy}
          userLoadOrder={userLoadOrderSpy}
          validateLatestOrder={validateLatestOrderSpy}
        >
          <div className="test" />
        </GetHelp>
      )

      expect(browserHistory.push).toHaveBeenCalledWith('/get-help/contact')
    })

    test('error is not being displayed if order id is invalid', async () => {
      browserHistory.push = jest.fn()

      const fetchPromise = Promise.resolve({ data: { valid: false } })

      validateLatestOrderSpy.mockImplementationOnce(() => fetchPromise)

      mount(
        <GetHelp
          didRequestError={false}
          isRequestPending={false}
          orderId={"7"}
          order={{ id: '1', recipeItems: ['123456']}}
          user={{ id: '123', accessToken: 'test' }}
          recipes={{}}
          recipesLoadRecipesById={recipesLoadRecipesByIdSpy}
          storeGetHelpOrderId={storeGetHelpOrderIdSpy}
          userLoadOrder={userLoadOrderSpy}
          validateLatestOrder={validateLatestOrderSpy}
        >
          <div className="test" />
        </GetHelp>
      )

      return fetchPromise.then(async () => {
        await fetchPromise

        expect(browserHistory.push).toHaveBeenCalledWith('/get-help/contact')
      })
    })

    test('calls customers order endpoint', () => {
      expect(userLoadOrderSpy).toHaveBeenCalledWith('7')
    })

    test('store order ID', () => {
      expect(storeGetHelpOrderIdSpy).toHaveBeenCalledWith('7')
    })

    test('calls recipe API by order ID', () => {
      expect(recipesLoadRecipesByIdSpy).toHaveBeenCalledWith(['123456'])
    })
  })
})
