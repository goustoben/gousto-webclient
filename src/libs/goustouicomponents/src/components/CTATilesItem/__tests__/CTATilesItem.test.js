import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
import { CTATilesItem } from '..'

describe('<CTATilesItem />', () => {
  let wrapper
  const CONTENT = 'Click me please!'
  const PROPS = {
    url: 'http://example.com',
  }

  beforeEach(() => {
    wrapper = mount(<CTATilesItem {...PROPS}>{CONTENT}</CTATilesItem>)
  })

  test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<CTATilesItem {...PROPS}>{CONTENT}</CTATilesItem>, div)
  })

  test('renders an anchor', () => {
    expect(wrapper.find('.wrapper').type()).toBe('a')
  })

  test('render the content', () => {
    expect(wrapper.text()).toContain(CONTENT)
  })

  test('sets the URL prop as the href of the anchor', () => {
    expect(wrapper.find('.wrapper').prop('href')).toBe(PROPS.url)
  })

  test('does not contain an img', () => {
    expect(wrapper.find('img').exists()).toBe(false)
  })

  test('does not have a target attribute on the anchor', () => {
    expect(wrapper.find('a').prop('target')).toBe(null)
  })

  test('does not have a data-testing attribute on the anchor', () => {
    expect(wrapper.find('a').prop('data-testing')).toBe(null)
  })

  describe('when the image prop is passed', () => {
    const IMAGE_SRC = 'path-to-file/this-is-an-image.jpg'

    beforeEach(() => {
      wrapper.setProps({ image: IMAGE_SRC })
    })

    test('creates an img with that path', () => {
      expect(wrapper.find('img').prop('src')).toBe(IMAGE_SRC)
    })
  })

  describe('when the onClick prop is passed', () => {
    const CLICK_FUNCTION = jest.fn()

    beforeEach(() => {
      wrapper.setProps({ onClick: CLICK_FUNCTION })
    })

    describe('and the user clicks the component', () => {
      const preventDefaultSpy = jest.fn()
      const locationAssignSpy = jest.fn()
      const originalWindowLocation = window.location

      beforeEach(() => {
        delete window.location
        window.location = { assign: locationAssignSpy }

        wrapper.simulate('click', { preventDefault: preventDefaultSpy })
      })

      afterEach(() => {
        window.location = originalWindowLocation

        preventDefaultSpy.mockClear()
        locationAssignSpy.mockClear()
      })

      test('calls the function passed', () => {
        expect(CLICK_FUNCTION).toHaveBeenCalled()
      })

      test('calls the preventDefault function', () => {
        expect(preventDefaultSpy).toHaveBeenCalled()
      })

      test('redirects to the URL passed as prop', () => {
        expect(window.location.assign).toHaveBeenCalledWith(PROPS.url)
      })
    })
  })

  describe('when the target prop is passed', () => {
    beforeEach(() => {
      wrapper.setProps({ target: '_blank' })
    })

    test('adds the target attribute on the anchor', () => {
      expect(wrapper.find('a').prop('target')).toBe('_blank')
    })
  })

  describe('when the testingSelector prop is passed', () => {
    const TESTING_SELECTOR = 'select-for-testing'

    beforeEach(() => {
      wrapper.setProps({ testingSelector: TESTING_SELECTOR })
    })

    test('adds a data-testing attribute to the element with the value of the prop', () => {
      expect(wrapper.find('a').prop('data-testing')).toBe(TESTING_SELECTOR)
    })
  })
})
