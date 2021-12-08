import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
import { backgroundColorsAvailable } from '../VerticalStagesItem.logic'
import { VerticalStagesItem } from '../index'
import { headingAvailableTypes } from '../../Heading/Heading.logic'

describe('VerticalStagesItem', () => {
  const ITEM_TITLE = 'Item title'
  const EXTRA_CLASSNAME = 'extraClass'

  test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <VerticalStagesItem
        title={ITEM_TITLE}
        headingType={headingAvailableTypes[0]}
        hasFullWidth={false}
        isLastStep={false}
        stepNumber={1}
      />, div,
    )
  })

  let wrapper
  beforeEach(() => {
    wrapper = mount(<VerticalStagesItem
      title={ITEM_TITLE}
      headingType={headingAvailableTypes[0]}
      hasFullWidth={false}
      isLastStep={false}
      stepNumber={1}
    />)
  })

  test('does not have the extra class on the verticalStagesItem', () => {
    expect(wrapper.find('.verticalStagesItem').hasClass(EXTRA_CLASSNAME)).toBe(false)
  })

  describe('when a title prop is passed', () => {
    beforeEach(() => {
      wrapper.setProps({ title: ITEM_TITLE })
    })

    test('renders a title', () => {
      expect(wrapper.html()).toContain(ITEM_TITLE)
    })
  })

  describe('when the children prop is passed', () => {
    const CHILDREN = 'I am a child!'
    beforeEach(() => {
      wrapper = mount(
        <VerticalStagesItem
          title={ITEM_TITLE}
          headingType={headingAvailableTypes[0]}
          hasFullWidth={false}
          isLastStep={false}
          stepNumber={1}
        >
          {CHILDREN}
        </VerticalStagesItem>,
      )
    })

    test('renders the children inside .contentDefaultWidth', () => {
      expect(wrapper.find('.contentDefaultWidth').html()).toContain(CHILDREN)
    })
  })

  describe('when a headingType prop is passed', () => {
    test('passes the prop to the Heading component', () => {
      headingAvailableTypes.forEach((headingType) => {
        wrapper.setProps({ headingType })
        expect(wrapper.find('Heading').prop('type')).toBe(headingType)
      })
    })
  })

  describe('when the isCompleted prop is passed', () => {
    describe('and it has a value of false', () => {
      beforeEach(() => {
        wrapper.setProps({ isCompleted: false })
      })

      test('does not have the isCompleted class on the wrapper', () => {
        expect(wrapper.find('.wrapper').hasClass('isCompleted')).toBe(false)
      })
    })

    describe('and it has a value of true', () => {
      beforeEach(() => {
        wrapper.setProps({ isCompleted: true })
      })

      test('has the isCompleted class on the wrapper', () => {
        expect(wrapper.find('.wrapper').hasClass('isCompleted')).toBe(true)
      })
    })
  })

  describe('when the backgroundColor prop is passed', () => {
    test('class corresponding to backgroundColor is set', () => {
      backgroundColorsAvailable.forEach((backgroundColor) => {
        wrapper.setProps({ backgroundColor })

        expect(wrapper.find('.wrapper')
          .hasClass(`wrapper--${backgroundColor}`)).toBe(true)
      })
    })
  })

  describe('when the stepNumber prop is passed', () => {
    const STEP_NUMBER = 8

    beforeEach(() => {
      wrapper.setProps({ stepNumber: STEP_NUMBER })
    })

    describe('and the step is the first one', () => {
      beforeEach(() => {
        wrapper.setProps({ stepNumber: 1 })
      })

      test('the stepNumberWrapper has the class firstStep', () => {
        expect(wrapper.find('.stepNumberWrapper').hasClass('firstStep'))
          .toBe(true)
      })
    })

    describe('and the step is not the first one', () => {
      test('the stepNumberWrapper does not have the class firstStep', () => {
        expect(wrapper.find('.stepNumberWrapper').hasClass('firstStep'))
          .toBe(false)
      })
    })

    describe('and the step is not completed', () => {
      beforeEach(() => {
        wrapper.setProps({ isCompleted: false })
      })

      test('renders the step number', () => {
        expect(wrapper.find('.stepNumber').html()).toContain(STEP_NUMBER)
      })
    })

    describe('and the step is completed', () => {
      beforeEach(() => {
        wrapper.setProps({ isCompleted: true })
      })

      test('renders a tick icon', () => {
        expect(wrapper.find('.stepNumber').find('.tickIcon').exists()).toBe(true)
      })
    })
  })

  describe('when the isLastStep prop is passed', () => {
    describe('and it is false', () => {
      beforeEach(() => {
        wrapper.setProps({ isLastStep: false })
      })

      test('the stepNumberWrapper does not have the class lastStep', () => {
        expect(wrapper.find('.stepNumberWrapper').hasClass('lastStep'))
          .toBe(false)
      })
    })

    describe('and it is true', () => {
      beforeEach(() => {
        wrapper.setProps({ isLastStep: true })
      })

      test('the stepNumberWrapper has the class lastStep', () => {
        expect(wrapper.find('.stepNumberWrapper').hasClass('lastStep'))
          .toBe(true)
      })
    })
  })

  describe('when the hasFullWidth prop is set', () => {
    describe('and it is false', () => {
      beforeEach(() => {
        wrapper.setProps({ hasFullWidth: false })
      })

      test('contentFullWidth is not rendered', () => {
        expect(wrapper.find('.contentFullWidth').exists()).toBe(false)
      })

      test('contentDefaultWidth is still rendered', () => {
        expect(wrapper.find('.contentDefaultWidth').exists()).toBe(true)
      })
    })

    describe('and it is true', () => {
      beforeEach(() => {
        wrapper.setProps({ hasFullWidth: true })
      })

      test('contentFullWidth is rendered', () => {
        expect(wrapper.find('.contentFullWidth').exists()).toBe(true)
      })

      test('contentDefaultWidth is not rendered', () => {
        expect(wrapper.find('.contentDefaultWidth').exists()).toBe(false)
      })
    })
  })

  describe('when the extraClass prop is passed', () => {
    beforeEach(() => {
      wrapper.setProps({ extraClass: EXTRA_CLASSNAME })
    })

    test('adds the class to the verticalStagesItem', () => {
      expect(wrapper.find('.verticalStagesItem').hasClass(EXTRA_CLASSNAME)).toBe(true)
    })
  })
})
