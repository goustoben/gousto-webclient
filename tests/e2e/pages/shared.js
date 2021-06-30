const faker = require('faker')
const webclient = require('../../../src/dist/webclient').default
const Immutable = require('immutable')
const RandExp = require('randexp')

const ANIMATION_DELAY = 500

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

        loginEmail: {
          selector: '*[data-testing="inputLoginEmail"]'
        },

        loginPassword: {
          selector: '*[data-testing="inputLoginPassword"]'
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

          return webclient.apis.fetchDeliveryDays('', cutoffDatetimeFrom, '', false, null)
            .then(function ({ data }) {
              const availableDeliveryDays = webclient.getAvailableDeliveryDays(data, cutoffDatetimeFrom)
              const immutableDays = Immutable.fromJS(availableDeliveryDays)
              const state = {
                basket: Immutable.Map({}),
                features: Immutable.Map({}),
                boxSummaryDeliveryDays: immutableDays,
                user: Immutable.Map({}),
                auth: Immutable.Map({}),
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
                webclient.apis.fetchMenus('', {})
              ])
            }).then(function ([{ data: stock }, { data: [currentMenu]}]) {
              const menuRecipeIds = currentMenu.relationships.recipes.data.map(recipe => recipe.core_recipe_id)

              const availableRecipeIds = Object.keys(stock)
                .filter(function (recipeId) {
                  const numberKey = numRecipes === 2 ? 'number' : 'familyNumber'
                  const committed = stock[recipeId].committed === '1'
                  const numberAvail = stock[recipeId][numberKey]

                  return !committed || parseInt(numberAvail, 10) > 4
                })
                .filter(recipeId => menuRecipeIds.includes(recipeId))

              const recipeChoices = availableRecipeIds.slice(0, numRecipes).map(function (recipeId) {
                return ({
                  type: 'Recipe',
                  id: recipeId,
                  quantity: numPortions,
                })
              })

              console.log('Available recipe choice Ids: ', JSON.stringify(availableRecipeIds))
              console.log('Available recipe choices: ', JSON.stringify(recipeChoices))

              order.recipe_choices = recipeChoices

              return webclient.apis.createPreviewOrder(order)
            }).catch(function (error) {
              console.log(Error(error))
              throw error
            })
        },
        getCardToken: function (billingAddress) {
          return fetch('https://sandbox.checkout.com/api2/v2/tokens/card', {
            method: 'POST',
            headers: {
              'Authorization': 'pk_test_252a059e-8c44-40fe-9f4c-7acff20dd83a',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "name": "Test User",
              "number": "4485040371536584",
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
          const ukPostcode = 'WC2E9JT'
          const ukPhone = '7575757575'
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
                name: 'home',
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
                name: 'home',
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

              return webclient.fetch('', `${webclient.endpoint('customers', 2)}/signup`, userData, 'POST')
            }).then(function ({ data: user }) {
              user.customer.password = pwd

              return user
            }).catch(function (error) {
              console.log(Error(error))
              throw error
            })
        },

        login: function (userName, password) {
          this.waitForElementVisible('@loginButton')
            .click('@loginButton')

          this.waitForElementVisible('@loginModal')
            .waitForElementVisible('@loginEmail')
            .clearValue('@loginEmail').setValue('@loginEmail', userName)
            .clearValue('@loginPassword').setValue('@loginPassword', password)
            .click('@loginFormSubmit')

          this.api.pause(ANIMATION_DELAY)

          return this
        },
        logout: function () {
          this.waitForElementVisible('@logoutButton')
            .click('@logoutButton')
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
          this.api.pause(ANIMATION_DELAY)

          return this
        },
        isRememberMeCheckboxVisible: function () {
          this.waitForElementVisible('@loginButton')
            .click('@loginButton')

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
          this.waitForElementVisible('@burgerMenu')
            .click('@burgerMenu')
          return this
        },
        burgerMenuNavigateLogin: function () {
          this.waitForElementVisible('@burgerMenuLogin')
            .click('@burgerMenuLogin')
          return this
        },
        burgerMenuNavigateLogout: function () {
          this.waitForElementVisible('@burgerMenuLogout')
            .click('@burgerMenuLogout')
          return this
        },
        goToAccount: function () {},
        checkUserLoggedIn: function () {
          this.waitForElementVisible('@myGoustoButtonLink')
          this.expect.element('@myGoustoButtonLink').to.be.visible.before()

          return this
        },
        checkUserLoggedOut: function () {
          return this.waitForElementPresent('@loginButton')
            .assert.elementPresent('@loginButton')
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
