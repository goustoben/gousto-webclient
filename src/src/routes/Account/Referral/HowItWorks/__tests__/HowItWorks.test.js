import React from 'react'
import { mount } from 'enzyme'
import Immutable from 'immutable'
import { HowItWorks } from '../index'

describe('How It Works RAF', () => {
  let wrapper
  const details = Immutable.List([
    "Invite your friends to try Gousto. We’ll pop £15 in your account and your friends will get 50% off their first box",
    "You can refer up to 20 friends every month. That’s £300 worth of Gousto credit to use on recipes and goodies from the Gousto market",
    "Your credit shows up once your friend’s first box is delivered. See full T&Cs [tc]here.[/tc]"
  ])
  beforeEach(() => {
    wrapper = mount(<HowItWorks details={details} />)
  })

  describe('render', () => {
    test('should render 3 steps', () => {
      expect(wrapper.find('.howItWorksStep').length).toEqual(3)
    })
  })

  describe('render', () => {
    test('should render last step with the correct link', () => {
      expect(wrapper.html()).toContain('/raf-tcs/')
    })
  })
})
