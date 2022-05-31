import React from 'react'

import { Button } from '@gousto-internal/citrus-react'
import { mount } from 'enzyme'
import * as Redux from 'react-redux'

import { marketBundleTracking } from 'actions/orderConfirmation'
import { mockBundlesData } from 'routes/OrderConfirmation/components/config'

import { ProductBundle } from '..'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}))

jest.mock('actions/orderConfirmation', () => ({
  ...jest.requireActual('actions/orderConfirmation'),
  marketBundleTracking: jest.fn(),
}))

describe('<ProductBundle />', () => {
  describe('Render', () => {
    const dispatch = jest.fn()
    jest.spyOn(Redux, 'useDispatch').mockImplementation(() => dispatch)
    marketBundleTracking.mockReturnValue(marketBundleTracking)
    let wrapper

    beforeEach(() => {
      wrapper = mount(<ProductBundle bundleProduct={mockBundlesData[0]} />)
    })

    test('Should render Bundle', () => {
      expect(wrapper.find('img').length).toBe(1)
      expect(wrapper.find('img').prop('src')).toBe(
        'https://s3-eu-west-1.amazonaws.com/s3-gousto-production-media/cms/product-image-landscape/Bundle_DateNight_01.jpg',
      )
      expect(wrapper.find('h6.bundleTitle').length).toBe(1)
      expect(wrapper.find('h6.bundlePrice').length).toBe(1)
      expect(wrapper.find(Button).length).toBe(1)
    })

    test('Should open ProductBundleDetails on clicking bundle image', () => {
      wrapper.find('button.bundleImage').simulate('click')
      expect(dispatch).toBeCalledWith(marketBundleTracking)
    })

    test('Should open ProductBundleDetails on clicking bundle description', () => {
      wrapper.find('button.bundleInfo').simulate('click')
      expect(dispatch).toBeCalledWith(marketBundleTracking)
    })

    test('Should open FakeDoorModal on clicking Add', () => {
      wrapper.find('button.css-e3js9t-Button').simulate('click')
      expect(dispatch).toBeCalledWith(marketBundleTracking)
    })
  })
  describe('When product is missing image', () => {
    test('Should render Bundle without image', () => {
      mockBundlesData[0].bundleImage = null
      const wrapper = mount(<ProductBundle bundleProduct={mockBundlesData[0]} ageVerified />)

      expect(wrapper.find('img').length).toBe(1)
      expect(wrapper.find('img').prop('src')).toBe(null)
      expect(wrapper.find('h6.bundleTitle').length).toBe(1)
      expect(wrapper.find('h6.bundlePrice').length).toBe(1)
      expect(wrapper.find(Button).length).toBe(1)
    })
  })
})
