import React from 'react'
import { shallow } from 'enzyme'
import { CollectionHeaderWrapper } from '../ CollectionHeaderWrapper'

describe('CollectionHeaderWrapper', () => {
  let collectionsHeaders
  let wrapper
  describe('when collectionsHeaders is null', () => {
    beforeEach(() => {
      collectionsHeaders = null
      wrapper = shallow(<CollectionHeaderWrapper collectionsHeaders={collectionsHeaders} />)
    })

    test('should return null', () => {
      expect(wrapper.type()).toEqual(null)
    })
  })

  describe('when collectionsHeaders is not defined type', () => {
    beforeEach(() => {
      collectionsHeaders = {
        id: 'header-id',
        type: 'unknown'
      }
      wrapper = shallow(<CollectionHeaderWrapper collectionsHeaders={collectionsHeaders} />)
    })

    test('should return null', () => {
      expect(wrapper.type()).toEqual(null)
    })
  })

  describe('when collectionsHeaders is gradient-info-header', () => {
    beforeEach(() => {
      collectionsHeaders = {
        id: 'header-id',
        type: 'gradient-info-header',
        attributes: {}
      }
      wrapper = shallow(<CollectionHeaderWrapper collectionsHeaders={collectionsHeaders} />)
    })

    test('should return null', () => {
      expect(wrapper.find('GradientInfoHeader')).toHaveLength(1)
    })
  })
})
