import React from 'react'
import { shallow } from 'enzyme'

import FineDineInBanner from 'routes/Menu/FineDineInBanner'

describe('<FineDineInBanner />', () => {
  let wrapper

  test('should render by default', () => {
    wrapper = shallow(<FineDineInBanner />)

    expect(wrapper.find('div').length).toBeGreaterThanOrEqual(1)
  })

  test('should hide when hide prop is set to true', () => {
    wrapper = shallow(<FineDineInBanner hide />)

    expect(wrapper.find('div').length).toEqual(0)
  })
})
