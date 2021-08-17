import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as Menu from 'actions/menu'
import * as Sides from '../../../../actions/sides'

import { CheckoutContainer } from '../CheckoutContainer'

describe('CheckoutContainer', () => {
  let wrapper

  beforeEach(() => {
    const mockStore = configureStore([thunk])

    const store = mockStore({
      auth: Immutable.Map({}),
      basket: Immutable.Map({}),
      error: Immutable.Map({}),
      menuRecipes: Immutable.List(),
      pending: Immutable.Map({}),
      pricing: Immutable.Map({}),
      stock: Immutable.Map({}),
    })

    wrapper = shallow(<CheckoutContainer store={store} />)
  })

  test('when we trigger openSidesModal it dispatches the actions openSidesModal and openSidesModal', () => {
    const trackViewSidesModal = jest.fn().mockReturnValue({ type: 'action' })
    const openSidesModal = jest.fn().mockReturnValue({ type: 'action' })

    const trackViewSidesModalSpy = jest.spyOn(Menu, 'trackViewSidesModal').mockImplementation(trackViewSidesModal)
    const openSidesModalSpy = jest.spyOn(Sides, 'openSidesModal').mockImplementation(openSidesModal)

    wrapper.prop('openSidesModal')()

    expect(trackViewSidesModalSpy).toBeCalledTimes(1)
    expect(openSidesModalSpy).toBeCalledTimes(1)
  })
})
