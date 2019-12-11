import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'

import Surcharge from 'Recipe/Buttons/Surcharge'

describe('<Surcharge />', () => {
  let wrapper
  let surcharge

  test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Surcharge surcharge={2.99} />, div)
  })

  describe('when the surcharge provided is zero', () => {
    test('should render nothing', () => {
      surcharge = 0
      wrapper = shallow(<Surcharge surcharge={surcharge} />)

      expect(wrapper.find('div')).toHaveLength(0)
    })
  })

  describe('when the surcharge prop is greater than zero', () => {
    test('should render the surcharge per portion to the nearest 1p', () => {
      wrapper = shallow(<Surcharge surcharge={1.992342} />)

      expect(wrapper.text()).toEqual('+£1.99 per serving')
    })
  })
})
