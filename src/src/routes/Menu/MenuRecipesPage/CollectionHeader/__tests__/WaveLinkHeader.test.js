import React from 'react'
import { shallow } from 'enzyme'
import { WaveLinkHeader } from '../WaveLinkHeader'

describe('WaveLinkHeader', () => {
  let wrapper
  let headerAttributes
  const changeCollectionById = jest.fn()
  describe('when headerImage is defined', () => {
    beforeEach(() => {
      headerAttributes = {
        color: '#F2F2F2',
        description: 'Header description',
        waveColor: '#FF0032',
        backgroundColor: '#0C3FC2',
        headerImage: [{
          url: 'waveLinkTitleImage-url'
        }],
        link: {
          collectionSlug: 'healthy',
          collectionId: '123',
        }
      }

      wrapper = shallow(<WaveLinkHeader headerAttributes={headerAttributes} changeCollectionById={changeCollectionById} />)
    })

    test('should render image waveLinkTitleImage with src', () => {
      expect(wrapper.find('.waveLinkTitleImage').prop('src')).toEqual('waveLinkTitleImage-url')
    })

    test('should call changeCollectionById at click on header', () => {
      wrapper.find('.waveLinkHeader').simulate('click')
      expect(changeCollectionById).toHaveBeenCalled()
    })
  })

  describe('when headerImage is not defined', () => {
    beforeEach(() => {
      headerAttributes = {
        color: '#F2F2F2',
        description: 'Header description',
        waveColor: '#FF0032',
        backgroundColor: '#0C3FC2',
        headerImage: [],
        link: {
          collectionSlug: 'healthy',
          collectionId: '123',
        }
      }

      wrapper = shallow(<WaveLinkHeader headerAttributes={headerAttributes} changeCollectionById={() => {}} />)
    })

    test('should not render image waveLinkTitleImage with src', () => {
      expect(wrapper.find('.waveLinkTitleImage').exists()).toBe(false)
    })
  })
})
