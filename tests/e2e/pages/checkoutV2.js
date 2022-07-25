const faker = require('faker')
const { pollRace, pollCondition } = require('../utils/pollUtils')
const { asyncIsElementBySelectorPresent } = require('../utils/asyncIsElementBySelectorPresent')
const { promisifyNightwatchCommand } = require('../utils/promisifyNightwatchCommand')

const SMALL_DELAY = 2000

const goToNextStep = function () { this.safelyClick( '@CTA') }

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
        cardVerificationFailed: {
          selector: '*[data-testing="3ds-challenge-failed"]',
        },
        promoCodeError: {
          selector: '*[data-testing="user-promo-invalid"]',
        },
        totalPrice: {
          selector: '*[data-testing=totalPrice]'
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
        account: {
          selector: '*[data-testing="checkoutAboutYouSection"]',

          elements: {
            emailInput: {
              selector: '*[data-testing="checkoutEmailInput"]',
            },
            passwordInput: {
              selector: '*[data-testing="checkoutPasswordInput"]',
            },
          },

          commands: [{
            setEmail: function (email) {
              this
                .waitForElementVisible('@emailInput')
                .setValue('@emailInput', email)

              return this
            },
            setPassword: function (password) {
              this
                .waitForElementVisible('@passwordInput')
                .setValue('@passwordInput', password)

              return this
            },
          }],
        },
        delivery: {
          selector: '*[data-testing="checkoutDeliverySection"]',

          elements: {
            firstNameInput: {
              selector: '*[data-testing="checkoutFirstNameInput"]',
            },
            lastNameInput: {
              selector: '*[data-testing="checkoutLastNameInput"]',
            },
            addressDropdown: {
              selector: '*[data-testing=checkoutAddressDropdown]',
            },
            secondOption: {
              selector: '*[data-testing=checkoutAddressDropdown] .Select-option:nth-of-type(2) > span',
            },
            phoneNumberInput: {
              selector: '*[data-testing=checkoutPhoneNumberInput]',
            },
            deliveryOptionsDropdown: {
              selector: 'div[data-testing="checkoutDeliveryDetailsInstruction"]',
            },
            deliveryOption: {
              selector: 'div[data-testing=checkoutDeliveryDetailsInstruction] .Select-option:nth-of-type(2) > span',
            }
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
            setAddress: function () {
              this.safelyClick( '@addressDropdown')
              this.safelyClick( '@secondOption')
            },
            setPhoneNumber: function () {
              this.setValue('@phoneNumberInput', '2030111002')
            },
            selectDeliveryOption: function () {
              this.safelyClick( '@deliveryOptionsDropdown')
              this.safelyClick( '@deliveryOption')
            },
          }],
        },
        payment: {
          selector: '*[data-testing="checkoutPaymentSection"]',
          elements: {
            cardNameInput: {
              selector: 'input[data-testing="checkoutCardNameInput"]',
            },
            cardNameInputError: {
              selector: '*[data-testing="checkoutCardNameInputError"]',
            },
            cardNumber: {
              selector: '[data-frames="cardNumber"] iframe',
            },
            cardNumberError: {
              selector: '*[data-testing="checkoutFrameCardNoError"]',
            },
            cardExpiryDate: {
              selector: '[data-frames="expiryDate"] iframe',
            },
            cardExpiryDateError: {
              selector: '*[data-testing="checkoutFrameExpiryError"]',
            },
            cardCvv: {
              selector: '[data-frames="cvv"] iframe',
            },
            cardCvvError: {
              selector: '*[data-testing="checkoutFrameCVVError"]',
            },
            paymentMethodPaypal: {
              selector: '*[data-testing="checkoutPaymentMethodPayPal"]',
            },
            paypalSetupIframe: {
              selector: 'div#paypal-container iframe.component-frame'
            },
            CTA: {
              selector: '*[data-testing="checkoutCTA"]',
            }
          },

          commands: [{
            waitUntilReadyToAcceptCardDetails: function () {
              this.waitForElementVisible('@cardNumber')
            },
            setCardName: function (browser) {
              this
                .waitForElementVisible('@cardNameInput')
                .setValue('@cardNameInput', `${faker.name.firstName()} ${faker.name.lastName()}`)

              browser.keys(browser.Keys.TAB)
            },
            setCardNumber: function (browser) {
              this
                .waitForElementVisible('@cardNumber')
                .setValue('@cardNumber', '4543474002249996')

              browser.keys(browser.Keys.TAB)
            },
            setCardExpiryDate: function (browser) {
              browser.keys('01')
              browser.keys('25')
            },
            setCardSecurityCode: function (browser) {
              browser.keys('956')
            },
            changeCardSecurityCode: function (browser, cvv = '956') {
              this
                .waitForElementVisible('@cardCvv')
                .setValue('@cardCvv', '')

              browser.keys(browser.Keys.BACK_SPACE.repeat(4))
              browser.keys(cvv)
            },
            checkIfErrorForName: function () {
              this
                .waitForElementVisible('@cardNameInputError')
                .expect.element('@cardNameInputError').to.be.present.before(SMALL_DELAY)
            },
            checkIfErrorForCardNumber: function () {
              this
                .waitForElementVisible('@cardNumber')
                .expect.element('@cardNumberError').to.be.present.before(SMALL_DELAY)
            },
            checkIfErrorForExpiry: function () {
              this
                .waitForElementVisible('@cardExpiryDate')
                .expect.element('@cardExpiryDateError').to.be.present.before(SMALL_DELAY)
            },
            checkIfErrorForCVV: function () {
              this
                .waitForElementVisible('@cardCvv')
                .expect.element('@cardCvvError').to.be.present.before(SMALL_DELAY)
            },
            startYourSubscription: function () {
              this.safelyClick( '@CTA')
            },
            selectPaypalPaymentMethod: function (browser) {
              this.safelyClick( '@paymentMethodPaypal')
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

              this.safelyClick('.paypal-button')

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
            acceptAllButton: {
              selector: 'button#acceptAllButton',
            },
            loginIframe: {
              selector: '#injectedUnifiedLogin iframe',
            },
            consentButton: {
              selector: 'button#consentButton,input#confirmButtonTop',
            },
            emailField: {
              selector: 'input#email',
            },
            nextButton: {
              selector: 'button[value="Next"]',
            },
            passwordField: {
              selector: 'input#password',
            },
            loginButton: {
              selector: 'button[value="Login"]',
            }
          },
          props: {
            paypalUserEmail: 'goustoe2etest@mailinator.com',
            paypalUserPassword: 'goustoe2etest',
          },
          commands: [{
            // Notes on the interactions with the PayPal window:
            //
            // 1. Nightwatch's @-notation for elements doesn't seem to work
            // inside the PayPal window.
            //
            // 2. Using JavaScript to click buttons to avoid other elements
            // (e.g. cookie acceptance banner) intercepting clicks. This is
            // an anti-pattern when testing our own UI but acceptable here
            // since we just need the PayPal transaction to complete.

            asyncWaitPaypalWindowIsOpen: function (browser, mainWindowHandle, setPaypalWindowHandle, done) {
              let windowHandles

              const check = function (callback) {
                browser.windowHandles(function (commandResult) {
                  if (commandResult.status === 0) {
                    windowHandles = commandResult.value
                    callback(windowHandles.length === 2)
                  } else {
                    callback(false)
                  }
                })
              }

              pollCondition(check, function (pollResult) {
                if (pollResult === 'conditionMet') {
                  const paypalWindowHandle =
                    windowHandles[0] === mainWindowHandle
                    ? windowHandles[1]
                    : windowHandles[0]
                  setPaypalWindowHandle(paypalWindowHandle)

                  done()
                } else {
                  browser.assert.fail('Expected the PayPal window to open')
                }
              })
            },
            asyncSwitchToPaypalWindow: function (browser, paypalWindowHandle, done) {
              browser
                .switchWindow(paypalWindowHandle)
                .waitForElementVisible(this.elements.acceptAllButton.selector)
                .safelyClick(this.elements.acceptAllButton.selector)
                .perform(() => {
                  done()
                })
            },
            runStepByStepFlow: function (browser, done) {
              console.info('Running the step by step login flow (original)')
              browser
                .waitForElementVisible(this.elements.emailField.selector)
                .setValue(this.elements.emailField.selector, this.props.paypalUserEmail)
                .executeAndThrowOnFailure(`document.querySelector('${this.elements.nextButton.selector}').click()`)
                .waitForElementVisible(this.elements.passwordField.selector)
                .setValue(this.elements.passwordField.selector, this.props.paypalUserPassword)
                .executeAndThrowOnFailure(`document.querySelector('${this.elements.loginButton.selector}').click()`)
                .waitForElementVisible(this.elements.consentButton.selector)
                .executeAndThrowOnFailure(`document.querySelector('${this.elements.consentButton.selector}').click()`)
                .perform(() => {
                  done()
                })
            },
            runWholeFormInIframeFlow: function (browser, done) {
              console.info('Running the whole form in iframe login flow (newer)')
              browser
                .switchToFrameBySelector(this.elements.loginIframe.selector, 'gw-e2etest-paypalLoginFrame')
                .waitForElementVisible(this.elements.emailField.selector)
                .pause(SMALL_DELAY)
                .setValue(this.elements.emailField.selector, this.props.paypalUserEmail)
                .setValue(this.elements.passwordField.selector, this.props.paypalUserPassword)
                .executeAndThrowOnFailure(`document.querySelector('${this.elements.loginButton.selector}').click()`)
                .frameParent()
                .waitForElementVisible(this.elements.consentButton.selector)
                .pause(SMALL_DELAY)
                .executeAndThrowOnFailure(`document.querySelector('${this.elements.consentButton.selector}').click()`)
                .perform(() => {
                  done()
                })
            },
            asyncLoginAndConfirmPayment: function (browser, mainWindowHandle, done) {
              try {
                const isPaypalWindowClosed = function (callback) {
                  browser.windowHandles(function (commandResult) {
                    const result = commandResult.status === 0 && commandResult.value.length === 1
                    callback(result)
                  })
                }

                const onFlowComplete = () => {
                  browser
                    .switchWindow(mainWindowHandle)
                    .perform(() => {
                      pollCondition(isPaypalWindowClosed, function (pollResult) {
                        if (pollResult === 'conditionMet') {
                          done()
                        } else {
                          browser.assert.fail('Expected the PayPal window to close')
                        }
                      })
                    })
                }

                const conditions = [
                  {
                    tag: 'stepByStepFlow',
                    checkFn: (callback) => {
                      const selector = this.elements.emailField.selector
                      asyncIsElementBySelectorPresent(browser, selector, callback)
                    }
                  },
                  {
                    tag: 'wholeFormInIframeFlow',
                    checkFn: (callback) => {
                      const selector = this.elements.loginIframe.selector
                      asyncIsElementBySelectorPresent(browser, selector, callback)
                    }
                  }
                ]

                const onPollDone = (pollResult, passedTag) => {
                  if (pollResult === 'timeRanOut') {
                    browser.assert.fail('Expected either email field or the login form iframe to be present in the PayPal window')
                    done()
                  } else if (passedTag === 'stepByStepFlow') {
                    this.runStepByStepFlow(browser, onFlowComplete)
                  } else if (passedTag === 'wholeFormInIframeFlow') {
                    this.runWholeFormInIframeFlow(browser, onFlowComplete)
                  }
                }

                pollRace(conditions, onPollDone, this.api.globals.waitForConditionTimeout)
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
        ensureCheckoutLoaded: function () {
          // the order preview endpoint on staging takes a long time.
          this.waitForElementPresent('@totalPrice', 60000)
        },
        submitBoxDetailsSection: function () {
          this.section.boxdetails.checkIfRecipeSummaryVisible()

          return this
        },
        submitAccountSection: function (accountCredentials, browser) {
          this.section.account.setEmail(accountCredentials.email)
          this.section.account.setPassword(accountCredentials.password)

          return this
        },
        submitDeliverySection: function () {
          this.section.delivery.setFirstName()
          this.section.delivery.setLastName()
          this.section.delivery.setAddress()
          this.section.delivery.setPhoneNumber()
          this.section.delivery.selectDeliveryOption()

          return this
        },
        checkIfErrorsAreVisible: function (browser) {
          browser.pause(SMALL_DELAY)
          this.section.payment.checkIfErrorForCardNumber()
          this.section.payment.checkIfErrorForName()
          this.section.payment.checkIfErrorForExpiry()
          this.section.payment.checkIfErrorForCVV()
          return this
        },
        signupWithoutPaymentInfo: function () {
          this.section.payment.startYourSubscription()
          return this
        },
        enterAllCardDetailsExceptCardNumber: function (browser) {
          this.section.payment.setCardName(browser)
          browser.pause(SMALL_DELAY)
          this.section.payment.setCardExpiryDate(browser)
          browser.pause(SMALL_DELAY)
          this.section.payment.setCardSecurityCode(browser)
          return this
        },
        enterCardNumber: function (browser) {
          this.section.payment.setCardNumber(browser)
          return this
        },
        enterIncorrectCVV: function (browser) {
          this.section.payment.changeCardSecurityCode(browser, '101')
          return this
        },
        enterCorrectCVV: function (browser) {
          this.section.payment.changeCardSecurityCode(browser)

          return this
        },
        checkIfErrorForNameVisible: function () {
          this.section.payment.checkIfErrorForName()
          return this
        },
        checkIfErrorForCardDetailsVisible: function (browser) {
          this.waitForElementVisible('@cardInfoMissing')
            .expect.element('@cardInfoMissing').to.be.present.before(SMALL_DELAY)
          return this
        },
        checkCardVerificationFailed: function(browser, done) {
          // "Promo code removed" error is reported earlier than payment
          // failed; and it is shown only in certain cases (1st run: not shown,
          // all subsequent runs: shown because of the address clash).  If we
          // see this error, then resubmit the form.
          const conditions = [
            {
              tag: 'promoCodeError',
              checkFn: (callback) => {
                const selector = this.elements.promoCodeError.selector
                asyncIsElementBySelectorPresent(browser, selector, callback)
              }
            },
            {
              tag: 'cardVerificationFailed',
              checkFn: (callback) => {
                const selector = this.elements.cardVerificationFailed.selector
                asyncIsElementBySelectorPresent(browser, selector, callback)
              }
            }
          ]

          const onPollDone = (pollResult, passedTag) => {
            if (pollResult === 'timeRanOut') {
              browser.assert.fail('Expected either promo code error or card verification failed error to be visible')
              done()
            } else if (passedTag === 'promoCodeError') {
              this.asyncResubmitAndExpectOnlyCardVerificationFailed(browser, done)
            } else if (passedTag === 'cardVerificationFailed') {
              done()
            }
          }

          const POLL_TIMEOUT_MS = 60000

          pollRace(conditions, onPollDone, POLL_TIMEOUT_MS)
        },
        asyncResubmitAndExpectOnlyCardVerificationFailed: function(browser, done) {
          this.goToNextStep()
          this.waitForElementVisible('@cardVerificationFailed')
          done()
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

          const POLL_TIMEOUT_MS = 60000

          pollRace(conditions, onPollDone, POLL_TIMEOUT_MS)
        },
        goToNextStep,
      }],
    },
  }
}
