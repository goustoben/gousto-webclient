module.exports = {
  url: function () {
    return this.api.launchUrl
  },

  sections: {
    hero: {
      selector: '*[data-testing="hero"]',

      elements: {
        CTA: {
          selector: '*[data-testing="homepageHeroCTA"]',
        },
      },

      commands: [{
        goToSignUp: function () {
          this.safelyClick('@CTA')
        }
      }],
    },
  },
}
