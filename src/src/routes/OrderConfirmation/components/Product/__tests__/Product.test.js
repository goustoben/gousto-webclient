import React from 'react'
import { mount } from 'enzyme'
import Immutable from 'immutable'
import { Product } from '..'

describe('Product component', () => {
  let wrapper

  describe('render', () => {
    beforeEach(() => {
      const propsProduct = Immutable.fromJS({
        "id": "0009468c-33e9-11e7-b485-02859a19531d",
        "title": "Borsao Macabeo",
        "description": "A flavoursome Summer wine made from the indigenous Macabeo grape in northern Spain. A balanced, modern white with flavours of ripe peach, zesty lemon and nutty undertones, it leaves the palate with a clean and fruity finish.",
        "listPrice": "6.95",
        "isForSale": true,
        "ageRestricted": true,
        "boxLimit": 2,
        "images": {
          "400": {
            "src": "https://production-media.gousto.co.uk/cms/product-image-landscape/YAddOns-WhiteWines-Borsao_013244-x400.jpg",
            "url": "https://production-media.gousto.co.uk/cms/product-image-landscape/YAddOns-WhiteWines-Borsao_013244-x400.jpg",
            "width": 400
          },
        }
      })

      wrapper = mount(<Product {...propsProduct} />)
    })
    
    test('should render image of product', () => {
      expect(wrapper.find('img').length).toBe(1)
    })

    test('should render title of product', () => {
      expect(wrapper.find('div.productTitle').length).toBe(1)
    })

    test('should render price of product', () => {
      expect(wrapper.find('p.productPrice').length).toBe(1)
    })
  })
})
