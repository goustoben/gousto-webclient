import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
import { InfoTip } from '../index'

describe('<InfoTip />', () => {
  let wrapper
  const CONTENT = 'Important information'

  beforeEach(() => {
    wrapper = mount(<InfoTip>{CONTENT}</InfoTip>)
  })

  test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<InfoTip>{CONTENT}</InfoTip>, div)
  })

  test('renders content inside the component', () => {
    expect(wrapper.contains(CONTENT)).toBe(true)
  })

  test('does not render CloseIcon component', () => {
    expect(wrapper.find('CloseIcon').exists()).toBe(false)
  })

  test('does not hide the component', () => {
    expect(wrapper.find('.isHidden').exists()).toBe(false)
  })

  test('does not set maxWidth and minWidth of the component', () => {
    expect(wrapper.find('.infoTipWrapper').prop('style')).toHaveProperty('maxWidth', 'none')
    expect(wrapper.find('.infoTipWrapper').prop('style')).toHaveProperty('minWidth', 'none')
  })

  test('does add darkGrey class by default', () => {
    expect(wrapper.find('.darkGrey').exists()).toBe(true)
  })

  test('does add positionAbsolute class by default', () => {
    expect(wrapper.find('.positionAbsolute').exists()).toBe(true)
  })

  describe('when the maxWidth prop is passed', () => {
    beforeEach(() => {
      wrapper.setProps({ maxWidth: '50rem' })
    })

    test('limits the maxWidth of the component', () => {
      expect(wrapper.find('.infoTipWrapper').prop('style')).toHaveProperty('maxWidth', '50rem')
    })
  })

  describe('when the minWidth prop is passed', () => {
    beforeEach(() => {
      wrapper.setProps({ minWidth: '10rem' })
    })

    test('limits the minWidth of the component', () => {
      expect(wrapper.find('.infoTipWrapper').prop('style')).toHaveProperty('minWidth', '10rem')
    })
  })

  describe('when the isCloseIconVisible prop is set to true', () => {
    beforeEach(() => {
      wrapper.setProps({ isCloseIconVisible: true })
    })

    test('renders CloseIcon component', () => {
      expect(wrapper.find('CloseIcon').exists()).toBe(true)
    })

    describe('and the user clicks on CloseIcon', () => {
      beforeEach(() => {
        wrapper.find('CloseIcon').simulate('click')
      })

      test('hides the component', () => {
        expect(wrapper.find('.isHidden').exists()).toBe(true)
      })
    })
  })

  describe('when the isCloseIconVisible prop is set to false', () => {
    beforeEach(() => {
      wrapper.setProps({ isCloseIconVisible: false })
    })

    test('does not render CloseIcon component', () => {
      expect(wrapper.find('CloseIcon').exists()).toBe(false)
    })
  })

  describe('when the color prop is set to lightGrey', () => {
    beforeEach(() => {
      wrapper.setProps({ color: 'lightGrey' })
    })

    test('does add lightGrey class', () => {
      expect(wrapper.find('.lightGrey').exists()).toBe(true)
    })
  })

  describe('when the position prop is set to relative', () => {
    beforeEach(() => {
      wrapper.setProps({ position: 'relative' })
    })

    test('does add positionRelative class', () => {
      expect(wrapper.find('.positionRelative').exists()).toBe(true)
    })
  })
})
