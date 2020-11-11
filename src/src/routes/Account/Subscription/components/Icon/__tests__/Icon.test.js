import React from 'react'
import { mount } from 'enzyme'
import { Icon } from '../Icon.logic'

describe('Icon', () => {
  let wrapper

  describe('when icon from known types is passed down', () => {
    beforeEach(() => {
      wrapper = mount(<Icon name="calendar" />)
    })

    test('renders Icon with class the name passed down', () => {
      expect(wrapper.find('.calendar').exists()).toBeTruthy()
    })
  })

  describe('when testingSelector is passed down', () => {
    beforeEach(() => {
      wrapper = mount(<Icon name="calendar" testingSelector="subscription-page-calendar-icon" />)
    })

    test('adds attribute data-testing to Icon', () => {
      expect(wrapper.find('[data-testing="subscription-page-calendar-icon"]').exists()).toBeTruthy()
    })
  })

  describe('when icon with unknown name is passed down', () => {
    beforeEach(() => {
      wrapper = mount(<Icon name="unknownIcon" />)
    })

    test('renders null', () => {
      expect(wrapper.isEmptyRender()).toBeTruthy()
    })
  })
})
