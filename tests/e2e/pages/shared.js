const faker = require('faker')

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

        openLoginDialog: function () {
          this
            .safelyClick('@loginButton')
            .waitForElementVisible('@loginFormSubmit')
            .waitForElementToStopMoving('@loginFormSubmit')

          return this
        },
        completeLogin: function (userName, password) {
          this
            .clearValue('@loginEmail').setValue('@loginEmail', userName)
            .clearValue('@loginPassword').setValue('@loginPassword', password)
            .safelyClick('@loginFormSubmit')

          return this
        },
        logout: function () {
          this.safelyClick('@logoutButton')
        },


        submitPromo: function () {
          this
            .safelyClick('@promoModalButton')
            .waitForElementNotPresent('@promoModalButton')

          return this
        },
        isRememberMeCheckboxVisible: function () {
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
