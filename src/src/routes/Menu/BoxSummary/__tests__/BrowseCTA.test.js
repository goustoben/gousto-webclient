import { shallow } from 'enzyme'
import React from 'react'

import sinon from 'sinon'

import { BrowseCTA } from '../BrowseCTA/BrowseCTA'

describe('BrowseCTA', () => {
  let menuBrowseCTAShow
  let boxDetailsVisibilityChange
  let menuBrowseCTAVisibilityChange
  let eventSpy
  let preventDefault
  let stopPropagation
  const view = 'desktop'

  beforeEach(() => {
    preventDefault = sinon.spy()
    stopPropagation = sinon.spy()

    eventSpy = {
      preventDefault,
      stopPropagation,
    }
    menuBrowseCTAShow = sinon.stub().returns(() => {})
    boxDetailsVisibilityChange = sinon.stub().returns(() => {})
    menuBrowseCTAVisibilityChange = sinon.stub().returns(() => {})
  })

  test('should return a div', () => {
    const wrapper = shallow(<BrowseCTA />)
    expect(wrapper.type()).toBe('div')
  })

  test('should return a div', () => {
    const wrapper = shallow(
      <BrowseCTA
        menuBrowseCTAShow={menuBrowseCTAShow}
        boxDetailsVisibilityChange={boxDetailsVisibilityChange}
        menuBrowseCTAVisibilityChange={menuBrowseCTAVisibilityChange}
        view={view}
      />,
    )
    wrapper.simulate('click', eventSpy)

    expect(menuBrowseCTAVisibilityChange.callCount).toBe(1)
    expect(menuBrowseCTAVisibilityChange.getCall(0).args[0]).toEqual(false)

    expect(boxDetailsVisibilityChange.callCount).toBe(1)
    expect(boxDetailsVisibilityChange.getCall(0).args[0]).toEqual(true)
    expect(boxDetailsVisibilityChange.getCall(0).args[1]).toEqual(view)

    expect(preventDefault.callCount).toBe(1)
    expect(stopPropagation.callCount).toBe(1)
  })
})
