import React from 'react'

import { shallow } from 'enzyme'

import { Waves } from './Waves'

describe('Waves', () => {
  let wrapper
  describe('when send fillColor', () => {
    beforeEach(() => {
      wrapper = shallow(<Waves fillColor="red" />)
    })
    test('should render paths with style fill matching the fill collor', () => {
      wrapper.find('path').forEach((path) => {
        expect(path.prop('style')).toEqual({ fill: 'red' })
      })
    })
  })
})
