module.exports = {
  '@disabled': true,
  'Promo - not logged in': function (browser) {
    const menu = browser.page.menu()
    const shared = browser.page.shared()
    const body = shared.section.body

    browser
      .url(`${browser.launch_url}/menu?promo_code=fbb1&no_gtm=1`)

    body
      .submitPromo()
      .waitForElementNotPresent('@promoModal')
    menu
      .pickRecipes(2, 'w3 7un')

    browser.pause(10000)
    browser.end()
  },
  tags: ['promo'],
};
