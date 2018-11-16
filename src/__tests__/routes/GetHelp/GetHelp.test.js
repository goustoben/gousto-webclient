import React from 'react'
import { mount } from 'enzyme'
import Helmet from 'react-helmet'
import GetHelp from 'routes/GetHelp/GetHelp'
import { client as routes } from 'config/routes'

describe('<GetHelp />', () => {
  describe('rendering', () => {
    let wrapper
    const storeGetHelpOrderIdSpy = jest.fn()
    const userLoadOrderSpy = jest.fn().mockResolvedValue({})
    const recipesLoadRecipesByIdSpy = jest.fn().mockResolvedValue({})

    beforeAll(() => {
      wrapper = mount(
        <GetHelp
          didRequestError={false}
          isRequestPending={false}
          pending={false}
          orderId={"7"}
          order={{ id: 7, recipeItems: ['123456']}}
          recipes={{}}
          recipesLoadRecipesById={recipesLoadRecipesByIdSpy}
          storeGetHelpOrderId={storeGetHelpOrderIdSpy}
          userLoadOrder={userLoadOrderSpy}
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
          order={{ id: 1, recipeItems: ['123456']}}
          recipes={{}}
          recipesLoadRecipesById={recipesLoadRecipesByIdSpy}
          storeGetHelpOrderId={storeGetHelpOrderIdSpy}
          userLoadOrder={userLoadOrderSpy}
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
          recipesLoadRecipesById={recipesLoadRecipesByIdSpy}
          storeGetHelpOrderId={storeGetHelpOrderIdSpy}
          userLoadOrder={userLoadOrderSpy}
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

      wrapper = mount(
        <GetHelp
          didRequestError={false}
          isRequestPending={false}
          orderId={""}
          order={{}}
          recipes={{}}
          recipesLoadRecipesById={recipesLoadRecipesByIdSpy}
          storeGetHelpOrderId={storeGetHelpOrderIdSpy}
          userLoadOrder={userLoadOrderSpy}
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

    beforeAll(() => {
      mount(
        <GetHelp
          didRequestError={false}
          isRequestPending={false}
          orderId={"7"}
          order={{ id: 1, recipeItems: ['123456']}}
          recipes={{}}
          recipesLoadRecipesById={recipesLoadRecipesByIdSpy}
          storeGetHelpOrderId={storeGetHelpOrderIdSpy}
          userLoadOrder={userLoadOrderSpy}
        >
          <div className="test" />
        </GetHelp>
      )
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
