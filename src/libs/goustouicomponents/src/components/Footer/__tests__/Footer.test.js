import React from 'react'
import { mount } from 'enzyme'
import { routes } from 'gousto-config'
import { Footer } from '..'

describe('<Footer />', () => {
  let wrapper
  const { goustoWebclient, external } = routes

  beforeEach(() => {
    wrapper = mount(<Footer />)
  })

  test('renders without crashing', () => {})

  const socialMediaCases = [
    'facebook',
    'twitter',
    'youtube',
    'instagram',
  ]

  describe.each(socialMediaCases)('the %s social media icon', (socialMedia) => {
    test('renders within the right link', () => {
      expect(
        wrapper
          .find(`[href="${external[socialMedia].url}"]`)
          .find(`.${socialMedia}Icon`).exists(),
      ).toBe(true)
    })
  })

  const storeCases = ['playstore', 'appstore']

  describe.each(storeCases)('for the %s CTA', (store) => {
    test('renders the icon within the correct link', () => {
      expect(
        wrapper
          .find(`[href="${external[store].url}"]`)
          .find(`[data-testing="${store}-icon"]`).exists(),
      ).toBe(true)
    })
  })

  const goustoWebclientLinkCases = [
    [goustoWebclient.home.url, goustoWebclient.home.label],
    [goustoWebclient.chooseRecipes.url, goustoWebclient.chooseRecipes.labelAlternative],
    [goustoWebclient.help.url, goustoWebclient.help.label],
    [goustoWebclient.termsOfUse.url, goustoWebclient.termsOfUse.label],
    [goustoWebclient.termsAndConditions.url, goustoWebclient.termsAndConditions.label],
    [goustoWebclient.cookbook.url, goustoWebclient.cookbook.label],
    [goustoWebclient.jobs.url, goustoWebclient.jobs.label],
    [goustoWebclient.sustainability.url, goustoWebclient.sustainability.labelAlternative],
    [goustoWebclient.blog.url, goustoWebclient.blog.label],
    [goustoWebclient.suppliers.url, goustoWebclient.suppliers.label],
    [goustoWebclient.privacyPolicy.url, goustoWebclient.privacyPolicy.label],
    [goustoWebclient.modernSlavery.url, goustoWebclient.modernSlavery.label],
  ]

  describe.each(goustoWebclientLinkCases)('for the %s link', (route, copy) => {
    test(`renders the copy: "${copy}" linking to ${route}`, () => {
      expect(wrapper.find(`[href="${route}"]`).text()).toBe(copy)
    })
  })

  test('the copyright is rendered with the current year', () => {
    const now = new Date()
    expect(wrapper.find('.copyright').text()).toBe(`© Gousto\u00a0${now.getFullYear()}. All rights reserved.`)
  })

  describe('when the prop hasDataTracking is true', () => {
    beforeEach(() => {
      wrapper.setProps({ hasDataTracking: true })
    })

    describe.each([[true], [false]])('and the prop isAuthenticated is %s', (isAuthenticated) => {
      beforeEach(() => {
        wrapper.setProps({ isAuthenticated })
      })

      describe.each([
        [
          goustoWebclient.help.url,
          'click_help_footer',
          JSON.stringify({ logged_in: isAuthenticated }),
        ],
      ])('The %s link', (route, trackingAction, trackingProperties) => {
        test(`renders the data attribute with the tracking action ${trackingAction}`, () => {
          expect(wrapper.find(`[href="${route}"]`).prop('data-tracking-action'))
            .toBe(trackingAction)
        })

        test('renders the tracking data attribute with the corresponding value', () => {
          expect(wrapper.find(`[href="${route}"]`).prop('data-tracking-property'))
            .toBe(trackingProperties)
        })
      })
    })
  })

  describe('when the prop hasDataTracking is false', () => {
    beforeEach(() => {
      wrapper.setProps({ hasDataTracking: false })
    })

    test.each([
      [goustoWebclient.help.url],
    ])('The %s link does not render any tracking data attribute', (route) => {
      const link = wrapper.find(`[href="${route}"]`)

      expect(link.prop('data-tracking-action')).toBe(undefined)
      expect(link.prop('data-tracking-property')).toBe(undefined)
    })
  })
})
