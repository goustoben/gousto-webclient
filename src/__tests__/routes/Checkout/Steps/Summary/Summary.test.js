import React from 'react'

import Immutable from 'immutable'
import { shallow } from 'enzyme'

import Summary from 'routes/Checkout/Components/Summary/Summary'
/* eslint-disable new-cap */
import Link from 'Link'
import { H3 } from 'Page/Header'
import Receipt from 'Receipt/Receipt'

describe('Summary', () => {
  let wrapper
  let store

  beforeEach(() => {
    store = {
      getState: () => ({
        basket: {
          get: () => {},
        },
        pricing: Immutable.Map({
          prices: Immutable.Map({}),
        }),
      }),
      subscribe: () => {},
    }

    wrapper = shallow(<Summary />)
  })

  test('should render a <div> with no props', () => {
    expect(wrapper.type()).toBe('div')
  })

  test('should render 1 <H3 /> component(s)', () => {
    expect(wrapper.find(H3).length).toBe(1)
  })

  test('should render 1 <Link> component(s)', () => {
    expect(wrapper.find(Link).length).toBe(1)
  })

  test('should render 1 <Link> component(s) if box details step and desktop', () => {
    wrapper = shallow(
			<Summary
			  routing={{
			    locationBeforeTransitions: {
			      pathname: 'check-out/boxdetails',
			    },
			  }}
			/>,
    )
    expect(wrapper.find(Link).length).toBe(1)
  })

  test('should NOT render <Link> component(s) if mobile', () => {
    wrapper = shallow(<Summary browser="mobile" />)
    expect(wrapper.find(Link).length).toBe(0)
  })

  test('should NOT render <Link> component(s) if box details step and mobile', () => {
    wrapper = shallow(
			<Summary
			  routing={{
			    locationBeforeTransitions: {
			      pathname: 'check-out/boxdetails',
			    },
			  }}
			  browser="mobile"
			/>,
    )
    expect(wrapper.find(Link).length).toBe(0)
  })

  test('should NOT render <Link> component(s) if payment step', () => {
    wrapper = shallow(
			<Summary
			  routing={{
			    locationBeforeTransitions: {
			      pathname: 'check-out/payment',
			    },
			  }}
			/>,
    )
    expect(wrapper.find(Link).length).toBe(0)
  })

  test('should render 1 <Receipt /> component', () => {
    expect(wrapper.find(Receipt).length).toBe(1)
  })
})
