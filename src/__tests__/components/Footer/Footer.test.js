import React from 'react'
import { shallow } from 'enzyme'

import { AppStoreLinks } from 'components/AppStoreLinks'
import css from 'components/Footer/Footer.css'
import routesConfig from 'config/routes'
import Footer from 'Footer/Footer'

describe('<Footer />', () => {
  test('should return a <div>', () => {
    const wrapper = shallow(<Footer />)
    expect(wrapper.type()).toEqual('div')
  })

  test('should display the medium footer by default which conatains AppStoreLinks and full list', () => {
    const wrapper = shallow(<Footer />)
    expect(wrapper.find(AppStoreLinks).length).toEqual(1)

    // Render app links store
    expect(wrapper.find('[data-selid="footer-facebook"]').length).toEqual(1)
    // Render full list
    expect(wrapper.find('[data-selid="footer-learn-more"]').length).toEqual(1)
    // render Terms
    expect(wrapper.find('[data-selid="footer-terms-of-use"]').length).toEqual(1)
    // render Privacy links
    expect(
      wrapper.find('[data-selid="footer-privacy-statement"]').length,
    ).toEqual(1)
    // Don't render pattern
    expect(wrapper.find('#pattern').length).toEqual(0)
  })

  test("should display the Simple footer when type is 'simple' ", () => {
    const wrapper = shallow(<Footer type="simple" />)
    // Render Terms
    expect(wrapper.find('[data-selid="footer-terms-of-use"]').length).toEqual(1)
    // Render Privacy links
    expect(
      wrapper.find('[data-selid="footer-privacy-statement"]').length,
    ).toEqual(1)
    // DONT Render app links store
    expect(wrapper.find('[data-selid="footer-facebook"]').length).toEqual(0)
    // DONT Render full list
    expect(wrapper.find('[data-selid="footer-learn-more"]').length).toEqual(0)
    // DONT render pattern
    expect(wrapper.find('#pattern').length).toEqual(0)
    // DONT render app store links
    expect(wrapper.find(AppStoreLinks).length).toEqual(0)
  })

  test('should keep back compatibility with the `simple` prop ', () => {
    const wrapper = shallow(<Footer simple />)
    // Render Terms
    expect(wrapper.find('[data-selid="footer-terms-of-use"]').length).toEqual(1)
    // Render Privacy links
    expect(
      wrapper.find('[data-selid="footer-privacy-statement"]').length,
    ).toEqual(1)
    // DONT Render app links store
    expect(wrapper.find('[data-selid="footer-facebook"]').length).toEqual(0)
    // DONT Render full list
    expect(wrapper.find('[data-selid="footer-learn-more"]').length).toEqual(0)
    // DONT render pattern
    expect(wrapper.find('#pattern').length).toEqual(0)
    // DONT render app store links
    expect(wrapper.find(AppStoreLinks).length).toEqual(0)
  })

  test("should display the Large footer when type is 'large' ", () => {
    const wrapper = shallow(<Footer type="large" />)
    // render Terms
    expect(wrapper.find('[data-selid="footer-terms-of-use"]').length).toEqual(1)
    // Render Privacy links
    expect(
      wrapper.find('[data-selid="footer-privacy-statement"]').length,
    ).toEqual(1)
    // Render app links store
    expect(wrapper.find('[data-selid="footer-facebook"]').length).toEqual(1)
    // Render full list
    expect(wrapper.find('[data-selid="footer-learn-more"]').length).toEqual(1)
    // Render app store links
    expect(wrapper.find(AppStoreLinks).length).toEqual(1)
  })

  test("should display checkout footer then type props id 'checkout'", () => {
    const wrapper = shallow(<Footer type="checkout" />)
    expect(
      wrapper
        .children()
        .prop('className')
        .includes(css.checkoutFooterContainer),
    ).toBe(true)
  })

  test('should not display copyright if set to false', () => {
    const wrapper = shallow(<Footer copyright={false} />)
    // render Terms
    expect(wrapper.find('#copyright').length).toEqual(0)
  })

  test('should display copyright if set to true', () => {
    const wrapper = shallow(<Footer copyright />)
    // render Terms
    expect(wrapper.find('#copyright').length).toEqual(1)
  })

  describe('clicking the links', () => {
    let wrapper
    let helpLink

    beforeEach(() => {
      wrapper = shallow(<Footer />)
      helpLink = wrapper.findWhere(n => n.prop('title') === 'Help')
    })

    test('opens the Help link into a new tab', () => {
      expect(helpLink.prop('target')).toBe('_blank')
    })

    test('does not open other links in a new tab', () => {
      const linksWithNewTab = wrapper.findWhere(n => n.prop('target') === '_blank')
      expect(linksWithNewTab).toHaveLength(1)
    })
  })
})
