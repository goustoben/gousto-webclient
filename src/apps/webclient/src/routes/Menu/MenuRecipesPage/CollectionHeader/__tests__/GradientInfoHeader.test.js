import React from 'react'
import { shallow } from 'enzyme'
import { GradientInfoHeader } from '../GradientInfoHeader'

describe('CollectionHeaderWrapper', () => {
  let wrapper
  let headerAttributes
  describe('when headerImage and image are defined', () => {
    beforeEach(() => {
      headerAttributes = {
        color: '#F2F2F2',
        description: 'Header description',
        gradientColor: '#0C3FC2',
        headerImage: [
          {
            url: 'gradientTitleImage-url',
          },
        ],
        image: [
          {
            url: 'gradientImage-url',
          },
        ],
        imageLocation: 'right',
      }

      wrapper = shallow(<GradientInfoHeader headerAttributes={headerAttributes} />)
    })

    test('should render image gradientImage and gradientTitleImage with src', () => {
      expect(wrapper.find('.gradientImage').prop('alt')).toEqual('Campaign banner')
      expect(wrapper.find('.gradientImage').prop('src')).toEqual('gradientImage-url')
      expect(wrapper.find('.gradientTitleImage').prop('src')).toEqual('gradientTitleImage-url')
    })
  })

  describe('when headerImage is not defined', () => {
    beforeEach(() => {
      headerAttributes = {
        color: '#F2F2F2',
        description: 'Header description',
        gradientColor: '#0C3FC2',
        headerImage: [],
        image: [
          {
            url: 'gradientImage-url',
          },
        ],
        imageLocation: 'right',
        altText: 'nice picture',
      }

      wrapper = shallow(<GradientInfoHeader headerAttributes={headerAttributes} />)
    })

    test('should render image gradientImage and gradientTitleImage with src', () => {
      expect(wrapper.find('.gradientImage').prop('alt')).toEqual('nice picture')
      expect(wrapper.find('.gradientTitleImage').exists()).toBe(false)
    })
  })

  describe('when image is not defined', () => {
    beforeEach(() => {
      headerAttributes = {
        color: '#F2F2F2',
        description: 'Header description',
        gradientColor: '#0C3FC2',
        headerImage: [
          {
            url: 'gradientTitleImage-url',
          },
        ],
        image: [],
        imageLocation: 'right',
      }

      wrapper = shallow(<GradientInfoHeader headerAttributes={headerAttributes} />)
    })

    test('should render image gradientImage and gradientTitleImage with src', () => {
      expect(wrapper.find('.gradientImage').prop('alt')).toEqual('Campaign banner')
      expect(wrapper.find('.gradientImage').prop('src')).toEqual(null)
    })
  })
})
