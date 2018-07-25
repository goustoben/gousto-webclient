const faker = require('faker')
const clickElement = require('../commands/clickElement');
const goToNextStep = function () { clickElement.call(this, '@CTA') }

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
				aboutyou: {
					selector: '*[data-testing="checkoutAboutYouSection"]',

					elements: {
						firstNameInput: {
							selector: '*[data-testing="checkoutFirstNameInput"]',
						},
						lastNameInput: {
							selector: '*[data-testing="checkoutLastNameInput"]',
						},
						emailInput: {
							selector: '*[data-testing="checkoutEmailInput"]',
						},
						passwordInput: {
							selector: '*[data-testing="checkoutPasswordInput"]',
						},
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
						setEmail: function () {
							this
								.waitForElementVisible('@emailInput')
								.setValue('@emailInput', faker.internet.email())

							return this
						},
						setPassword: function () {
							this
								.waitForElementVisible('@passwordInput')
								.setValue('@passwordInput', faker.internet.password())

							return this
						},
					}],
				},
				delivery: {
					selector: '*[data-testing="checkoutDeliverySection"]',

					elements: {
						addressDropdown: {
							selector: '*[data-testing=checkoutAddressDropdown]',
						},
						secondOption: {
							selector: '*[data-testing=checkoutAddressDropdown] .Select-option:nth-of-type(2) > span',
						},
						secondOptionNative: {
							selector: '*[data-testing=checkoutAddressDropdown] option:nth-of-type(2)',
						},
						selectAddressCTA: {
							selector: '*[data-testing=checkoutSelectAddressCTA]',
						},
						phoneNumberInput: {
							selector: '*[data-testing=checkoutPhoneNumberInput]',
						},
					},

					commands: [{
						setAddress: function () {
							clickElement.call(this, '@addressDropdown')
							clickElement.call(this, this.api.globals.browser === 'mobile' ? '@secondOptionNative' : '@secondOption')
							clickElement.call(this, '@selectAddressCTA')
						},
						setPhoneNumber: function () {
							this
								.waitForElementVisible('@phoneNumberInput')
								.setValue('@phoneNumberInput', faker.phone.phoneNumberFormat(1))
						},
					}],
				},
				payment: {
					selector: '*[data-testing="checkoutPaymentSection"]',

					elements: {
						cardNameInput: {
							selector: '*[data-testing="checkoutCardNameInput"]',
						},
						cardNumberInput: {
							selector: '*[data-testing=checkoutCardNumberInput]',
						},
						cardSecurityCodeInput: {
							selector: '*[data-testing=checkoutCardSecurityCodeInput]',
						},
						cardExpiryMonthDropdown: {
							selector: '*[data-testing=checkoutCardExpiryMonthDropdown]',
						},
						cardExpiryYearDropdown: {
							selector: '*[data-testing=checkoutCardExpiryYearDropdown]',
						},
						dropdownOption: {
							selector: '.Select-option:nth-of-type(3) > span',
						},
						cardExpiryMonthDropdownOptionNative: {
							selector: '*[data-testing=checkoutCardExpiryMonthDropdown] option:nth-of-type(3)',
						},
						cardExpiryYearDropdownOptionNative: {
							selector: '*[data-testing=checkoutCardExpiryYearDropdown] option:nth-of-type(3)',
						},
					},

					commands: [{
						setCardName: function () {
							this
								.waitForElementVisible('@cardNameInput')
								.setValue('@cardNameInput', `${faker.name.firstName()} ${faker.name.lastName()}`)
						},
						setCardNumber: function () {
							this
								.waitForElementVisible('@cardNumberInput')
								.setValue('@cardNumberInput', '4462 0000 0000 0003')
						},
						setCardSecurityCode: function () {
							this
								.waitForElementVisible('@cardSecurityCodeInput')
								.setValue('@cardSecurityCodeInput', '123')
						},
						setCardExpiryMonth: function () {
							clickElement.call(this, '@cardExpiryMonthDropdown')
							clickElement.call(this, this.api.globals.browser === 'mobile' ? '@cardExpiryMonthDropdownOptionNative' : '@dropdownOption')
						},
						setCardExpiryYear: function () {
							clickElement.call(this, '@cardExpiryYearDropdown')
							clickElement.call(this, this.api.globals.browser === 'mobile' ? '@cardExpiryYearDropdownOptionNative' : '@dropdownOption')
						},
					}],
				}
			},

			commands: [{
				submitBoxDetailsSection: function () {
					this.section.boxdetails.checkIfRecipeSummaryVisible()

					return this
				},
				submitAboutYouSection: function () {
					this.section.aboutyou.setFirstName()
					this.section.aboutyou.setLastName()
					this.section.aboutyou.setEmail()
					this.section.aboutyou.setPassword()

					return this
				},
				submitDeliverySection: function () {
					this.section.delivery.setAddress()
					this.section.delivery.setPhoneNumber()

					return this
				},
				submitPaymentSection: function () {
					this.section.payment.setCardName()
					this.section.payment.setCardNumber()
					this.section.payment.setCardSecurityCode()
					this.section.payment.setCardExpiryMonth()
					this.section.payment.setCardExpiryYear()

					return this
				},
				goToNextStep,
			}],
		},
	}
}
