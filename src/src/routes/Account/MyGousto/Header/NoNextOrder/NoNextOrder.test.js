import React from 'react'
import { mount } from 'enzyme'
import { NoNextOrder } from '.'

describe('the NoNextOrder component', () => {
  let wrapper
  const LABEL = 'This is a label'
  const URL = 'this/is/a/path'
  const PRIMARY_MESSAGE = 'Please click here, I beg you'

  beforeEach(() => {
    wrapper = mount(
      <NoNextOrder
        linkLabel={LABEL}
        linkUrl={URL}
        primaryMessage={PRIMARY_MESSAGE}
      />
    )
  })

  test('renders without crashing', () => {})

  test('should show the primary message', () => {
    expect(wrapper.find('OrderDetails').find('.message').text())
      .toBe(PRIMARY_MESSAGE)
  })

  test('Passes the linkLabel prop down to CardWithLink"', () => {
    const linkLabel = wrapper.find('CardWithLink').prop('linkLabel')
    expect(linkLabel).toBe(LABEL)
  })

  test('Passes the linkUrl prop down to CardWithLink', () => {
    const linkUrl = wrapper.find('CardWithLink').prop('linkUrl')
    expect(linkUrl).toBe(URL)
  })

  test('The clientRouted prop of CardWithLink is true', () => {
    expect(wrapper.find('CardWithLink').prop('clientRouted')).toBe(true)
  })

  test('passes the correct heading to OrderDetails', () => {
    expect(wrapper.find('OrderDetails').prop('heading')).toBe('Your next box delivery')
  })
})
