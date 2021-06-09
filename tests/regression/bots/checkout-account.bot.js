import { GoustoTestBot } from "./gousto-test.bot"

const checkoutAccountPageSelectors = {
  dataTesting: {
    INFO_ORDER_SUMMARY: 'checkoutOrderSummary',
    INFO_TOTAL_PRICE: 'totalPrice'
  },
}

class CheckoutAccountBot extends GoustoTestBot {
  getCheckoutOrderSummary(opts) { return this.getByDataTestingName('INFO_ORDER_SUMMARY', opts) }

  getTotalPrice(opts) { return this.getByDataTestingName('INFO_TOTAL_PRICE', opts) }

  checkoutCompletesIn(seconds) {
    return this.getCheckoutOrderSummary({ timeout: seconds * 1000 }).should('be.visible')
  }  

  assertOrderSummaryIsVisible(opts) {
    return this.getCheckoutOrderSummary(opts).should('be.visible')
  }

  assertOrderPrice(value, opts) {
    return this.getTotalPrice(opts).should(($el) => {
      expect($el).to.contain(value)
    })
  }
}

export const checkoutAccountBot = new CheckoutAccountBot(checkoutAccountPageSelectors)
