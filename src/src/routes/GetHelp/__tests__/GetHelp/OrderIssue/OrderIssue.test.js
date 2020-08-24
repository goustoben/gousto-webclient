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

  let wrapper
  let getHelpLayout

  describe('rendering', () => {
    beforeEach(() => {
      wrapper = mount(
        <OrderIssue content={content} />
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
      expect(itemLinks.at(0).prop('to')).toBe('/get-help/ingredients')
      expect(itemLinks.at(1).prop('to')).toBe('/get-help/recipe-cards')
      expect(itemLinks.at(2).prop('to')).toBe('/get-help/delivery')
      expect(itemLinks.at(3).prop('to')).toBe('https://gousto.zendesk.com/hc/en-gb')
    })

    describe('when userId prop is passed', () => {
      const USER_ID = '1234'
      beforeEach(() => {
        wrapper.setProps({ userId: USER_ID })
      })

      test('the link to zendesk has the user id appended at the end', () => {
        expect(wrapper.find('ItemLink').at(3).prop('to'))
          .toBe(`https://gousto.zendesk.com/hc/en-gb/?user_id=${USER_ID}`)
      })
    })

    test('the Others option is not client route', () => {
      expect(wrapper.find('ItemLink').at(3).prop('clientRouted')).toBe(false)
    })
  })
})
