import React from 'react'
import sinon from 'sinon'
import { shallow } from 'enzyme'

import Link from 'Link'
import CookieBanner from 'CookieBanner/CookieBanner'

describe('CookieBanner', () => {
  test('cookie banner not rendering', () => {
    const wrapper = shallow(<CookieBanner
      copy={{
        button: '',
        findMore: '',
        description: '',
      }}
      cookiePolicyAcceptanceChange={() => {}}
      isCookiePolicyAccepted
    />)

    expect(wrapper.children().length).toBe(0)
  })

  test('copies are presented', () => {
    const wrapper = shallow(<CookieBanner
      copy={{
        button: 'button',
        findMore: 'find more',
        description: 'description',
      }}
      cookiePolicyAcceptanceChange={() => {}}
    />)

    expect(wrapper.find('.button').text()).toBe('button')
    expect(wrapper.find('.linkMessage').text()).toBe('find more')
    expect(wrapper.find('.description').text().indexOf('description')).toBeGreaterThan(-1)
  })

  test('accept cookie policy button', () => {
    const cookiePolicyAcceptanceChangeSpy = sinon.spy()
    const wrapper = shallow(<CookieBanner
      copy={{
        button: '',
        findMore: '',
        description: '',
      }}
      cookiePolicyAcceptanceChange={cookiePolicyAcceptanceChangeSpy}
    />)

    wrapper.find('a').simulate('click')

    expect(cookiePolicyAcceptanceChangeSpy.calledOnce).toBe(true)
  })
})
