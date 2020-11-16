import React from 'react'
import { shallow } from 'enzyme'
import Banner from '../Banner'

describe('Banner', () => {
  let wrapper
  const props = {
    hide: false,
    onClick: jest.fn(),
    text: 'discount text',
    linkText: 'button',
  }

  beforeEach(() => {
    wrapper = shallow(<Banner {...props} />)
  })

  test('should render correctly', () => {
    expect(wrapper.find('Banner')).toBeDefined()
    expect(wrapper.find('Button')).toBeDefined()
  })

  describe('when hide prop is false', () => {
    test('then Banner should not have hide class', () => {
      expect(wrapper.find('.container').hasClass('hide')).toBeFalsy()
    })
  })

  describe('when hide prop is true', () => {
    beforeEach(() => {
      wrapper.setProps({ hide: true })
    })

    test('then Banner should not have hide class', () => {
      expect(wrapper.find('.container').hasClass('hide')).toBeTruthy()
    })
  })

  describe('when button is clicked', () => {
    beforeEach(() => {
      wrapper.find('.container').simulate('click')
    })

    test('then should call onClick', () => {
      expect(props.onClick).toBeCalled()
    })
  })
})
