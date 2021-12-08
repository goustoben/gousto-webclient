import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
import { ProgressBar } from '..'
import { PROGRESS_BAR_THEME } from '../ProgressBar.logic'

describe('<ProgressBar />', () => {
  const CONTAINER_CLASS = '.container'
  const PROGRESS_BAR_CLASS = '.progressBar'

  const PERCENTAGE = 50
  let wrapper

  beforeEach(() => {
    wrapper = mount(<ProgressBar percentage={PERCENTAGE} />)
  })

  test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<ProgressBar percentage={PERCENTAGE} />, div)
  })

  describe('when mounted', () => {
    test('should render <ProgressBarPresentation />', () => {
      expect(wrapper.find('ProgressBarPresentation')).toHaveLength(1)
    })

    test('should render a container with an element inside', () => {
      expect(wrapper.find(CONTAINER_CLASS).find(PROGRESS_BAR_CLASS)).toHaveLength(1)
    })

    test('should set the width as a percentage', () => {
      expect(wrapper.find(PROGRESS_BAR_CLASS).prop('style').width).toBe(`${PERCENTAGE}%`)
    })
  })

  describe('when the percentage passed is out of range', () => {
    describe('and the percentage passed is smaller than 0', () => {
      beforeEach(() => {
        wrapper.setProps({ percentage: -10 })
      })

      test('should set the width of the Progress Bar to 0', () => {
        expect(wrapper.find(PROGRESS_BAR_CLASS).prop('style').width).toBe('0%')
      })
    })

    describe('and the percentage passed is greater than 100', () => {
      beforeEach(() => {
        wrapper.setProps({ percentage: 110 })
      })

      test('should set the width of the Progress Bar to 100', () => {
        expect(wrapper.find(PROGRESS_BAR_CLASS).prop('style').width).toBe('100%')
      })
    })
  })

  describe('when no theme prop is passed', () => {
    test('should add the default theme class', () => {
      expect(wrapper.find(PROGRESS_BAR_CLASS).hasClass('solid')).toBe(true)
    })
  })

  describe('when a theme prop is passed', () => {
    describe('and the theme is set to transition-1', () => {
      beforeEach(() => {
        wrapper.setProps({ theme: 'transition-1' })
      })

      test('should remove the default theme class', () => {
        expect(wrapper.find(PROGRESS_BAR_CLASS).hasClass('solid')).toBe(false)
      })

      test('should add the transition-1 theme class', () => {
        expect(wrapper.find(PROGRESS_BAR_CLASS).hasClass('transition-1')).toBe(true)
      })

      const themeStops = PROGRESS_BAR_THEME['transition-1']
      themeStops.forEach((stop, index) => {
        beforeEach(() => {
          wrapper.setProps({ percentage: stop })
        })

        test(`should add the class transition-1-stop-${index} after the theme stop ${stop}`, () => {
          expect(wrapper.find(PROGRESS_BAR_CLASS).hasClass(`transition-1-stop-${index}`)).toBe(true)
        })
      })
    })
  })

  describe('when the accessibility description is passed', () => {
    const a11yDescription = 'Progress of menu loaded'

    beforeEach(() => {
      wrapper.setProps({ a11yDescription })
    })

    test('should add it as a value to aria-valuetext', () => {
      expect(wrapper.find(CONTAINER_CLASS).prop('aria-valuetext')).toBe(a11yDescription)
    })
  })
})
