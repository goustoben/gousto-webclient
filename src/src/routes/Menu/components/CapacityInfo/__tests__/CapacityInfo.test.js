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
    [null, 'https://cook.gousto.co.uk/coronavirus-3/'],
    ['1234', `${zendesk.covid}/?user_id=1234`]
  ])('when the userIdProp is %s', (userId, url) => {
    beforeEach(() => {
      wrapper.setProps({ userId })
    })

    test(`it renders a link to zendesk, plus: "${url}"`, () => {
      expect(wrapper.find('a').prop('href'))
        .toBe(url)
    })
  })
})
