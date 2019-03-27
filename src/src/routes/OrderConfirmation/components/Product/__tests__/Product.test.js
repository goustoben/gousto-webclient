import React from 'react'
import Immutable from 'immutable'
import { mount } from 'enzyme'
import { Product } from '..'

describe('Product component', () => {
  let wrapper

  describe('render', () => {
    beforeEach(() => {
      const product = {
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
      }
      const basket = Immutable.fromJS({
        products: {
          "0009468c-33e9-11e7-b485-02859a19531d": 1,
        }
      })

      wrapper = mount(<Product product={product} basket={basket} ageVerified />)
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

    test('should render add button', () => {
      expect(wrapper.find('Button').length).toBe(1)
    })
  })

  describe('add/remove product', () => {
    beforeEach(() => {
      const product = {
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
        },
      }
      const basket = Immutable.fromJS({
        products: {}
      })

      wrapper = mount(<Product product={product} basket={basket} ageVerified limitReached={false} basketProductAdd={jest.fn()} basketProductRemove={jest.fn()} />)
    })
    test('should change the qty of the product', async() => {
      wrapper.setProps({
        basket: Immutable.fromJS({
          products: {
            "0009468c-33e9-11e7-b485-02859a19531d": 1,
          }
        })
      })

      expect(wrapper.text()).toContain('-1+')
      wrapper.setProps({
        basket: Immutable.fromJS({
          products: {}
        })
      })
      expect(wrapper.text()).toContain('Add')
    })
  })
})
