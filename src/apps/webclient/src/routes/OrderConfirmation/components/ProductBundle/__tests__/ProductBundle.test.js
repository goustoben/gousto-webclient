import React from 'react'

import { Button } from '@gousto-internal/citrus-react'
import { mount } from 'enzyme'

import { mockBundlesData } from 'routes/OrderConfirmation/components/config'

import { ProductBundle } from '..'

describe('<ProductBundle />', () => {
  describe('Render', () => {
    test('Should render Bundle', () => {
      const wrapper = mount(<ProductBundle bundleProduct={mockBundlesData[0]} />)

      expect(wrapper.find('img').length).toBe(1)
      expect(wrapper.find('img').prop('src')).toBe(
        'https://s3-eu-west-1.amazonaws.com/s3-gousto-production-media/cms/product-image-landscape/Bundle_DateNight_01.jpg',
      )
      expect(wrapper.find('h6.bundleTitle').length).toBe(1)
      expect(wrapper.find('h6.bundlePrice').length).toBe(1)
      expect(wrapper.find(Button).length).toBe(1)
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
})
