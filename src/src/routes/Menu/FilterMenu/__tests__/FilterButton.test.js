import React from 'react'
import { shallow } from 'enzyme'

import { Button } from 'goustouicomponents'

import FilterButton from 'routes/Menu/FilterMenu/FilterButton/FilterButton'

describe('<FilterButton />', () => {
  let wrapper

  test('should trigger onClick prop when button is pressed', () => {
    const onClickSpy = jest.fn()
    wrapper = shallow(<FilterButton onClick={onClickSpy} />)
    wrapper.simulate('click')

    expect(onClickSpy).toHaveBeenCalled()
  })

  describe('count', () => {
    test('should display default text with no count provided', () => {
      wrapper = shallow(<FilterButton count={0} />)

      expect(wrapper.find(Button).children().text()).toContain('No recipes found')
    })

    test('should display results count when count prop provided', () => {
      wrapper = shallow(<FilterButton count={30} />)

      expect(wrapper.find(Button).children().text()).toContain(30)
    })

    test('should display disabled button for 0 recipes found', () => {
      wrapper = shallow(<FilterButton count={0} />)

      expect(wrapper.find(Button).at(0).getElement().props.disabled).toBe(true)
    })
  })
})
