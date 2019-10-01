import React from 'react'
import { shallow } from 'enzyme'
import { List } from '../List'

describe('List', () => {
  const listItems = [
    'Choose [X] recipes for [X] each week',
    'Cancel or pause online at any time',
    '[50%] off first box + [30%] off all boxes in the first month',
    'Surprise gifts!',
  ]
  const wrapper = shallow(<List listItems={listItems} />)

  it('should render a ul element', () => {
    expect(wrapper.find('ul').length).toEqual(1)
  })

  it('should render an li element for each item in listItems', () => {
    expect(wrapper.find('li').length).toEqual(4)
  })
})
