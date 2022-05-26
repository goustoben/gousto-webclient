import React from 'react'

import { shallow } from 'enzyme'
import Immutable from 'immutable'

import SlickCarousel from 'components/Carousel'

import { DetailImage as Image } from '../DetailImage'
import Carousel from './Carousel'
import { ContentMask } from './ContentMask'

describe('<Carousel />', () => {
  let wrapper

  test('should render an <Image /> by default', () => {
    wrapper = shallow(<Carousel />)

    expect(wrapper.find('div').length).toBe(0)
  })

  describe('images prop', () => {
    let images

    test('should render a <SlickCarousel /> when given a image list', () => {
      images = Immutable.fromJS([{ urls: [] }])
      wrapper = shallow(<Carousel images={images} />)

      expect(wrapper.find(SlickCarousel).length).toEqual(1)
      expect(wrapper.find(ContentMask).length).toBeGreaterThanOrEqual(1)
    })

    test('should render an <Image /> for every image object', () => {
      images = Immutable.fromJS([{ urls: [] }, { urls: [] }, { urls: [] }])
      wrapper = shallow(<Carousel images={images} />)

      expect(wrapper.find(Image).length).toEqual(images.size)
    })

    test('should add lazy false to <Image /> for every image object', () => {
      images = Immutable.fromJS([{ urls: [] }, { urls: [] }, { urls: [] }])
      wrapper = shallow(<Carousel images={images} />)
      wrapper.find(Image).forEach((image) => {
        expect(image.prop('lazy')).toBe(false)
      })
    })
  })
})
