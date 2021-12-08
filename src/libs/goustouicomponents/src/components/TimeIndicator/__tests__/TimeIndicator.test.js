import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
import { TimeIndicator } from '../index'

describe('<TimeIndicator />', () => {
  let wrapper
  const time = 30
  const circumference = 2 * Math.PI * 14

  beforeEach(() => {
    wrapper = mount(<TimeIndicator time={time} />)
  })

  test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<TimeIndicator time={time} />, div)
  })

  test('should contain 2 circles and 1 text', () => {
    expect(wrapper.find('circle')).toHaveLength(2)
    expect(wrapper.find('text')).toHaveLength(1)
  })

  describe('when time is less than 60 min', () => {
    test('then strokeDasharray should be equal to 43.982297150257104', () => {
      expect(wrapper.find('.circularChartCircle').prop('strokeDasharray')).toBe(`43.982297150257104, ${circumference}`)
    })
  })

  describe('when time is greater than 60 min', () => {
    beforeEach(() => {
      wrapper.setProps({ time: 150 })
    })

    test('then strokeDasharray should be equal to circumference', () => {
      expect(wrapper.find('.circularChartCircle').prop('strokeDasharray')).toBe(`${circumference}, ${circumference}`)
    })
  })
})
