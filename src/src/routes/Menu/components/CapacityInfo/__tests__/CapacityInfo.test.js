import React from 'react'
import { mount } from 'enzyme'
import { zendesk } from 'config/routes'
import { CapacityInfo } from '..'

describe('Given we render the CapacityInfo', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(<CapacityInfo />)
  })

  describe.each([
    [null, ''],
    ['1234', '/?user_id=1234']
  ])('when the userIdProp is %s', (userId, urlQueryParam) => {
    beforeEach(() => {
      wrapper.setProps({ userId })
    })

    test(`it renders a link to zendesk, plus: "${urlQueryParam}"`, () => {
      expect(wrapper.find('a').prop('href'))
        .toBe(`${zendesk.covid}${urlQueryParam}`)
    })
  })
})
