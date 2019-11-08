const faker = require('faker')
const webclient = require('../../../src/dist/webclient').default
const Immutable = require('immutable')
const RandExp = require('randexp')

const seed = Math.round(Math.random() * Math.pow(10, 17))
faker.seed(seed)
faker.locale = 'en_GB'

module.exports = {
  sections: {
    body: {
      selector: 'body',
      elements: {
        loginButton: {
          selector: '*[data-testing="loginButton"]',
        },
        logoutButton: {
          selector: '*[data-testing="logoutButton"]',
        },

        loginModal: {
          selector: '*[data-testing="loginModal"]',
        },

        loginErrMsg: {
          selector: '*[data-testing="loginErrMsg"]',
        },

        loginEmail: {
          selector: '*[data-testing="loginForm"] input[name="email"]'
        },

        loginPassword: {
          selector: '*[data-testing="loginForm"] input[name="password"]'
        },

        loginCheckbox: {
          selector: '*[data-testing="loginCheckbox"]'
        },

        loginFormSubmit: {
          selector: '*[data-testing="loginFormSubmit"]'
        },

        promoModal: {
          selector: '*[data-testing="promoModal"]'
        },

        promoModalButton: {
          selector: '*[data-testing="promoModalButton"]'
        },
        modalClose: {
          selector: '*[data-testing="modalClose"]'
        },
      },
      commands: [{
        fetchMenuLandingDays: function (cutoffDatetime = '') {
          const cutoffDatetimeFrom = cutoffDatetime ? cutoffDatetime : webclient.cutoffDateTimeNow()

          return webclient.apis.fetchAvailableDates()
            .then(function ({ data }) {
              const availableDays = data.pop().until

              return webclient.apis.fetchDeliveryDays('', {
                'filters[cutoff_datetime_from]': cutoffDatetimeFrom,
                'filters[cutoff_datetime_until]': availableDays,
                sort: 'date',
                direction: 'asc',
              })
            }).then(function ({ data }) {
              const availableDeliveryDays = webclient.getAvailableDeliveryDays(data, cutoffDatetimeFrom)
              const immutableDays = Immutable.fromJS(availableDeliveryDays)
              const state = {
                basket: Immutable.Map({}),
                features: Immutable.Map({}),
                boxSummaryDeliveryDays: immutableDays,
                user: Immutable.Map({}),
              }
              const landingDay = webclient.getLandingDay(state)

              const coreDayId = immutableDays.getIn([landingDay.date, 'coreDayId'])
              const slot = immutableDays.getIn([landingDay.date, 'slots']).find(slot => slot.get('id') === landingDay.slotId)

              return Promise.resolve({ coreDayId, slot })
            }).catch(function (error) {
              console.log(Error(error))
              throw error
            })
        },

        createOrder: function (numPortions = 2, numRecipes = 2, promoCode = '') {
          const order = {
            promo_code: promoCode,
          }

          return this.fetchMenuLandingDays()
            .then(function ({ coreDayId, slot }) {
              order.delivery_day_id = coreDayId
              order.delivery_slot_id = slot.get('coreSlotId')

              return Promise.all([
                webclient.apis.fetchRecipeStock('', coreDayId),
                webclient.apis.fetchRecipes('', '', { 'filters[available_on]': slot.get('whenCutoff') })
              ])
            }).then(function (menu) {
              const stock = menu[0].data
              const recipes = menu[1].data

              const availableRecipeIds = Object.keys(stock)
                .filter(function (recipeId) {
                  const numberKey = numRecipes === 2 ? 'number' : 'familyNumber'
                  const committed = stock[recipeId].committed === '1'
                  const numberAvail = stock[recipeId][numberKey]

                  return !committed || parseInt(numberAvail, 10) > 4
                })
                .filter(recipeId => recipes.map(recipe => recipe.id).includes(recipeId))

              const recipeChoices = availableRecipeIds.slice(0, numRecipes).map(function (recipeId) {
                return ({
                  type: 'Recipe',
                  id: recipeId,
                  quantity: numPortions,
                })
              })

              order.recipe_choices = recipeChoices

              return webclient.apis.createPreviewOrder(order)
            }).catch(function (error) {
              console.log(Error(error))
              throw error
            })
        },
        getCardToken: function (billingAddress) {
          const card = {
            number: "4242424242424242",
            expiryMonth: "09",
            expiryYear: "23",
            cvv: "100",
            name: "Test Test",
            billingDetails: {},
            requestSource: "JS"
          }

          return fetch('https://sandbox.checkout.com/api2/v2/tokens/card', {
            method: 'POST',
            headers: {
              'Authorization': 'pk_test_252a059e-8c44-40fe-9f4c-7acff20dd83a',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "name": "Test User",
              "number": "4242424242424242",
              "expiryMonth": "08",
              "expiryYear": "2028",
              "cvv": "100",
              "billingDetails": billingAddress
            })
          })
            .then(response => response.json())
            .then(response => {
              return Promise.resolve(response)
            })
        },

        createUser: function (userName, password) {
          const ukPostcode = new RandExp("^(GIR ?0AA|[A-PR-UWYZ]([0-9]{1,2}|([A-HK-Y][0-9]([0-9ABEHMNPRV-Y])?)|[0-9][A-HJKPS-UW]) ?[0-9][ABD-HJLNP-UW-Z]{2})$").gen()
          const ukPhone = '020 3011 1002'
          const pwd = password ? password : faker.internet.password()

          const userData = {
            customer: {
              phone_number: ukPhone,
              email: userName ? userName : faker.internet.email(),
              name_first: faker.name.firstName(),
              name_last: faker.name.lastName(),
              promo_code: '',
              password: pwd,
              age_verified: 0,
              salutation_id: 'mrs',
            },
            payment_method: {
              is_default: 1,
              type: 'card',
              name: 'My Card',
              card: {
                payment_provider: 'checkout',
                active: 1,
                card_token: ''
              },
            },
            addresses: {
              shipping_address: {
                type: 'shipping',
                name: '',
                line1: faker.address.streetAddress(),
                line2: '',
                line3: '',
                town: 'London',
                county: '',
                postcode: ukPostcode,
                delivery_instructions: 'Front Porch',
              },
              billing_address: {
                type: 'billing',
                name: '',
                line1: faker.address.streetAddress(),
                line2: '',
                line3: '',
                town: 'London',
                county: '',
                postcode: ukPostcode,
              },
            },
            subscription: {
              interval_id: 1,
            },
          }

          return Promise.all([this.createOrder(), this.fetchMenuLandingDays(), this.getCardToken(userData.addresses.billing_address)])
            .then(function (values) {
              const data = values[0].data
              const slot = values[1].slot
              userData.order_id = data.order.id
              userData.subscription.box_id = data.order.boxId
              userData.subscription.delivery_slot_id = slot.get('id')
              userData.payment_method.card.card_token = values[2].id

              return webclient.fetch('', `${webclient.endpoint('customers', 'v2')}/signup`, userData, 'POST')
            }).then(function ({ data: user }) {
              user.customer.password = pwd

              return user
            }).catch(function (error) {
              console.log(Error(error))
              throw error
            })
        },

        login: function (userName, password) {
          const shared = this.api.page.shared()

          if (this.api.globals.browser === 'mobile') {
            shared.section.header
              .openBurgerMenu()
              .burgerMenuNavigateLogin()
          } else {
            this.waitForElementVisible('@loginButton')
              .click('@loginButton')
          }
          this.waitForElementVisible('@loginModal')
            .waitForElementVisible('@loginEmail')
            .clearValue('@loginEmail').setValue('@loginEmail', userName)
            .clearValue('@loginPassword').setValue('@loginPassword', password)
            .click('@loginFormSubmit')

          return this
        },
        logout: function () {
          if (this.api.globals.browser === 'mobile') {
            const shared = this.api.page.shared()
            shared.section.header
              .openBurgerMenu()
              .burgerMenuNavigateLogout()
          } else {
            this.waitForElementVisible('@logoutButton')
              .click('@logoutButton')
          }
        },
        checkLoginErrMsg: function (msg) {
          this.waitForElementVisible('@loginErrMsg', 1000)
            .assert.visible('@loginErrMsg')
            .assert.containsText('@loginErrMsg', msg)

          return this
        },
        loginModalClosed: function () {
          this.waitForElementNotPresent('@loginModal')

          return this
        },

        //PROMO
        checkAgeRestricted: function () {
          this
            .waitForElementVisible('@promoModalCheckbox')

          return this
        },

        submitPromo: function () {
          this
            .waitForElementVisible('@promoModalButton')
            .click('@promoModalButton')

          return this
        },
        isRememberMeCheckboxVisible: function () {
          if (this.api.globals.browser === 'mobile') {
            const shared = this.api.page.shared()
            shared.section.header
              .openBurgerMenu()
              .burgerMenuNavigateLogin()
          } else {
            this.waitForElementVisible('@loginButton', 15000)
              .click('@loginButton')
          }
          this.expect.element('@loginCheckbox').to.be.selected
        },
      }],
    },

    header: {
      selector: '*[data-testing="header"]',
      elements: {
        myGoustoButtonLink: {
          selector: '*[data-testing="myGoustoButtonLink"]',
        },
        loginButton: {
          selector: '*[data-testing="loginButton"]',
        },
        logoutButton: {
          selector: '*[data-testing="logoutButton"]',
        },
        burgerMenu: {
          selector: '*[data-testing="burgerMenu"]',
        },
        burgerMenuLogin: {
          selector: '*[data-testing="burgerMenuLogin"]',
        },
        burgerMenuLogout: {
          selector: '*[data-testing="burgerMenuLogout"]',
        },
        linkMenuAccount: {
          selector: '*[data-testing="linkMenuAccount"]',
        }
      },
      commands: [{
        openBurgerMenu: function () {
          this.waitForElementVisible('@burgerMenu', 15000)
            .click('@burgerMenu')
          return this
        },
        burgerMenuNavigateLogin: function () {
          this.waitForElementVisible('@burgerMenuLogin', 15000)
            .click('@burgerMenuLogin')
          return this
        },
        burgerMenuNavigateLogout: function () {
          this.waitForElementVisible('@burgerMenuLogout')
            .click('@burgerMenuLogout')
          return this
        },
        goToAccount: function () {
          if (this.api.globals.browser === 'mobile') {
            this.waitForElementVisible('@linkMenuAccount')
              .click('@linkMenuAccount')
          }
        },
        checkUserLoggedIn: function () {
          if (this.api.globals.browser === 'mobile') {
            const shared = this.api.page.shared()

            shared.section.body.loginModalClosed()
            this.waitForElementVisible('@linkMenuAccount', 15000)
          } else {
            this.waitForElementVisible('@myGoustoButtonLink', 15000)
            this.expect.element('@myGoustoButtonLink').to.be.visible.before()
          }

          return this
        },
        checkUserLoggedOut: function () {
          if (this.api.globals.browser === 'mobile') {
            const shared = this.api.page.shared()

            shared.section.body.loginModalClosed()
            this.openBurgerMenu()
              .waitForElementVisible('@burgerMenuLogin', 15000)
          } else {
            return this.waitForElementPresent('@loginButton', 15000)
              .assert.elementPresent('@loginButton')
          }
        }
      }],
    },

    loginModal: {
      selector: '*[data-testing="loginModal"]',
      elements: {

      },
    }
  },

}
