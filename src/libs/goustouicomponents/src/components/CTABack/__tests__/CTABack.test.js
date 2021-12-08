import React from 'react'
import { mount } from 'enzyme'
import { CTABack } from '..'

describe('<CTABack />', () => {
  let wrapper
  window.history.back = jest.fn()

  beforeEach(() => {
    wrapper = mount(<CTABack />)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('renders without crashing', () => {})

  test('does not have a data-testing attribute on the root element', () => {
    expect(wrapper.childAt(0).prop('data-testing')).toBe(null)
  })

  test('renders the back arrow', () => {
    expect(wrapper.find('.icon').exists()).toBe(true)
  })

  test('renders "Back" by default', () => {
    expect(wrapper.text()).toBe('Back')
  })

  describe('when the testingSelector prop is passed', () => {
    const TESTING_SELECTOR = 'select-for-testing'

    beforeEach(() => {
      wrapper.setProps({ testingSelector: TESTING_SELECTOR })
    })

    test('adds a data-testing attribute to the root element with the value of the prop', () => {
      expect(wrapper.childAt(0).prop('data-testing')).toBe(TESTING_SELECTOR)
    })
  })

  describe('when a label prop is passed', () => {
    const LABEL = 'A custom label'

    beforeEach(() => {
      wrapper.setProps({ label: LABEL })
    })

    test('renders the label', () => {
      expect(wrapper.text()).toBe(LABEL)
    })
  })

  describe('when clicking on the component', () => {
    beforeEach(() => {
      wrapper.simulate('click')
    })

    test('redirects to the previous page', () => {
      expect(window.history.back).toHaveBeenCalled()
    })
  })

  describe('when a url prop is passed', () => {
    const URL = 'https://gousto.co.uk'

    beforeEach(() => {
      wrapper.setProps({ url: URL })
    })

    test('the link points to the url', () => {
      expect(wrapper.find('a').prop('href')).toBe(URL)
    })

    describe('and clicking on the component', () => {
      beforeEach(() => {
        wrapper.simulate('click')
      })

      test('does not redirect to the previous page', () => {
        expect(window.history.back).not.toHaveBeenCalled()
      })
    })
  })
})
