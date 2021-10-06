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
              .executeAndThrowOnFailure(function () {
                const checkoutButton = document.querySelector('[data-testing="boxSummaryButton"]')
                checkoutButton.click()
            })
          },
          clickNextButton: function () {
            this
              .executeAndThrowOnFailure(function () {
                const checkoutButton = document.querySelector('[data-testing="boxSummaryArrow"]')
                checkoutButton.click()
              })
          },
          clickContinueButton: function () {
            this
              .executeAndThrowOnFailure(function () {
                const continueButton = document.querySelector('[data-testing="boxSummaryContinueButton"]')
                continueButton.click()
              })
          },
          clickDateOfExistingOrder: function () {
            this
              .executeAndThrowOnFailure(function () {
                const getDateSlots = () => document.querySelectorAll("*[data-testing='dateSlot']")
                let dates = Array.from(getDateSlots())
                let firstAvailableDate = dates.find(date => date.querySelector("*[data-testing='icon-full-box']"))
                firstAvailableDate.click()
              })
          },
          clickDateOfNewOrder: function () {
            this.executeAndThrowOnFailure(function () {
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
          this.executeAndThrowOnFailure(function() {
            const firstAddRecipe = document.querySelector("*[data-testing='menuRecipesList'] *[data-testing='menuRecipeAdd']")
            firstAddRecipe.click()
          })
        },
        addRecipes: function () {
          this.executeAndThrowOnFailure(function () {
            const getButtons = () => document.querySelectorAll("*[data-testing='menuRecipeAdd']")
            const getPopupButton = () => document.querySelector('.ReactModalPortal [data-testing="menuRecipeAdd"]')
            let addRecipeButtons = getButtons()
            let popupButton

            addRecipeButtons[0].click()
            popupButton = getPopupButton()

            if(popupButton) popupButton.click()

            addRecipeButtons = getButtons()
            addRecipeButtons[1].click()
            popupButton = getPopupButton()

            if(popupButton) popupButton.click()

            addRecipeButtons = getButtons()

            addRecipeButtons[2].click()
            popupButton = getPopupButton()

            if(popupButton) popupButton.click()
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
        clickBrowseCTA: function () { this.safelyClick('@menuBrowseCTAButton') },
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
