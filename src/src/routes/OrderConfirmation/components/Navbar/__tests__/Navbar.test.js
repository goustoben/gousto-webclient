import React from 'react'
import { shallow } from 'enzyme'
import { Navbar } from '..'

describe('Navbar', () => {
  let wrapper
  let items
  const onClickMock = jest.fn()

  beforeEach(() => {
    items = [{ id: 'Category 1', label: 'Category 1', count: 45 }, { id: 'Category 2', label: 'Category 2' }]

    wrapper = shallow(<Navbar items={items} active='Category 1' onClick={onClickMock} />)
  })

  test('should render correct amount of li elements', () => {
    expect(wrapper.find('li').length).toEqual(2)
  })

  test('should render correct amount of button elements', () => {
    expect(wrapper.find('button').length).toEqual(2)
  })

  test('should call onClick with correct params when user clicks on button', () => {
    wrapper.find('button').at(0).simulate('click')

    expect(onClickMock).toHaveBeenCalledWith('Category 1')
  })

  test('should render the count for categories where it is available', () => {
    expect(wrapper.find('button').at(0).text()).toBe(`${items[0].id} (${items[0].count})`)
  })

  test('should not render empty parenthesis when the count for a category is not available', () => {
    expect(wrapper.find('button').at(1).text()).toBe(items[1].id)
  })
})
