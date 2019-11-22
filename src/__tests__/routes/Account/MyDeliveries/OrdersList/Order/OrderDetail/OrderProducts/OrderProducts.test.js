import React from 'react'
import Immutable from 'immutable'
import { shallow } from 'enzyme'
import { Button } from 'goustouicomponents'
import Link from 'Link'
import OrderProducts from 'routes/Account/MyDeliveries/OrdersList/Order/OrderDetail/OrderProducts'
import ProductImage from 'routes/Account/AccountComponents/ProductImage'

import marketPhotoSrc from 'media/photos/market-place-cover-photo.jpg'

describe('OrderProducts', () => {
  let wrapper
  const productsSample = Immutable.fromJS([
    { id: '1', title: 'title 1', quantity: 4, unitPrice: 14.323, image: '' },
    { id: '2', title: 'title 2', quantity: 5, unitPrice: 15.0, image: '' },
    { id: '3', title: 'title 3', quantity: 6, unitPrice: 20, image: 'test.jpg' },
  ])

  describe('rendering', () => {
    beforeEach(() => {
      wrapper = shallow(
        <OrderProducts
          orderId={'777'}
          products={productsSample}
          periodId={1}
          store={{}}
        />,
        {
          context: {
            store: {
              subscribe: jest.fn(),
              dispatch: jest.fn(),
            }
          }
        }
      )
    })

    test('should render a <div>', () => {
      expect(wrapper.type()).toBe('div')
    })

    test('should render as many <ProductImage> as products are passed', () => {
      expect(wrapper.find(ProductImage)).toHaveLength(3)
    })

    test('should render the titles of the products', () => {
      expect(wrapper.text()).toContain('title 1')
      expect(wrapper.text()).toContain('title 2')
      expect(wrapper.text()).toContain('title 3')
    })

    test('should render the quantity of products in "x howMany" format', () => {
      expect(wrapper.text()).toContain('x 4')
      expect(wrapper.text()).toContain('x 5')
      expect(wrapper.text()).toContain('x 6')
    })

    test('should render the price of the articles with 2 decimals', () => {
      expect(wrapper.text()).toContain('£14.32')
      expect(wrapper.text()).toContain('£15.00')
      expect(wrapper.text()).toContain('£20.00')
    })

    test('should render the "Edit Items" link', () => {
      const editItemsLink = wrapper.find(Link)
      expect(editItemsLink).toHaveLength(1)
      expect(editItemsLink.children().text()).toBe('Edit Items')
    })

    describe('images', () => {
      test('when no source is passed, should render a placeholding image', () => {
        expect(wrapper.find('ProductImage').first().prop('src')).toEqual('recipe-placeholder.png')
      })

      test('when a source is passed, should render an image', () => {
        expect(wrapper.find('ProductImage').last().prop('src')).toEqual('test.jpg')
      })
    })

    describe('when no products are passed',() => {
      beforeEach(() => {
        wrapper = shallow(<OrderProducts />, {
          context: {
            store: {
              subscribe: jest.fn(),
              dispatch: jest.fn(),
            }
          }
        })
      })

      test('should render no <ProductImage>', () => {
        expect(wrapper.find(ProductImage)).toHaveLength(0)
      })

      test('should render the market promo content', () => {
        expect(wrapper.find('.marketPromoText').text()).toBe('Add desserts, drinks, snacks and more to your next box at no extra charge.')
        expect(wrapper.find('img.marketImageRight').prop('src')).toBe(marketPhotoSrc)
        expect(wrapper.find('img.marketImageFull').prop('src')).toBe(marketPhotoSrc)
        expect(wrapper.find(Button).children().text()).toBe('Go to Gousto Market')
      })
    })
  })
})
