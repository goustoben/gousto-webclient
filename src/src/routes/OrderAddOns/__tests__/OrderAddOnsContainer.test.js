import React from 'react'
import thunk from 'redux-thunk'
import { mount } from 'enzyme'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { OrderAddOnsContainer } from '../OrderAddOnsContainer'

describe('<OrderAddOnsContainer />', () => {
  const store = createStore(
    combineReducers(
      Object.assign({})
    ),
    {},
    compose(applyMiddleware(thunk))
  )

  let wrapper

  beforeEach(() => {
    wrapper = mount(
      <OrderAddOnsContainer
        store={store}
      />
    )
  })

  test('renders without crashing', () => {
    expect(wrapper.find('div').length).toEqual(1)
  })
})
