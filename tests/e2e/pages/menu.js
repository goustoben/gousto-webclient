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
        featured: {
          selector: '*[data-reactid="171"]',
        },
        addRecipeButton: {
          selector: '*[data-testing="menuRecipeAdd"]',
        },
      },

      commands: [{
        checkIfRecipesVisible: function () {
          this
            .waitForElementPresent('@addRecipeButton')
            .expect.element('@addRecipeButton').to.be.visible

          return this
        },
        addRecipe: function () {
          this.executeAndThrowOnFailure(function() {
            const firstAddRecipe = document.querySelector("*[data-testing='menuRecipesList'] *[data-testing='menuRecipeAdd']")
            firstAddRecipe.click()
          })
        },
        addRecipes: function () {
          const nightwatchContext = this

          const addRecipeButtonSelector = nightwatchContext.elements.addRecipeButton.selector

          nightwatchContext.api.elements('css selector', addRecipeButtonSelector, result => {

            const status = result.status

            if (status !== 0){
              throw new Error(`Unexpected status ${status} when retrieving elements matching css selector "${addRecipeButtonSelector}". Full result was: ${JSON.stringify(result)}`)
            }

            const addRecipeButtonElements = result.value

            for (let i = 0; i < 3; i++) {
              addRecipe(i, addRecipeButtonElements, addRecipeButtonSelector, nightwatchContext)
            }
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

function clickElementWithIdAndOptionallyDismissInterceptingElementsByClickingThem(addRecipeButtonElementId, dismissableInterceptingElementSelectors, nightwatchContext, firstClickAttempt = true) {
  nightwatchContext.api.elementIdClick(addRecipeButtonElementId, result => {
    const status = result.status

    if (status !== 0) {
      if (firstClickAttempt && status === -1 && result.errorStatus === 64 && result.value.message.startsWith('element click intercepted')) {
        dismissableInterceptingElementSelectors.map(selectors => nightwatchContext.optionallyClickToDismiss(selectors))
        clickElementWithIdAndOptionallyDismissInterceptingElementsByClickingThem(addRecipeButtonElementId, dismissableInterceptingElementSelectors, nightwatchContext, false)
      } else {
        throw new Error(`Unexpected status ${status} when clicking element with ID "${addRecipeButtonElementId}". Full result was: ${JSON.stringify(result)}`)
      }
    }
  })
}

function addRecipe(recipeIndex, addRecipeButtonElements, addRecipeButtonSelector, nightwatchContext) {
  const addRecipeButtonElementId = addRecipeButtonElements[recipeIndex].ELEMENT

  nightwatchContext.executeAndThrowOnFailure(`document.querySelectorAll('${addRecipeButtonSelector}')[${recipeIndex}].scrollIntoView({ block: "center" })`, [])
  clickElementWithIdAndOptionallyDismissInterceptingElementsByClickingThem(
    addRecipeButtonElementId,
    [
      '[data-testing="promoModal"] [data-testing="modal-close-button"]',
      '[data-testing="spotlight-overlay"]',
      '[data-testing="tutorialStepCta"]',
      '.ReactModalPortal [data-testing="menuRecipeAdd"]',
    ],
    nightwatchContext
  );
}
