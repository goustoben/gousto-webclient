import React from 'react'
import { shallow } from 'enzyme'
import { ShortlistTutorial } from '../ShortlistTutorial'

jest.mock('../helper', () => ({
  checkIfElementIsVisible: jest.fn().mockReturnValue(true),
  getTooltipProperties: jest.fn().mockReturnValue({
    style: {
      position: 'absolute',
      right: 'initial',
      left: 0,
      bottom: '30px'
    },
    arrow: 'bottom',
    arrowStyle: {
      right: 'initial',
      left: 0,
    }
  })
}))

describe('Shortlist Tutorial', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(
      <ShortlistTutorial show step={1} stepSelector={"[data-slug='heart']"} />
    )
  })

  describe('render', () => {
    test('should render Tooltip', () => {
      expect(wrapper.find('Tooltip')).toHaveLength(1)
    })

    test('should render title text for step 1', () => {
      expect(wrapper.find('.title').text()).toContain('You can now shortlist recipes!')
    })

    test('should render the heart svg if step 1', () => {
      expect(wrapper.find("[fileName='icon_shortlist_heart_selected']")).toHaveLength(1)
    })

    test('should render title text for step 2', () => {
      wrapper.setProps({ step: 2, stepSelector: "[data-slug='box-summary-mobile']" })
      expect(wrapper.find('.title').text()).toContain('You just added a recipe to your shortlist. Nicely done!')
    })
  })
})
