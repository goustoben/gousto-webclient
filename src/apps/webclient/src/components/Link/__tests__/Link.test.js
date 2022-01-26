import React from 'react'
import { shallow } from 'enzyme'
import PropTypes from 'prop-types'
import { GoustoLink } from 'Link/Link'
import { Link as ReactRouterLink } from 'react-router'

const router = {
  push: () => {},
  replace: () => {},
  go: () => {},
  goBack: () => {},
  goForward: () => {},
  setRouteLeaveHook: () => {},
  isActive: () => {},
  createHref: location => location,
}

// We add legacy context to access the store to test the AbandonBasketModal
// component. This is cause enzyme only supports legacy context
GoustoLink.contextTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  router: PropTypes.any,
}

describe('GoustoLink', () => {
  test("should render an <a> element if there's no router in it's context", () => {
    const wrapper = shallow(<GoustoLink to="/page">Page</GoustoLink>)
    expect(wrapper.type()).toEqual('a')
  })

  test("should render a react router Link if there's a router in it's context", () => {
    const wrapper = shallow(<GoustoLink to="/page">Page</GoustoLink>, {
      context: { router },
    })
    expect(wrapper.type()).toEqual(ReactRouterLink)
  })

  test("should render an <a> element if there's a router in it's context but clientRouted=false", () => {
    const wrapper = shallow(
      <GoustoLink to="/page" clientRouted={false}>
        Page
      </GoustoLink>,
      { context: { router } },
    )
    expect(wrapper.type()).toEqual('a')
  })
})
