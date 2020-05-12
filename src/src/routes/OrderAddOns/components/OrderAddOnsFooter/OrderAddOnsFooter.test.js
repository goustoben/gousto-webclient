import React from 'react'
import { shallow } from 'enzyme'
import { OrderAddOnsFooter } from './OrderAddOnsFooter'

describe('the OrderAddOnsFooter component', () => {
  let wrapper
  const CHILDREN = [
    <div key={1}>Test child 1</div>,
    <p key={2}>Test child 2</p>,
  ]

  beforeEach(() => {
    wrapper = shallow(<OrderAddOnsFooter>{CHILDREN}</OrderAddOnsFooter>)
  })

  test('renders the children passed in', () => {
    expect(wrapper.contains(CHILDREN)).toBe(true)
  })

  test('error message is not shown', () => {
    expect(
      wrapper.find('Alert').length
    ).toBe(0)
  })

  describe('and showError is set to true', () => {
    beforeEach(() => {
      wrapper.setProps({ showError: true })
    })

    test('displays an error message', () => {
      expect(
        wrapper.find('Alert').find('p').exists()
      ).toBe(true)
    })

    describe.each([
      [null, ''],
      ['1234', '/?user_id=1234']
    ])('when the userIdProp is %s', (userId, urlQueryParam) => {
      beforeEach(() => {
        wrapper.setProps({ userId })
      })

      test(`link points to zendesk contact us page, plus "${urlQueryParam}"`, () => {
        expect(wrapper.find('Alert').find('a').prop('href'))
          .toBe(`https://gousto.zendesk.com/hc/en-gb/articles/360034974753-Contact-us${urlQueryParam}`)
      })
    })
  })
})
