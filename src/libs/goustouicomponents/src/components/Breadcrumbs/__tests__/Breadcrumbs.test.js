import React from 'react'
import { mount } from 'enzyme'
import { Breadcrumbs } from '..'
import css from '../Breadcrumbs.module.css'

const items = [
  {
    label: 'Cookbook',
    link: '/cookbook',
    testingSelector: 'breadcrumbs-cookbook',
  },
  {
    label: 'Chinese Recipes',
    link: '/cookbook/chinese-recipes',
    testingSelector: 'breadcrumbs-category',
  },
  {
    label: 'Chinese Hoisin Barbecue Chicken',
    link: '/cookbook/chinese-recipes/chinese-hoisin-barbecue-chicken',
    testingSelector: 'breadcrumbs-recipe',
  },
]

describe('<Breadcrumbs />', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(<Breadcrumbs items={items} />)
  })

  test('renders without crashing', () => {})

  test('should render items', () => {
    expect(wrapper.find('li')).toHaveLength(items.length)
  })

  test('should render first 2 item as links', () => {
    wrapper
      .find('li')
      .slice(0, 2)
      .forEach((node, index) => {
        const { label, link } = items[index]
        const linkEl = node.find('a')

        expect(linkEl.text()).toBe(label)
        expect(linkEl.prop('href')).toBe(link)
      })
  })

  test('should render last item as text', () => {
    const expectedLabel = items.reverse()[0].label
    const element = wrapper.find('li').last().find('span')

    expect(element.text()).toBe(expectedLabel)
    expect(element.hasClass(css.text)).toBe(true)
  })

  test('<li> items should have [data-separator] attribute with "/" value', () => {
    wrapper.find('li').forEach((node) => {
      expect(node.prop('data-separator')).toBe('/')
    })
  })

  test('<li> items should have [data-testing] attribute with the supplied values', () => {
    wrapper.find('li').forEach((node, index) => {
      expect(node.prop('data-testing')).toBe(items[index].testingSelector)
    })
  })

  describe('when 2 items are passed', () => {
    beforeEach(() => {
      wrapper.setProps({ items: items.slice(0, 2) })
    })

    test('then the first item should be rendered as link', () => {
      expect(wrapper.find('li').first().find('a').exists()).toBe(true)
    })

    test('then the last item should be rendered as text', () => {
      expect(wrapper.find('li').last().find('span').exists()).toBe(true)
    })
  })

  describe('when renderLinkItem is passed', () => {
    beforeEach(() => {
      // eslint-disable-next-line react/prop-types
      const renderLinkItem = ({ label, link }) => (
        <div data-test-id={link}>{label}</div>
      )
      wrapper.setProps({ renderLinkItem })
    })

    test('then it should be called to render the links', () => {
      wrapper
        .find('li')
        .slice(0, 2)
        .forEach((node, index) => {
          const { label, link } = items[index]
          const customLinkElement = node.find('div')

          expect(customLinkElement.text()).toBe(label)
          expect(customLinkElement.prop('data-test-id')).toBe(link)
        })
    })

    test('and the last item should be rendered as text as usual', () => {
      const expectedLabel = items.reverse()[0].label
      const element = wrapper.find('li').last().find('span')

      expect(element.text()).toBe(expectedLabel)
      expect(element.hasClass(css.text)).toBe(true)
    })
  })
})
