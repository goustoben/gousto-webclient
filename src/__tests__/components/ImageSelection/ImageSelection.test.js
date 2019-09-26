import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable' /* eslint-disable new-cap */
import ImageSelection from 'ImageSelection'
import Image from 'Image'

describe('ImageSelection', () => {
  const TITLE_1 = 'Title 1'
  const content = [
    Immutable.fromJS({
      images: {
        200: { src: '1', width: 200 },
        400: { src: '2', width: 400 },
      },
      title: TITLE_1,
      id: 'id-1',
    }),
    Immutable.fromJS({
      images: {
        200: { src: '3', width: 200 },
        400: { src: '4', width: 400 },
      },
      title: 'Title 2',
      id: 'id-2',
    }),
  ]

  const onImageClickMock = jest.fn()
  let wrapper

  beforeEach(() => {
    wrapper = shallow(
      <ImageSelection content={content} onImageClick={onImageClickMock} />
    )
  })

  test('displays an Image for each content image', () => {
    expect(wrapper.find(Image)).toHaveLength(content.length)
  })

  test('displays image titles', () => {
    expect(wrapper.find('p').at(0).text()).toBe(TITLE_1)
  })

  describe('interating with the list of content', () => {
    afterEach(() => {
      onImageClickMock.mockClear()
    })

    describe('clicking an image', () => {
      beforeEach(() => {
        wrapper.find('button').at(0).simulate('click')
      })

      test('calls the onClick prop', () => {
        expect(onImageClickMock).toHaveBeenCalledTimes(1)
      })
    })

    describe('clicking an image title', () => {
      beforeEach(() => {
        wrapper.find('p').at(0).simulate('click')
      })

      test('calls the onClick prop', () => {
        expect(onImageClickMock).toHaveBeenCalledTimes(1)
      })
    })
  })
})
