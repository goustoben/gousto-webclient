const clickElement = require('../commands/clickElement');
const openRecipesChosenCard = function () { clickElement.call(this, '@recipesChosenCard') }
const checkIfSectionsVisible = function () {
  this
    .waitForElementPresent('@recipesPricingDetailSection')
    .expect.element('@recipesPricingDetailSection').to.be.visible
  this
    .waitForElementPresent('@recipesDeliverySection')
    .expect.element('@recipesDeliverySection').to.be.visible

  return this
}

module.exports = {
  url: function () {
    return this.api.launchUrl + '/mydeliveries'
  },

  sections: {
    allCardsStep: {
      selector: '*[data-testing="myDeliveries"]',

      elements: {
        recipesChosenCard: {
          selector: '*[data-testing="recipesChosenCard"]',
        },
      },

      commands: [{
        openRecipesChosenCard,
      }],
    },
    recipesChosenCardStep: {
      selector: '*[data-testing="myDeliveries"]',

      elements: {
        recipesPricingDetailSection: {
          selector: '*[data-testing="recipesPricingDetailSection"]',
        },
        recipesDeliverySection: {
          selector: '*[data-testing="recipesDeliverySection"]',
        },
      },

      commands: [{
        checkIfSectionsVisible,
      }],
    },
  },
}
