const clickElement = require('../commands/clickElement');

module.exports = {
  url: function () {
    return this.api.launchUrl + '/menu'
  },

  sections: {
    menuContainer: {
      selector: '*[data-testing="menuContainer"]',

      commands: [
        {
          goFromMenuToCheckout: function () {
            this
              .api.execute(function () {
                const checkoutButton = document.querySelector('[data-testing="boxSummaryButton"]')
                checkoutButton.click()
              })
          },
          clickNextButton: function () {
            this
              .api.execute(function () {
                const checkoutButton = document.querySelector('[data-testing="boxSummaryArrow"]')
                checkoutButton.click()
              })
          },
          clickContinueButton: function () {
            this
              .api.execute(function () {
                const continueButton = document.querySelector('[data-testing="boxSummaryContinueButton"]')
                continueButton.click()
              })
          },
          clickBackToAllRecipesButton: function () {
            this
              .api.execute(function () {
                const backToAllRecipesButton = document.querySelector('[data-testing="backToAllRecipes"]')
                backToAllRecipesButton.click()
              })
          },
          clickDateOfExistingOrder: function () {
            this
              .api.execute(function () {
                const getDateSlots = () => document.querySelectorAll("*[data-testing='dateSlot']")
                let dates = Array.from(getDateSlots())
                let firstAvailableDate = dates.find(date => date.querySelector("*[data-testing='icon-full-box']"))
                firstAvailableDate.click()
              })
          },
          clickDateOfNewOrder: function () {
            this.api.execute(function () {
              const getDateSlots = () => document.querySelectorAll("*[data-testing='dateSlot']")
              let dates = Array.from(getDateSlots())
              let firstAvailableDate = dates.find(date => !date.querySelector("*[data-testing='icon-full-box']"))
              firstAvailableDate.click()
            })
          },
        }
      ]
    },
    recipes: {
      selector: '*[data-testing="menuRecipes"]',

      elements: {
        recipeList: {
          selector: '*[data-testing="menuRecipesList"]',
        },
        featured: {
          selector: '*[data-reactid="171"]',
        },
        recipe1Add: {
          selector: '*[data-testing="menuRecipeAdd"]',
          index: 2,
        },
        recipe2Add: {
          selector: '*[data-testing="menuRecipeAdd"]',
        },
      },

      commands: [{
        checkIfRecipesVisible: function () {
          this
            .waitForElementPresent('@recipeList')
            .expect.element('@recipeList').to.be.visible

          return this
        },
        addRecipe: function () {
          this.api.execute(function() {
            const firstAddRecipe = document.querySelector("*[data-testing='menuRecipesList'] *[data-testing='menuRecipeAdd']")
            firstAddRecipe.click()
          })
        },
        addRecipes: function () {
          this.api.execute(function () {
            const getButtons = () => document.querySelectorAll("*[data-testing='menuRecipeAdd']")
            let addRecipeButtons = getButtons()

            addRecipeButtons[0].click()
            addRecipeButtons[1].click()
            addRecipeButtons = getButtons()
            addRecipeButtons[2].click()
          })
        },
      }],
    },

    boxSummaryDesktop: {
      selector: '*[data-testing="boxSummary"]',
      elements: {
        menuPostcodeInput: {
          selector: '*[data-testing="menuPostcodeInput"]'
        },

        menuSubmitPostcode: {
          selector: '*[data-testing="menuSubmitPostcode"]'
        },
      },

      commands: [{
        setPostcode: function (postcode) {
          this.
            setValue('@menuPostcodeInput', postcode)

          return this
        },

        submit: function () {
          this.
            click('@menuSubmitPostcode')

          return this
        },
      }],
    },

    bottomBar: {
      selector: '*[data-testing="boxSummary"]',

      elements: {
        menuBrowseCTAButton: {
          selector: '*[data-testing="menuBrowseCTAButton"]',
        },
        boxSummaryButtonSpinner: {
          selector: '*[data-testing="boxSummaryButtonSpinner"]',
        },
      },

      commands: [{
        checkIfCheckoutButtonClickable: function () {
          this
            .waitForElementNotVisible('@boxSummaryButtonSpinner')
            .expect.element('@boxSummaryButtonSpinner').to.have.css('display').which.equals('none')

          return this
        },
        clickBrowseCTA: function () { clickElement.call(this, '@menuBrowseCTAButton') },
      }],
    },
  },

  commands: [{
    pickRecipes: function (numRecipes, postcode) {
      this.section.recipes.addRecipe()
      this.section.bottomBar.clickBrowseCTA()
      this.section.boxSummaryDesktop
        .setPostcode(postcode)
    },
  }],
}
