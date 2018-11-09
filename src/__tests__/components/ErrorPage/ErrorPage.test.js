import React from 'react'
import { shallow } from 'enzyme'

import ErrorPage from 'components/ErrorPage'

import configureStore from 'redux-mock-store'

const mockStore = configureStore()

describe('ErrorPage', () => {
  test('should return a <div>', () => {
    const wrapper = shallow(<ErrorPage store={mockStore({})} />)
    expect(wrapper.html().indexOf('<div')).not.toEqual(-1)
  })

  test('should default to a 404', () => {
    const wrapper = shallow(<ErrorPage store={mockStore({})} />)
    expect(
      wrapper
        .html()
        .indexOf('We can&#x27;t find the page you&#x27;re looking for'),
    ).not.toEqual(-1)
  })

  test('should change its contents depending on the status prop', () => {
    const wrapper = shallow(
			<ErrorPage status="500" store={mockStore({ serverError: '500' })} />,
    )
    expect(
      wrapper.html().indexOf('That wasn&#x27;t meant to happen'),
    ).not.toEqual(-1)

    const wrapper2 = shallow(
			<ErrorPage status="403" store={mockStore({ serverError: '403' })} />,
    )
    expect(wrapper2.html().indexOf('Something&#x27;s Fishy')).not.toEqual(-1)
  })

  test("should default to 404 when custom content status doesn't exist for that error code", () => {
    const wrapper = shallow(
			<ErrorPage status="418" store={mockStore({ serverError: '418' })} />,
    )
    expect(
      wrapper
        .html()
        .indexOf('We can&#x27;t find the page you&#x27;re looking for'),
    ).not.toEqual(-1)
  })
})
