import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
import { CTA } from '..'

describe('<CTA />', () => {
  let wrapper
  let elCTA

  const PROPS = {
    onClick: jest.fn(),
  }

  const CONTENT = 'Click me!'
  const EXTRA_INFO_CONTENT = '£1.85'

  beforeEach(() => {
    wrapper = mount(<CTA {...PROPS}>{CONTENT}</CTA>)
    elCTA = wrapper.find('.cta')
  })

  afterEach(() => {
    PROPS.onClick.mockClear()
  })

  test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<CTA {...PROPS}>{CONTENT}</CTA>, div)
  })

  test('renders a button with the type button as the main element', () => {
    expect(elCTA.type()).toBe('button')
    expect(elCTA.prop('type')).toBe('button')
  })

  test('renders the children inside the button', () => {
    expect(elCTA.contains(CONTENT)).toBe(true)
  })

  test('does not have the disabled attribute on the button', () => {
    expect(elCTA.getDOMNode().disabled).toBe(false)
  })

  test('does not have the isLoading class on the button', () => {
    expect(elCTA.hasClass('isLoading')).toBe(false)
  })

  test('does not show the Loader component', () => {
    expect(wrapper.find('Loader').exists()).toBe(false)
  })

  test('does not wrap the content in an element with the class contentWrap', () => {
    expect(wrapper.find('.contentWrap').contains(CONTENT)).toBe(false)
  })

  test('does not show the extra info in an element with the class extraInfo', () => {
    expect(wrapper.find('.extraInfo').contains(EXTRA_INFO_CONTENT)).toBe(false)
  })

  test('does not have the isFullWidth class on the button', () => {
    expect(elCTA.hasClass('isFullWidth')).toBe(false)
  })

  test('does not have the isFullWidthForSmallScreens class on the button', () => {
    expect(elCTA.hasClass('isFullWidthForSmallScreens')).toBe(false)
  })

  test('does not have the secondary variant class on the button', () => {
    expect(elCTA.hasClass('secondary')).toBe(false)
  })

  test('has the default size class set on the button', () => {
    expect(elCTA.hasClass('medium')).toBe(true)
  })

  test('does not have a data-testing attribute on the root element', () => {
    expect(wrapper.childAt(0).prop('data-testing')).toBe(null)
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

  describe('when the button is clicked', () => {
    beforeEach(() => {
      wrapper.simulate('click')
    })

    test('calls the function passed through onClick prop', () => {
      expect(PROPS.onClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('when the isDisabled prop is passed', () => {
    beforeEach(() => {
      wrapper.setProps({ isDisabled: true })
      elCTA = wrapper.find('.cta')
    })

    test('sets the disabled attribute on the button', () => {
      expect(elCTA.getDOMNode().disabled).toBe(true)
    })

    test('adds the isDisabled class on the button', () => {
      expect(elCTA.hasClass('isDisabled')).toBe(true)
    })

    describe('and the button is clicked', () => {
      beforeEach(() => {
        wrapper.simulate('click')
      })

      test('does not call the function passed through onClick prop', () => {
        expect(PROPS.onClick).not.toHaveBeenCalled()
      })
    })
  })

  describe('when the variant prop is set to secondary', () => {
    beforeEach(() => {
      wrapper.setProps({ variant: 'secondary' })
      elCTA = wrapper.find('.cta')
    })

    test('secondary is added to the button', () => {
      expect(elCTA.hasClass('secondary')).toBe(true)
    })
  })

  describe('when the isLoading prop is passed', () => {
    beforeEach(() => {
      wrapper.setProps({ isLoading: true })
      elCTA = wrapper.find('.cta')
    })

    test('adds the isLoading class to the button', () => {
      expect(elCTA.hasClass('isLoading')).toBe(true)
    })

    test('shows the Loader component', () => {
      expect(wrapper.find('Loader').exists()).toBe(true)
    })

    test('passes the right value for the color prop to the Loader', () => {
      expect(wrapper.find('Loader').prop('color')).toBe('White')
    })

    describe('and the button is clicked', () => {
      beforeEach(() => {
        wrapper.simulate('click')
      })

      test('does not call the function passed through onClick prop', () => {
        expect(PROPS.onClick).not.toHaveBeenCalled()
      })
    })

    describe('and the variant is set to secondary', () => {
      beforeEach(() => {
        wrapper.setProps({ variant: 'secondary' })
      })

      test('passes the right value for the color prop to the Loader', () => {
        expect(wrapper.find('Loader').prop('color')).toBe('Bluecheese')
      })
    })
  })

  describe('when the extraInfo prop is passed', () => {
    beforeEach(() => {
      wrapper.setProps({ extraInfo: EXTRA_INFO_CONTENT })
    })

    test('wraps the content in an element with the class contentWrap', () => {
      expect(wrapper.find('.content').contains(CONTENT)).toBe(true)
    })

    test('shows the extra info in an element with the class extraInfo', () => {
      expect(wrapper.find('.extraInfo').contains(EXTRA_INFO_CONTENT)).toBe(true)
    })
  })

  describe('when the isFullWidth prop is set "true"', () => {
    beforeEach(() => {
      wrapper.setProps({ isFullWidth: true })
      elCTA = wrapper.find('.cta')
    })

    test('adds the isFullWidth class to the button', () => {
      expect(elCTA.hasClass('isFullWidth')).toBe(true)
    })

    test('does not add the isFullWidthForSmallScreens class to the button', () => {
      expect(elCTA.hasClass('isFullWidthForSmallScreens')).toBe(false)
    })
  })

  describe('when the isFullWidth prop is set "small-screens-only"', () => {
    beforeEach(() => {
      wrapper.setProps({ isFullWidth: 'small-screens-only' })
      elCTA = wrapper.find('.cta')
    })

    test('does not add the isFullWidth class to the button', () => {
      expect(elCTA.hasClass('isFullWidth')).toBe(false)
    })

    test('adds the isFullWidthForSmallScreens class to the button', () => {
      expect(elCTA.hasClass('isFullWidthForSmallScreens')).toBe(true)
    })
  })

  describe('when the size prop is passed', () => {
    beforeEach(() => {
      wrapper.setProps({ size: 'small' })
      elCTA = wrapper.find('.cta')
    })

    test('removes the default size class set on the button', () => {
      expect(elCTA.hasClass('medium')).toBe(false)
    })

    test('has the corresponding size class set on the button', () => {
      expect(elCTA.hasClass('small')).toBe(true)
    })
  })
})
