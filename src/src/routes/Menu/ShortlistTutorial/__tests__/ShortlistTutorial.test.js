import React from 'react'
import { shallow } from 'enzyme'
import { ShortlistTutorial } from '../ShortlistTutorial'

jest.mock('../helper', () => ({
  checkIfElementIsVisible: jest.fn().mockReturnValue(true)
}))

describe('Shortlist Tutorial', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(
      <ShortlistTutorial show step={1} />
    )
  })

  describe('render', () => {
    test('should render Portal', () => {
      expect(wrapper.find('Portal')).toHaveLength(1)
    })

    test('should render one step', () => {
      expect(wrapper.find('Step')).toHaveLength(1)
    })

    test('should render the heart svg', () => {
      expect(wrapper.find("[fileName='icon_shortlist_heart_selected']")).toHaveLength(1)
    })
  })
})
