import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'
import { MenuDateRangeContainer } from './MenuDateRangeContainer'
import { getMenuDateRangeText } from './utils'

jest.mock('../MenuDateRange/utils', () => ({
  getMenuDateRangeText: jest.fn(() => 'Menu for MMM DD - MMM DD'),
}))

describe('MenuDateRangeContainer', () => {
  let wrapper
  const initialState = {
    basket: Immutable.Map({
      date: '2020-09-22',
    }),
  }
  const store = {
    getState: jest.fn(() => initialState),
    dispatch: jest.fn(),
    subscribe: jest.fn(),
  }

  beforeEach(() => {
    wrapper = shallow(<MenuDateRangeContainer store={store} variant="desktop" />)
  })

  test('it gets the text from the utility method', () => {
    expect(wrapper.find('MenuDateRange')).toHaveLength(1)
    expect(wrapper.find('MenuDateRange').prop('text')).toBe('Menu for MMM DD - MMM DD')
    expect(getMenuDateRangeText).toHaveBeenCalledWith('2020-09-22')
  })
})
