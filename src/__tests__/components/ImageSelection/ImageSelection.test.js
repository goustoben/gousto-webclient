import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable' /* eslint-disable new-cap */
import ImageSelection from 'ImageSelection'
import Image from 'Image'

describe('ImageSelection', () => {
  const wrapper = shallow(<ImageSelection />)

  test('should return div', () => {
    expect(wrapper.type()).toEqual('div')
  })
})

describe('ImageSelection images', () => {
  const content = Immutable.fromJS([
    {
      images: {
        200: { src: '1', width: 200 },
        400: { src: '2', width: 400 },
      },
      title: 'Title 1',
    },
    {
      images: {
        200: { src: '3', width: 200 },
        400: { src: '4', width: 400 },
      },
      title: 'Title 2',
    },
  ])

  const wrapper = shallow(<ImageSelection content={content} />)

  test('should display an Image for each content image prop', () => {
    expect(wrapper.find(Image).length).toEqual(2)
  })

  test('should display a p with item title', () => {
    expect(wrapper.find('p').length).toEqual(2)
  })
})
