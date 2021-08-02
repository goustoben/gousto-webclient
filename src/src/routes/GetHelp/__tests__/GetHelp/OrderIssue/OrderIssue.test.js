import React from 'react'
import { mount } from 'enzyme'

import { OrderIssue } from 'routes/GetHelp/OrderIssue/OrderIssue'

describe('<OrderIssue />', () => {
  const content = {
    title: 'test title',
    body: 'text...',
    ingredientsItem: 'test ingredientsItem',
    recipeCardItem: 'test recipeCardItem',
    deliveryItem: 'test deliveryItem',
    otherItem: 'test otherItem',
  }

  const PROPS = {
    content,
    orderId: '123',
    userId: '456',
  }

  let wrapper
  let getHelpLayout

  describe('rendering', () => {
    beforeEach(() => {
      wrapper = mount(
        <OrderIssue {...PROPS} />
      )
      getHelpLayout = wrapper.find('GetHelpLayout')
    })

    test('layout is rendering correctly', () => {
      expect(getHelpLayout).toHaveLength(1)
    })

    test('header is rendering correctly', () => {
      expect(getHelpLayout.prop('title')).toBe(content.title)
    })

    test('body description is redering correctly', () => {
      expect(getHelpLayout.prop('body')).toBe(content.body)
    })

    test('items are rendered', () => {
      const items = wrapper.find('Item')

      expect(items).toHaveLength(4)
      expect(items.at(0).text()).toContain('test ingredientsItem')
      expect(items.at(1).text()).toContain('test recipeCardItem')
      expect(items.at(2).text()).toContain('test deliveryItem')
      expect(items.at(3).text()).toContain('test otherItem')
    })

    test('items are links to certain pages', () => {
      const itemLinks = wrapper.find('ItemLink')

      expect(itemLinks).toHaveLength(4)
      expect(itemLinks.at(0).prop('to')).toBe('/get-help/user/456/order/123/ingredients')
      expect(itemLinks.at(1).prop('to')).toBe('/get-help/user/456/order/123/recipe-cards')
      expect(itemLinks.at(2).prop('to')).toBe(`/get-help/user/${PROPS.userId}/order/${PROPS.orderId}/delivery`)
      expect(itemLinks.at(3).prop('to')).toBe('/help-centre')
    })

    test('the Others option is not client route', () => {
      expect(wrapper.find('ItemLink').at(3).prop('clientRouted')).toBe(false)
    })
  })
})
