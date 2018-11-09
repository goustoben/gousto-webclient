import React from 'react'
import { shallow } from 'enzyme'
import Carousel from 'Carousel'
import Slider from 'react-slick'

import sinon from 'sinon'

describe('Carousel', () => {
  test('should return div', () => {
    const wrapper = shallow(<Carousel />)
    expect(wrapper.type()).toEqual('div')
  })

  test('should display one Slider', () => {
    const wrapper = shallow(<Carousel />)
    expect(wrapper.find(Slider).length).toEqual(1)
  })

  test('should pass on any props to Slider', () => {
    const wrapper = shallow(
			<Carousel prop1={'props1value'} prop2={false} prop3 />,
    )
    const slider = wrapper.find(Slider)
    expect(slider.prop('prop1')).toEqual('props1value')
    expect(slider.prop('prop2')).toEqual(false)
    expect(slider.prop('prop3')).toEqual(true)
  })

  test('should pass children to Slider', () => {
    const node = <div>child content</div>
    const wrapper = shallow(<Carousel>{node}</Carousel>)
    expect(wrapper.contains(node)).toBe(true)
  })
})
