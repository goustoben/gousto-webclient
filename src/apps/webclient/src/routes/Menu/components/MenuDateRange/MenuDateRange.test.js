import React from 'react'
import { shallow } from 'enzyme'
import { MenuDateRange } from './MenuDateRange'

describe('Given we are rendering MenuDateRange', () => {
  let wrapper
  const TEXT = 'Menu for Sep 19 - Sep 25'

  beforeEach(() => {
    wrapper = shallow(<MenuDateRange text={TEXT} variant="desktop" />)
  })

  test('then it should render correctly', () => {
    expect(wrapper.matchesElement(<h1 className="menuDateRange">{TEXT}</h1>)).toBeTruthy()
  })

  describe('When variant is mobile', () => {
    beforeEach(() => {
      wrapper.setProps({ variant: 'mobile' })
    })

    test('then it should add the class name', () => {
      expect(wrapper.matchesElement(<h1 className="menuDateRange mobile">{TEXT}</h1>)).toBeTruthy()
    })
  })
})
