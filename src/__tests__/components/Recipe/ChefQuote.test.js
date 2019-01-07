import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'

import ChefQuote from 'Recipe/ChefQuote'

describe('<ChefQuote />', () => {
  let wrapper
  const quote = 'This is a test quote'
  beforeEach(() => {
    wrapper = shallow(<ChefQuote quote={quote} />)
  })

  describe('rendering', () => {
    test('should return a <div>', () => {
      expect(wrapper.type()).toEqual('div')
    })

    test('should have two div children', () => {
      wrapper.children().forEach(node => {
        expect(node.type()).toEqual('div')
      })
      expect(wrapper.children().length).toEqual(2)
    })

    test('should display the given quote', () => {
      expect(wrapper.find('blockquote p').text()).toEqual(quote)
    })
  })

  describe('with chef prop containing a headshot image', () => {
    const chef = Immutable.fromJS({
      media: {
        images: [
          {
            type: 'headshot-image',
            urls: [{ src: 'image-headshot.jpg' }],
          },
        ],
      },
      name: 'Judy King',
    })

    beforeEach(() => {
      wrapper = shallow(<ChefQuote quote={quote} chef={chef} />)
    })

    test("should show the headshot image as the primary image", () => {
      expect(wrapper.find('span').length).toEqual(0)
      expect(wrapper.find('img').length).toEqual(1)
      expect(
        wrapper
          .find('img')
          .at(0)
          .prop('src'),
      ).toEqual('image-headshot.jpg')
    })
  })

  describe('with chef prop containing both headshot and signature images', () => {
    const chef = Immutable.fromJS({
      media: {
        images: [
          {
            type: 'headshot-image',
            urls: [{ src: 'image-headshot.jpg' }],
          },
          {
            type: 'signature-image',
            urls: [{ src: 'image-signature.jpg' }],
          },
        ],
      },
      name: 'Judy King',
    })

    beforeEach(() => {
      wrapper = shallow(<ChefQuote quote={quote} chef={chef} />)
    })

    test("should show the headshot image as the primary image", () => {
      expect(wrapper.find('span').length).toEqual(0)
      expect(wrapper.find('img').length).toEqual(2)
      expect(
        wrapper
          .find('img')
          .at(0)
          .prop('src'),
      ).toEqual('image-headshot.jpg')
    })

    test("should show the signature image as the secondary image", () => {
      expect(wrapper.find('span').length).toEqual(0)
      expect(wrapper.find('img').length).toEqual(2)
      expect(
        wrapper
          .find('img')
          .at(1)
          .prop('src'),
      ).toEqual('image-signature.jpg')
    })
  })
})
