import { home, signup, menu, checkout } from '../pages'

describe('Signup', () => {
  beforeEach(() => {
    home.visit()
  })

  it('With Card', () => {
    home.clickGetStarted()

    signup.clickClaimDiscount()
    signup.clickChooseBox('regular')
    signup.enterPostcode()
    signup.clickConfirmDeliveryDay()
    signup.clickSeeThisWeeksMenu()

    menu.addNRecipes()
    menu.clickCheckout()

    checkout.waitForOrderSummary()
    checkout.enterSignupEmail()
    checkout.enterSignupPassword()
    checkout.clickContinueToDelivery()
    checkout.enterFirstName()
    checkout.enterLastName()
    checkout.selectAddress()
    checkout.enterPhoneNumber()
    checkout.selectDeliveryDetailsInstruction()
    checkout.clickContinueToPayment()
    checkout.enterCardNumber()
    checkout.enterNameOnCard()
    checkout.enterCardExpiry()
    checkout.enterCVV()
    checkout.clickStartYourSubscription({ type: 'card' })

    checkout.assertCheckoutConfirmation()
  })
})
