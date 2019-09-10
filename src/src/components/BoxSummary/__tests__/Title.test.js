import { shallow } from 'enzyme'
import React from 'react'

import Title from 'BoxSummary/Title/Title'
import { Spinner } from 'goustouicomponents'
import { MOBILE_VIEW } from 'utils/view'
import Price from 'BoxSummary/Price'

describe('Title', () => {
  let wrapper

  test('should render a paragraph with date', () => {
    wrapper = shallow(<Title view="desktop" date="2016-06-26" />)

    expect(
      wrapper
        .children()
        .at(0)
        .text(),
    ).toEqual('Sun 26 Jun')
  })

  describe('pending', () => {
    let pending
    let view

    test('should not display a <Spinner /> or <Price /> if pending is true and view is not mobile', () => {
      pending = true
      wrapper = shallow(<Title pending={pending} />)

      expect(wrapper.find(Spinner).length).toEqual(0)
      expect(wrapper.find(Price).length).toEqual(0)
    })

    test('should display a <Spinner /> if pending is true and view is mobile', () => {
      [pending, view] = [true, MOBILE_VIEW]
      wrapper = shallow(<Title pending={pending} view={view} />)

      expect(wrapper.find(Spinner).length).toEqual(1)
      expect(wrapper.find(Price).length).toEqual(0)
    })

    test('should display a <Price /> if pending is false', () => {
      pending = false
      wrapper = shallow(<Title pending={pending} />)

      expect(wrapper.find(Spinner).length).toEqual(0)
      expect(wrapper.find(Price).length).toEqual(1)
    })
  })
})
