const clickElement = require('../commands/clickElement');

module.exports = {
	url: function () {
		return this.api.launchUrl + '/menu'
	},

	sections: {
		menuContainer: {
			selector: '*[data-testing="menuContainer"]',

			elements: {
				mobileMenuToCheckout: {
					selector: '*[data-testing=mobileBoxSummaryButton]'
				},
				desktopMenuToCheckout: {
					selector: '*[data-testing=desktopBoxSummaryButton]'
				}
			},

			commands: [
				{
					goFromMenuToCheckout: function () { clickElement.call(this, this.api.globals.browser === 'mobile' ? '@mobileMenuToCheckout' : '@desktopMenuToCheckout') },
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
				addRecipe: function (numRecipes) {
					this
						.waitForElementVisible('@featured')
						.waitForElementVisible('@recipe1Add')
						// .click('@featured', function(click) { console.log(click) })
						.click('@recipe1Add')
						// .click('@recipe1Add', function(click) { console.log(click.status) })
						// .click('@recipe2Add', function(click) { console.log(click.status) })
						// .click('@recipe2Add')
						// .click('@menuBrowseCTAButton')

					return this
				},
				addRecipes: function () {
					this.api.execute(function() {
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
			selector: '*[data-testing="menuBottomBarDesktop"]',

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
			selector: '*[data-testing="menuBottomBarDesktop"]',

			elements: {
				menuBrowseCTAButton: {
					selector: '*[data-testing="menuBrowseCTAButton"]',
				},
			},

			commands: [{
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
				// .submit()
		},
	}],
}
