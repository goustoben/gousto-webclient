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
              .waitForElementVisible('[data-testing="boxSummaryContinueButton"]')
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
          clickContinueAfterPostcodeWasEntered: function () {
            this
              .waitForElementVisible('[data-testing="menuSubmitPostcode"]')
              .executeAndThrowOnFailure(function () {
                const continueButton = document.querySelector('[data-testing="menuSubmitPostcode"]')
                continueButton.click()
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
        addRecipes: async function () {
          const nightwatchContext = this

          const addRecipeButtonSelector = nightwatchContext.elements.addRecipeButton.selector

          for (let i = 0; i < 3; i++) {
            try {
              await addRecipe(i, addRecipeButtonSelector, nightwatchContext)
            } catch (err) {
              throw new Error(`Unable to click add recipe button: selector=${addRecipeButtonSelector}; index=${i}; error=${JSON.stringify(err)}`)
            }
          }
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

function clickElementWithIdAndOptionallyDismissInterceptingElementsByClickingThem(addRecipeButtonUUID, dismissableInterceptingElementSelectors, nightwatchContext, firstClickAttempt = true) {
  nightwatchContext.api.elementIdClick(addRecipeButtonUUID, result => {
    const status = result.status

    if (status !== 0) {
      if (firstClickAttempt && status === -1 && result.errorStatus === 64 && result.value.message.startsWith('element click intercepted')) {
        dismissableInterceptingElementSelectors.map(selectors => nightwatchContext.optionallyClickToDismiss(selectors))
        clickElementWithIdAndOptionallyDismissInterceptingElementsByClickingThem(addRecipeButtonUUID, dismissableInterceptingElementSelectors, nightwatchContext, false)
      } else {
        throw new Error(`Unexpected status ${status} when clicking element with ID "${addRecipeButtonUUID}". Full result was: ${JSON.stringify(result)}`)
      }
    }
  })
}

async function addRecipe(recipeIndex, addRecipeButtonSelector, nightwatchContext) {
  nightwatchContext.executeAndThrowOnFailure(`document.querySelectorAll('${addRecipeButtonSelector}')[${recipeIndex}].scrollIntoView({ block: "center" })`, [])

  const addRecipeButtonUUID = await getNightwatchUUID(nightwatchContext, addRecipeButtonSelector, recipeIndex)

  clickElementWithIdAndOptionallyDismissInterceptingElementsByClickingThem(
    addRecipeButtonUUID,
    [
      '[data-testing="promoModal"] [data-testing="modal-close-button"]',
      '[data-testing="spotlight-overlay"]',
      '[data-testing="tutorialStepCta"]',
      '.ReactModalPortal [data-testing="menuRecipeAdd"]',
    ],
    nightwatchContext
  );
}

async function getNightwatchUUID(nightwatchContext, cssSelector, index = 0) {
  return new Promise((resolve, reject) => {
    nightwatchContext.api.elements('css selector', cssSelector, result => {
      if (result.status !== 0) {
        reject(result)
      } else {
        resolve(result.value[index].ELEMENT)
      }
    })
  })
}
