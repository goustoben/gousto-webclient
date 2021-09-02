const clickElement = require('../commands/clickElement');
const goToNextStep = function () { clickElement.call(this, '@CTA') }

module.exports = {
  url: function () {
    return this.api.launchUrl + '/signup'
  },

  sections: {
    welcomeStep: {
      selector: '*[data-testing="signupWelcomeStep"]',

      elements: {
        CTA: {
          selector: '*[data-testing="signupWelcomeStepCTA"]',
        }
      },

      commands: [{
        goToNextStep,
      }],
    },
    boxSizeStep: {
      selector: '*[data-testing="signupBoxSizeStep"]',

      elements: {
        CTA: {
          selector: '*[data-testing^="signupBoxSize"][data-testing$="Portions"]',
        }
      },

      commands: [{
        goToNextStep,
      }],
    },
    postcodeStep: {
      selector: '*[data-testing="signupPostcodeStep"]',

      elements: {
        postcodeInput: {
          selector: '*[data-testing="signupPostcodeInput"]',
        },
        CTA: {
          selector: '*[data-testing="signupPostcodeCTA"]',
        },
      },

      commands: [{
        setPostcode: function () {
          this
            .waitForElementVisible('@postcodeInput')
            .setValue('@postcodeInput', 'RH4 1EW')

          return this
        },
        goToNextStep: function () {
          clickElement.call(this, '@CTA')
        },
      }],
    },
    deliveryStep: {
      selector: '*[data-testing="signupDeliveryStep"]',

      elements: {
        deliveryDay: {
          selector: '*[data-testing="signupDeliveryDay"]',
        },
        deliveryTime: {
          selector: '*[data-testing="signupDeliveryTime"]',
        },
        CTA: {
          selector: '*[data-testing="signupDeliveryCTA"]',
        }
      },

      commands: [{
        checkIfDeliverySet: function () {
          this
            .waitForElementPresent('@deliveryDay')
            .waitForElementPresent('@deliveryTime')
            .expect.element('@CTA').to.be.enabled

          return this
        },
        goToNextStep,
      }],
    },
    finishStep: {
      selector: '*[data-testing="signupFinishStep"]',

      elements: {
        CTA: {
          selector: '*[data-testing="signupFinishCTA"]',
        }
      },

      commands: [{
        goToNextStep,
      }],
    },
    sellThePropositionPage: {
      selector: '*[data-testing="sellThePropositionPage"]',

      elements: {
        CTA: {
          selector: '*[data-testing="sellThePropositionCTA"]'
        },
      },

      commands: [{
        goToNextStep: function () {
          clickElement.call(this, '@CTA')
        }
      }],
    }
  }
}
