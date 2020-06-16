import React from 'react'
import { shallow } from 'enzyme'
import { SimpleLinkHeader } from '../SimpleLinkHeader'

describe('SimpleLinkHeader', () => {
  let wrapper
  let headerAttributes
  const onClick = jest.fn()
  describe('when headerImage is defined', () => {
    beforeEach(() => {
      headerAttributes = {
        color: '#F2F2F2',
        description: 'Header description',
        waveColor: '#FF0032',
        backgroundColor: '#0C3FC2',
        headerImage: [{
          url: 'simpleLinkTitleImage-url'
        }],
        link: {
          collectionSlug: 'healthy',
          collectionId: '123',
        }
      }

      wrapper = shallow(<SimpleLinkHeader headerAttributes={headerAttributes} onClick={onClick} />)
    })

    test('should render image simpleLinkTitleImage with src', () => {
      expect(wrapper.find('.simpleLinkTitleImage').prop('src')).toEqual('simpleLinkTitleImage-url')
    })

    test('should call onClick at click on header', () => {
      wrapper.find('.simpleLinkHeader').simulate('click')
      expect(onClick).toHaveBeenCalled()
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

      wrapper = shallow(<SimpleLinkHeader headerAttributes={headerAttributes} changeCollectionById={() => {}} />)
    })

    test('should not render image simpleLinkTitleImage with src', () => {
      expect(wrapper.find('.simpleLinkTitleImage').exists()).toBe(false)
    })
  })
})
