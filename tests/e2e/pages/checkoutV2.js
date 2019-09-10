const faker = require('faker')
const clickElement = require('../commands/clickElement');
const goToNextStep = function () { clickElement.call(this, '@CTA') }

module.exports = {
  url: function () {
    return this.api.launchUrl + '/signup'
  },

  sections: {
    checkoutContainer: {
      selector: '*[data-testing="checkoutContainer"]',

      elements: {
        CTA: {
          selector: '*[data-testing="checkoutCTA"]',
        }
      },

      sections: {
        boxdetails: {
          selector: '*[data-testing="checkoutBoxDetailsSection"]',

          elements: {
            recipeSummary: {
              selector: '*[data-testing="checkoutRecipeSummary"]',
            },
          },

          commands: [{
            checkIfRecipeSummaryVisible: function () {
              this
                .waitForElementVisible('@recipeSummary')
            },
          }],
        },
        aboutyou: {
          selector: '*[data-testing="checkoutAboutYouSection"]',

          elements: {
            firstNameInput: {
              selector: '*[data-testing="checkoutFirstNameInput"]',
            },
            lastNameInput: {
              selector: '*[data-testing="checkoutLastNameInput"]',
            },
            emailInput: {
              selector: '*[data-testing="checkoutEmailInput"]',
            },
            passwordInput: {
              selector: '*[data-testing="checkoutPasswordInput"]',
            },
          },

          commands: [{
            setFirstName: function () {
              this
                .waitForElementVisible('@firstNameInput')
                .setValue('@firstNameInput', faker.name.firstName())

              return this
            },
            setLastName: function () {
              this
                .waitForElementVisible('@lastNameInput')
                .setValue('@lastNameInput', faker.name.lastName())

              return this
            },
            setEmail: function () {
              this
                .waitForElementVisible('@emailInput')
                .setValue('@emailInput', faker.internet.email())

              return this
            },
            setPassword: function () {
              this
                .waitForElementVisible('@passwordInput')
                .setValue('@passwordInput', faker.internet.password())

              return this
            },
          }],
        },
        delivery: {
          selector: '*[data-testing="checkoutDeliverySection"]',

          elements: {
            addressDropdown: {
              selector: '*[data-testing=checkoutAddressDropdown]',
            },
            secondOption: {
              selector: '*[data-testing=checkoutAddressDropdown] .Select-option:nth-of-type(2) > span',
            },
            secondOptionNative: {
              selector: '*[data-testing=checkoutAddressDropdown] option:nth-of-type(2)',
            },
            selectAddressCTA: {
              selector: '*[data-testing=checkoutSelectAddressCTA]',
            },
            phoneNumberInput: {
              selector: '*[data-testing=checkoutPhoneNumberInput]',
            },
          },

          commands: [{
            setAddress: function () {
              clickElement.call(this, '@addressDropdown')
              clickElement.call(this, this.api.globals.browser === 'mobile' ? '@secondOptionNative' : '@secondOption')
              clickElement.call(this, '@selectAddressCTA')
            },
            setPhoneNumber: function () {
              this
                .waitForElementVisible('@phoneNumberInput')
                .setValue('@phoneNumberInput', '2030111002')
            },
          }],
        },
        payment: {
          selector: '*[data-testing="checkoutPaymentSection"]',
          elements: {
            cardNameInput: {
              selector: '*[data-testing="checkoutCardNameInput"]',
            },
          },

          commands: [{
            setCardName: function (browser) {
              this
                .waitForElementVisible('@cardNameInput')
                .setValue('@cardNameInput', `${faker.name.firstName()} ${faker.name.lastName()}`)
            },
            setCardNumber: function (browser) {
              this
                .waitForElementVisible('@cardNameInput')
                .setValue('@cardNameInput', `${browser.Keys.TAB} 4242424242424242 ${browser.Keys.TAB}`)
            },
            setCardExpiryDate: function (browser) {
              browser.keys('01')
              browser.keys('25')
            },
            setCardSecurityCode: function (browser) {
              browser.keys('100')
            }
          }],
        }
      },

      commands: [{
        submitBoxDetailsSection: function () {
          this.section.boxdetails.checkIfRecipeSummaryVisible()

          return this
        },
        submitAboutYouSection: function () {
          this.section.aboutyou.setFirstName()
          this.section.aboutyou.setLastName()
          this.section.aboutyou.setEmail()
          this.section.aboutyou.setPassword()

          return this
        },
        submitDeliverySection: function () {
          this.section.delivery.setAddress()
          this.section.delivery.setPhoneNumber()

          return this
        },
        submitPaymentSection: function (browser) {
          this.section.payment.setCardName(browser)
          browser.pause(2000)
          this.section.payment.setCardNumber(browser)
          browser.pause(1000)
          this.section.payment.setCardExpiryDate(browser)
          browser.pause(1000)
          this.section.payment.setCardSecurityCode(browser)

          return this
        },
        goToNextStep,
      }],
    },
  }
}
