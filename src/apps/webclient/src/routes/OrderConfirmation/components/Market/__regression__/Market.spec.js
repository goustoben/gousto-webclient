import { withPlatformTags, MOBILE, WEB } from '../../../../../utils/regression/tags'
import {
  initialize,
  stubMarketplace,
  marketAddProduct,
  marketAddAndRemoveLimitReachedProduct,
  marketUpdateAddProductOrder,
  marketUpdateRemoveProductOrder,
  marketOrderSummaryContainsProduct,
  marketVisible,
  stubUserAndOrders,
} from './pageUtils/market'

describe('Given I am on the order confirmation page', () => {
  describe('And I have a valid order in my basket', () => {
    const productName = 'Seedlip - Spice (200ml)'

    const testSuite = (ageVerified) => {
      describe(`And my age ${ageVerified ? 'is' : 'is not'} verified`, () => {
        before(() => {
          stubMarketplace(ageVerified)
          initialize()
        })

        beforeEach(() => stubUserAndOrders())

        it('Then I should see Marketplace', () => {
          marketVisible()
        })

        it('And I see the correct number of categories', () => {
          cy.get('[data-testid="MarketPresentation"]')
            .find('nav')
            .find('li')
            .should('have.length', 8)
        })

        it('And I see the correct number of products', () => {
          cy.get('[data-testid="MarketPresentation"]')
            .find('nav li')
            .first()
            .contains('All Products (20)')

          cy.get('[data-testid="MarketPresentation"]')
            .find('[data-testing="productItem"]')
            .should('have.length', 20)
        })

        it('And I can select a category and add/remove products', () => {
          cy.get('[data-testid="MarketPresentation"]')
            .find('nav li')
            .eq(3)
            .contains('Drinks Cabinet (3)')
            .click()

          cy.get('[data-testid="MarketPresentation"]')
            .find('[data-testing="productItem"]')
            .should('have.length', 3)

          marketAddProduct(productName, ageVerified)
          marketAddAndRemoveLimitReachedProduct()

          marketOrderSummaryContainsProduct(productName)

          marketUpdateAddProductOrder()

          marketOrderSummaryContainsProduct(productName)

          cy.get('[data-testing="productItem"]').eq(0).contains(/^-$/).click()

          marketUpdateRemoveProductOrder()

          cy.get('[data-testing="item-product"]').should('not.exist')
        })
      })
    }

    withPlatformTags(WEB).describe('And I am on Desktop', () => {
      testSuite(true)
      testSuite(false)
    })

    withPlatformTags(MOBILE).describe('And I am on Mobile', () => {
      testSuite(true)
      testSuite(false)
    })
  })
})
