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
        },
        cardInfoMissing: {
          selector: '*[data-testing="valid-card-details-not-provided"]',
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
            cardNameInputError: {
              selector: '*[data-testing="checkoutCardNameInputError"]',
            },
            billingAddressChange: {
              selector: '*[data-testing="checkout_payment_toggle"]',
            },
            postCodeAddress: {
              selector: '*[name="payment.postcodeTemp"]',
            },
            addressNotFound: {
              selector: '*[data-testing="addressNotFound"]',
            },
            houseNoInvalid: {
              selector: '*[data-testing="houseNoError"]',
            }
          },

          commands: [{
            setCardName: function () {
              this
                .waitForElementVisible('@cardNameInput')
                .setValue('@cardNameInput', `${faker.name.firstName()} ${faker.name.lastName()}`)
            },
            setCardNumber: function (browser) {
              this
                .waitForElementVisible('@cardNameInput')
                .setValue('@cardNameInput', `${browser.Keys.TAB} 4242424242424242 ${browser.Keys.TAB}`)
            },
            setCardNumberEmpty: function (browser) {
              this
                .waitForElementVisible('@cardNameInput')
                .setValue('@cardNameInput', `${browser.Keys.TAB}${browser.Keys.BACK_SPACE}`)
            },
            setCardExpiryDate: function (browser) {
              browser.keys('01')
              browser.keys('25')
            },
            setCardExpiryDateEmpty: function (browser) {
              this
                .waitForElementVisible('@cardNameInput')
                .setValue('@cardNameInput', `${browser.Keys.TAB}${browser.Keys.BACK_SPACE}${browser.Keys.TAB}`)
              browser.keys(`${browser.Keys.BACK_SPACE}${browser.Keys.TAB}`)
              browser.keys(`${browser.Keys.BACK_SPACE}${browser.Keys.TAB}`)
            },
            setCardSecurityCode: function (browser) {
              browser.keys('100')
            },
            setInvalidBillingAddress: function (browser) {
              this.waitForElementVisible('@billingAddressChange')
              clickElement.call(this, '@billingAddressChange')
              this.waitForElementVisible('@postCodeAddress', 1000)
                .setValue('@postCodeAddress', `W140EE${browser.Keys.TAB}${browser.Keys.ENTER}`)
              this.waitForElementVisible('@addressNotFound')
              clickElement.call(this, '@addressNotFound')
            },
            setInvalidCardDetails: function () {
              this.waitForElementVisible('@billingAddressChange')
              clickElement.call(this, '@billingAddressChange')
            },
            checkIfErrorForName: function () {
              this
                .waitForElementVisible('@cardNameInputError')
                .expect.element('@cardNameInputError').to.be.present.before(1000);
            },
            checkIfErrorForBillingAddress: function () {
              this
                .waitForElementVisible('@houseNoInvalid')
                .expect.element('@houseNoInvalid').to.be.present.before(1000);
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
        submitPaymentSectionWithoutCardName: function (browser) {
          this.section.payment.setCardNumber(browser)
          browser.pause(1000)
          this.section.payment.setCardExpiryDate(browser)
          browser.pause(1000)
          this.section.payment.setCardSecurityCode(browser)
          return this
        },
        submitPaymentSectionWithoutBillingAddress: function (browser) {
          this.section.payment.setCardName()
          browser.pause(2000)
          this.section.payment.setInvalidBillingAddress(browser)
        },
        submitPaymentSectionWithoutCardDetails: function (browser) {
          browser.pause(2000)
          this.section.payment.setCardNumberEmpty(browser)
          this.section.payment.setInvalidCardDetails()
        },
        submitPaymentSection: function (browser) {
          browser.pause(2000)
          this.section.payment.setCardNumber(browser)
          browser.pause(1000)
          this.section.payment.setCardExpiryDate(browser)
          browser.pause(1000)
          this.section.payment.setCardSecurityCode(browser)

          return this
        },
        checkIfErrorForNameVisible: function () {
          this.section.payment.checkIfErrorForName()
          return this
        },
        checkIfErrorForBillingAddressVisible: function () {
          this.section.payment.checkIfErrorForBillingAddress()
          return this
        },
        checkIfErrorForCardDetailsVisible: function (browser) {
          this.waitForElementVisible('@cardInfoMissing')
            .expect.element('@cardInfoMissing').to.be.present.before(1000);
          this.section.payment.setCardExpiryDateEmpty(browser)
          return this
        },
        goToNextStep,
      }],
    },
  }
}
