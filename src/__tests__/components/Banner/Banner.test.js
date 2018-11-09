import React from 'react'
import { shallow } from 'enzyme'
import Banner from 'Banner'
import renderer from 'react-test-renderer'

describe('Banner', () => {
  describe('Initial Render', () => {
    test('should return a div', () => {
      const wrapper = shallow(<Banner />)
      expect(wrapper.type()).toEqual('div')
    })

    test('should contain a paragraph', () => {
      const wrapper = shallow(<Banner />)
      expect(wrapper.find('p').length).toEqual(1)
    })

    test('should render a button', () => {
      const wrapper = shallow(<Banner />)
      expect(wrapper.find('Button').length).toEqual(1)
    })

    test('should render text if text prop is set', () => {
      const text = 'Fusce a quam'
      const wrapper = shallow(<Banner text={text} />)
      expect(wrapper.find('p').text()).toContain(text)
    })

    test('should render with given text', () => {
      const text = "A Banner's text"
      const tree = renderer.create(<Banner text={text} />).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('Alternative Render', () => {
    test('should hide banner if hidden is true', () => {
      const wrapper = shallow(<Banner hide />)
      expect(wrapper.find('div').hasClass('hide')).toBe(true)
    })
  })

  describe('Functionality', () => {
    test('should trigger passed onClick function when clicked', () => {
      const clickFunMock = jest.fn()
      const wrapper = shallow(<Banner onClick={clickFunMock} />)
      wrapper.simulate('click')
      expect(clickFunMock).toHaveBeenCalledTimes(1)
    })
  })
})
