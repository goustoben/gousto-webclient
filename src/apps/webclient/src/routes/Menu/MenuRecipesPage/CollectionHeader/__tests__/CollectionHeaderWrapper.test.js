import React from 'react'
import { shallow } from 'enzyme'
import * as reactRedux from 'react-redux'
import { CollectionHeaderWrapper } from '../CollectionHeaderWrapper'
import { WaveLinkHeaderContainer } from '../LinkHeaderContainer'

jest.mock('utils/configFromWindow', () => ({
  getClientEnvironment: () => 'local',
  getClientDomain: () => 'gousto.local',
}))

describe('CollectionHeaderWrapper', () => {
  let wrapper
  describe('when collectionsHeaders is null', () => {
    beforeEach(() => {
      jest.spyOn(reactRedux, 'useSelector').mockImplementation(() => null)
      wrapper = shallow(<CollectionHeaderWrapper />)
    })

    test('should return null', () => {
      expect(wrapper.type()).toEqual(null)
    })
  })

  describe('when collectionsHeaders is not defined type', () => {
    beforeEach(() => {
      jest.spyOn(reactRedux, 'useSelector').mockImplementation(() => ({
        id: 'header-id',
        type: 'unknown',
      }))
      wrapper = shallow(<CollectionHeaderWrapper />)
    })

    test('should return null', () => {
      expect(wrapper.type()).toEqual(null)
    })
  })

  describe('when collectionsHeaders is gradient-info-header', () => {
    beforeEach(() => {
      jest.spyOn(reactRedux, 'useSelector').mockImplementation(() => ({
        id: 'header-id',
        type: 'gradient-info-header',
        attributes: {}
      }))
      wrapper = shallow(<CollectionHeaderWrapper />)
    })

    test('should return GradientInfoHeader', () => {
      expect(wrapper.find('GradientInfoHeader')).toHaveLength(1)
    })
  })

  describe('when collectionsHeaders is wave-link-header', () => {
    beforeEach(() => {
      jest.spyOn(reactRedux, 'useSelector').mockImplementation(() => ({
        id: 'header-id',
        type: 'wave-link-header',
        attributes: {}
      }))
      wrapper = shallow(<CollectionHeaderWrapper />)
    })

    test('should return WaveLinkHeaderContainer', () => {
      expect(wrapper.find(WaveLinkHeaderContainer)).toHaveLength(1)
    })
  })
})
