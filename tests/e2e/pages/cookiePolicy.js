module.exports = {
  url: function () {
    return this.api.launchUrl + "/";
  },

  sections: {
    cookiePolicyBanner: {
      selector: '*[data-testing="cookiePolicyBanner"]',

      elements: {
        CTA: {
          selector: '*[data-testing="cookiePolicyBannerBtn"]',
        },
      },

      commands: [
        {
          dismissCookieBannerIfPresent: function () {
            this.optionallyClickToDismiss(
              '*[data-testing="cookiePolicyBannerBtn"]'
            );
          },
        },
      ],
    },
  },
};
