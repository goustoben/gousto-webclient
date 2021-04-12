const faker = require('faker')
const clickElement = require('../commands/clickElement')
const waitAndSetValue = require('../commands/waitAndSetValue')
const { pollRace, pollCondition } = require('../utils/pollUtils')
const { asyncIsElementBySelectorPresent } = require('../utils/asyncIsElementBySelectorPresent')
const { promisifyNightwatchCommand } = require('../utils/promisifyNightwatchCommand')

const SMALL_DELAY = 2000

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
        },
        promoCodeError: {
          selector: '*[data-testing="user-promo-invalid"]',
        },
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
              clickElement.call(this, '@secondOption')
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
            },
            paymentMethodPaypal: {
              selector: '*[data-testing="paymentMethod_PayPal"]',
            },
            paypalSetupIframe: {
              selector: 'div#paypal-container iframe.component-frame'
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
                .setValue('@cardNameInput', '')

              browser.keys(browser.Keys.TAB)
              browser.keys('4485040371536584')
              browser.keys(browser.Keys.TAB)
            },
            changeCardNumber: function (browser, cardNumber = '4485040371536584') {
              this
                .waitForElementVisible('@cardNameInput')
                .setValue('@cardNameInput', ``)

              browser.keys(browser.Keys.TAB)
              browser.keys(browser.Keys.BACK_SPACE.repeat(16))
              browser.keys(cardNumber)
            },
            changeCardNumberToEmpty: function (browser) {
              this.changeCardNumber(browser, '')
            },
            setCardExpiryDate: function (browser) {
              browser.keys('01')
              browser.keys('25')
            },
            changeCardExpiryDate: function (browser, month = '01', year = '25') {
              this
                .waitForElementVisible('@cardNameInput')
                .setValue('@cardNameInput', ``)

              browser.keys(browser.Keys.TAB)
              browser.keys(browser.Keys.TAB)
              browser.keys(browser.Keys.BACK_SPACE.repeat(4))
              browser.keys(month)
              browser.keys(year)
            },
            changeCardExpiryDateToEmpty: function (browser) {
              this.changeCardExpiryDate(browser, '', '')
            },
            setCardSecurityCode: function (browser) {
              browser.keys('100')
            },
            changeCardSecurityCode: function (browser, cvv = '100') {
              this
                .waitForElementVisible('@cardNameInput')
                .setValue('@cardNameInput', ``)

              browser.keys(browser.Keys.TAB)
              browser.keys(browser.Keys.TAB)
              browser.keys(browser.Keys.TAB)
              browser.keys(browser.Keys.BACK_SPACE.repeat(4))
              browser.keys(cvv)
            },
            setInvalidBillingAddress: function (browser) {
              this.waitForElementVisible('@billingAddressChange')
              clickElement.call(this, '@billingAddressChange')
              this.waitForElementVisible('@postCodeAddress', SMALL_DELAY)
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
                .expect.element('@cardNameInputError').to.be.present.before(SMALL_DELAY)
            },
            checkIfErrorForBillingAddress: function () {
              this
                .waitForElementVisible('@houseNoInvalid')
                .expect.element('@houseNoInvalid').to.be.present.before(SMALL_DELAY)
            },
            selectPaypalPaymentMethod: function (browser) {
              clickElement.call(this, '@paymentMethodPaypal')
            },
            asyncClickPaypalSetupButton: async function (browser, done) {
              const selector = this.elements.paypalSetupIframe.selector

              this.waitForElementVisible(selector)

              // Nightwatch's `frame` API supports only number or id to find
              // the iframe; the iframe with the paypal setup button is
              // inserted dynamically - so we don't know in advance either its
              // number on the page or the id.  Use the browser's execution
              // environment in order to find the id after the iframe is
              // inserted.
              const frameId = await promisifyNightwatchCommand(
                browser,
                'execute',
                `return document.querySelector('${selector}').id`
              )

              await promisifyNightwatchCommand(browser, 'frame', frameId)

              // Delays are needed because the PayPal event handlers take some
              // time to initialize; and there's no observable state change to
              // know when they're ready.
              browser.pause(SMALL_DELAY)

              clickElement.call(browser, '.paypal-button')

              await promisifyNightwatchCommand(browser, 'frameParent')

              browser.pause(SMALL_DELAY)

              done()
            },
            checkPaypalSetupButtonIsInvisible: function (browser) {
              this.waitForElementNotVisible('@paypalSetupIframe')
            }
          }],
        },
        paypalWindow: {
          selector: 'n/a', // nightwatch requires it, but we never use it
          elements: {
            consentButton: {
              selector: 'button#consentButton'
            }
          },
          props: {
            paypalUserEmail: 'goustoe2etest@mailinator.com',
            paypalUserPassword: 'goustoe2etest'
          },
          commands: [{
            asyncWaitPaypalWindowIsOpen: function (browser, done) {
              const check = function (callback) {
                browser.windowHandles(function (commandResult) {
                  const result = commandResult.status === 0 && commandResult.value.length === 2
                  callback(result)
                })
              }

              pollCondition(check, function (pollResult) {
                if (pollResult === 'conditionMet') {
                  done()
                } else {
                  browser.assert.fail('Expected the PayPal window to open')
                }
              })
            },
            asyncLoginAndConfirmPayment: async function (browser, done) {
              try {
                const mainWindowHandle = await promisifyNightwatchCommand(browser, 'windowHandle')

                const windowHandles = await promisifyNightwatchCommand(browser, 'windowHandles')

                browser.assert.equal(windowHandles.length, 2, 'The PayPal window is open')

                const paypalWindowHandle = windowHandles[0] === mainWindowHandle
                      ? windowHandles[1]
                      : windowHandles[0]

                await promisifyNightwatchCommand(browser, 'switchWindow', paypalWindowHandle)

                // For some reason, at this point the nightwatch's @reference
                // mechanism is not working, hence the selector values are
                // inlined rather than defined in the `elements` section.
                waitAndSetValue.call(this, 'input#email', this.props.paypalUserEmail)

                clickElement.call(this, 'button[value="Next"]')

                waitAndSetValue.call(this, 'input#password', this.props.paypalUserPassword)

                clickElement.call(this, 'button[value="Login"]')

                const consentButtonSelector = this.elements.consentButton.selector
                browser.waitForElementVisible(consentButtonSelector, 60000)
                browser.execute(`document.querySelector('${consentButtonSelector}').scrollIntoView()`)
                browser.pause(SMALL_DELAY)
                clickElement.call(this, consentButtonSelector)

                await promisifyNightwatchCommand(browser, 'switchWindow', mainWindowHandle)

                const isPaypalWindowClosed = function (callback) {
                  browser.windowHandles(function (commandResult) {
                    const result = commandResult.status === 0 && commandResult.value.length === 1
                    callback(result)
                  })
                }

                pollCondition(isPaypalWindowClosed, function (pollResult) {
                  if (pollResult === 'conditionMet') {
                    done()
                  } else {
                    browser.assert.fail('Expected the PayPal window to close')
                  }
                })
              }
              catch (e) {
                console.warn('Failed PayPal flow with error', e)
                browser.assert.fail(`Paypal interaction failed: '${e.message}'`)
              }
            }
          }]
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
          this.section.payment.setCardName()
          browser.pause(SMALL_DELAY)
          this.section.payment.setCardNumber(browser)
          browser.pause(SMALL_DELAY)
          this.section.payment.setCardExpiryDate(browser)
          browser.pause(SMALL_DELAY)
          this.section.payment.setCardSecurityCode(browser)

          return this
        },
        submitPaymentSectionWithoutCardName: function (browser) {
          this.section.payment.changeCardNumber(browser)
          browser.pause(SMALL_DELAY)
          this.section.payment.changeCardExpiryDate(browser)
          browser.pause(SMALL_DELAY)
          this.section.payment.changeCardSecurityCode(browser)
          return this
        },
        submitPaymentSectionWithoutBillingAddress: function (browser) {
          this.section.payment.setCardName()
          browser.pause(SMALL_DELAY)
          this.section.payment.setInvalidBillingAddress(browser)
        },
        submitPaymentSectionWithoutCardDetails: function (browser) {
          browser.pause(SMALL_DELAY)
          this.section.payment.changeCardNumberToEmpty(browser)
          this.section.payment.setInvalidCardDetails()
        },
        changeAndSubmitPaymentSection: function (browser) {
          browser.pause(SMALL_DELAY)
          this.section.payment.changeCardNumber(browser)
          browser.pause(SMALL_DELAY)
          this.section.payment.changeCardExpiryDate(browser)
          browser.pause(SMALL_DELAY)
          this.section.payment.changeCardSecurityCode(browser)

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
            .expect.element('@cardInfoMissing').to.be.present.before(SMALL_DELAY)
          this.section.payment.changeCardExpiryDateToEmpty(browser)
          return this
        },
        asyncSkipPromoCodeErrorIfPresent: function (browser, done) {
          const goToNextStep = this.goToNextStep.bind(this)

          const conditions = [
            {
              tag: 'promoCodeError',
              checkFn: (callback) => {
                const selector = this.elements.promoCodeError.selector
                asyncIsElementBySelectorPresent(browser, selector, callback)
              }
            },
            {
              tag: 'signupSuccessful',
              checkFn: function(callback) {
                // Corresponds to ./welcome.js::sections.elements.appPromo, but
                // it's not clear how to reference a peer page object from
                // here.
                const selector = '*[data-testing=appPromo]'
                asyncIsElementBySelectorPresent(browser, selector, callback)
              }
            }
          ]

          const onPollDone = function(pollResult, passedTag) {
            if (pollResult === 'timeRanOut') {
              browser.assert.fail('Expected either promo code error to be visible, or signup to be successful')
              done()
            } else if (passedTag === 'promoCodeError') {
              goToNextStep()
              done()
            } else if (passedTag === 'signupSuccessful') {
              done()
            }
          }

          pollRace(conditions, onPollDone)
        },
        goToNextStep,
      }],
    },
  }
}
