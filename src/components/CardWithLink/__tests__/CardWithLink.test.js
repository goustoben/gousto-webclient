import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
import { CardWithLink } from '../index'

describe('CardWithLink', () => {
  const CHILDREN = [
    <p key="1">First</p>,
    <p key="2">Second</p>,
  ]

  const LINK_LABEL = 'Test link'
  const LINK_URL = 'https://test-url.co.uk'

  test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <CardWithLink
        linkLabel={LINK_LABEL}
        linkUrl={LINK_URL}
      >
        {CHILDREN}
      </CardWithLink>, div
    )
  })

  let wrapper

  beforeEach(() => {
    wrapper = mount(
      <CardWithLink
        linkLabel={LINK_LABEL}
        linkUrl={LINK_URL}
      >
        {CHILDREN}
      </CardWithLink>
    )
  })

  test('renders the children whithin the content wrapper', () => {
    expect(wrapper.find('.contentWrapper').contains(CHILDREN)).toBe(true)
  })

  describe('the link', () => {
    let link

    beforeEach(() => {
      link = wrapper.find('.linkWrapper').find('GoustoLink')
    })

    test('renders with the correct label', () => {
      expect(link.text().includes(LINK_LABEL)).toBe(true)
    })

    test('renders with the correct URL', () => {
      expect(link.prop('to')).toBe(LINK_URL)
    })

    describe.each([[true], [false]])(
      'the clientRouted prop as %s',
      (clientRouted) => {
        test('is passed to <Link />', () => {
          wrapper.setProps({ clientRouted })
          expect(wrapper
            .find('.linkWrapper')
            .find('GoustoLink')
            .prop('clientRouted')
          ).toBe(clientRouted)
        })
      }
    )

    test('renders an arrow within the link wrapper', () => {
      expect(wrapper.find('.linkWrapper .arrowRight')).toHaveLength(1)
    })
  })
})
