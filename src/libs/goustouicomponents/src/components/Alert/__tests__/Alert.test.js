import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
import { Alert } from '../index'

describe('<Alert />', () => {
  const CONTENT_CLASS = '.content'
  const STRING_CHILD = 'Test alert'
  const NODE_CHILD = (
    <div>
      <p>Test alert with node child</p>
    </div>
  )

  test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <Alert>{STRING_CHILD}</Alert>,
      div,
    )
  })

  let wrapper
  beforeEach(() => {
    wrapper = mount(
      <Alert>{STRING_CHILD}</Alert>,
    )
  })

  describe('when mounted', () => {
    describe('and the children prop is a string', () => {
      test('should wrap the children prop in a styled div', () => {
        expect(wrapper.find(CONTENT_CLASS).text()).toBe(STRING_CHILD)
      })
    })

    describe('and the children prop is a node', () => {
      beforeEach(() => {
        wrapper = mount(
          <Alert>{NODE_CHILD}</Alert>,
        )
      })

      test('should wrap the children prop in a styled div', () => {
        expect(wrapper.find(CONTENT_CLASS).children().contains(NODE_CHILD)).toBe(true)
      })
    })
  })

  describe('when the hasIcon prop is set to false', () => {
    beforeEach(() => {
      wrapper.setProps({ hasIcon: false })
    })

    test('icon is not being rendered', () => {
      expect(wrapper.find('[className^="icon"]').length).toBe(0)
    })

    test('hasIcon class is not added', () => {
      expect(wrapper.find('div').at(0).hasClass('hasIcon')).toBe(false)
    })
  })

  describe('when no type prop is passed', () => {
    test('should render with the info icon class as default', () => {
      expect(wrapper.find('span').at(0).hasClass('icon-info')).toBe(true)
    })

    test('should render with the info alert class as default', () => {
      expect(wrapper.find('div').at(0).hasClass('info')).toBe(true)
    })
  })

  describe('when the type prop is passed', () => {
    beforeEach(() => {
      wrapper.setProps({ type: 'danger' })
    })

    test('should render with the danger icon class', () => {
      expect(wrapper.find('span').at(0).hasClass('icon-danger')).toBe(true)
    })

    test('should not render with the default info icon class', () => {
      expect(wrapper.find('span').at(0).hasClass('icon-info')).toBe(false)
    })

    test('should render with the danger alert class', () => {
      expect(wrapper.find('div').at(0).hasClass('danger')).toBe(true)
    })

    test('should not render with the default info alert class', () => {
      expect(wrapper.find('div').at(0).hasClass('info')).toBe(false)
    })
  })
})
