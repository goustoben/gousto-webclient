import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
import { CloseIcon } from '..'

describe('<CloseIcon />', () => {
  const closeIconProps = {
    onClick: jest.fn(),
  }

  test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <CloseIcon {...closeIconProps} />,
      div,
    )
  })

  describe('when mounted', () => {
    let wrapper

    beforeEach(() => {
      wrapper = mount(<CloseIcon {...closeIconProps} />)
    })

    describe('the layout', () => {
      test('should render <CloseIconPresentation />', () => {
        expect(wrapper.find('CloseIconPresentation')).toHaveLength(1)
      })

      test('should render a single button', () => {
        expect(wrapper.find('button')).toHaveLength(1)
      })

      describe('when no position prop is passed', () => {
        test('should use the default class', () => {
          expect(wrapper.find('button').prop('className')).toBe('button')
        })
      })

      describe('when a position prop is passed', () => {
        describe('and the position prop is valid', () => {
          beforeEach(() => {
            wrapper.setProps({ position: 'top-right' })
          })

          test('should use the correct class', () => {
            expect(wrapper.find('button').hasClass('button top-right'))
          })
        })
      })
    })

    describe('the functionality', () => {
      test('calls the onClick function when clicked', () => {
        wrapper.find('CloseIconPresentation').props().onClick()
        expect(closeIconProps.onClick).toHaveBeenCalledTimes(1)
      })
    })
  })
})
