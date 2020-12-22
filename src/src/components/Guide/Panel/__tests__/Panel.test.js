import React from 'react'
import { shallow } from 'enzyme'
import { Panel } from '../Panel'

describe('Given Panel component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Panel />)
  })

  test('should renders correctly', () => {
    expect(wrapper.find(Panel)).toBeDefined()
    expect(wrapper.find('.imageContainer img').exists()).toBeTruthy()
    expect(wrapper.find('Svg').exists()).toBeFalsy()
  })

  describe('when graphicType is svg', () => {
    beforeEach(() => {
      wrapper.setProps({
        graphicType: 'svg'
      })
    })

    test('then should render Svg component', () => {
      expect(wrapper.find('.imageContainer img').exists()).toBeFalsy()
      expect(wrapper.find('Svg').exists()).toBeTruthy()
    })
  })
})
