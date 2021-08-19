import { setFeatureFlag, clickMyGousto } from './pageUtils/home/home'
import { selectOrderIssue } from './pageUtils/help/getHelp'
import { setMocksLoginHomePage } from './mocksSetters/mocksSetters'

const dateAfterBoxDelivered = new Date(2020, 4, 28)
const dateBoxDeliveryToday = new Date(2020, 4, 26)

describe('Given I am logged in and visit the home page', () => {
  beforeEach(() => {
    cy.stubAll3rdParties()
    cy.server()
    setMocksLoginHomePage()
  })

  describe('When I visit My Gousto and click "Any issues with this box?" on last delivery', () => {
    beforeEach(() => {
      cy.fixture('getHelp/recipes/recipesWithIngredients').as('recipesWithIngredients')
      cy.route('GET', /recipes\/v2\/recipes/, '@recipesWithIngredients').as('recipesWithIngredientsRoute')
      cy.fixture('getHelp/order/order26May20').as('currentOrder')
      cy.route('GET', /order\/16269494/, '@currentOrder')

      cy.clock(dateAfterBoxDelivered.getTime(), ['Date'])
      cy.wait(['@userCurrentSubscriptionRequest', '@userCurrentOrdersRequest'])

      clickMyGousto()

      cy.get('[data-testing="PreviousOrderGetHelpCTA"]').click()
    })

    describe('and my order delivery was due before today', () => {
      beforeEach(() => {
        cy.clock(dateAfterBoxDelivered.getTime(), ['Date'])
      })

      describe('and I select Delivery issue', () => {
        beforeEach(() => {
          setFeatureFlag('isNewSSRDeliveriesEnabled')
          selectOrderIssue('delivery')
        })

        describe('and I am eligible for Delivery refund', () => {
          beforeEach(() => {
            cy.fixture('getHelp/ssrdeliveries/validateDeliveriesValid').as('validateDeliveriesValid')
            cy.route('POST', /ssrdeliveries\/v1\/ssrdeliveries\/validate/, '@validateDeliveriesValid')
          })

          describe('and I click Didnt arrive', () => {
            beforeEach(() => {
              cy.fixture('getHelp/deliveries/consignmentsWithoutTrackingUrl').as('consignmentsWithoutTrackingUrl')
              cy.route('GET', /deliveries\/v1.0\/consignments/, '@consignmentsWithoutTrackingUrl')

              cy.get('[data-testing="deliveryDidntArrive"]').click()

              cy.get('[data-testing="deliveryCompensationContent"]')
                .contains('As an apology, here\'s £26.95 credit on your next Gousto order.')
            })

            describe('and I accept offered credit', () => {
              beforeEach(() => {
                cy.fixture('getHelp/ssrdeliveries/refund').as('refundDeliveries')
                cy.route('POST', /ssrdeliveries\/v1\/ssrdeliveries\/refund/, '@refundDeliveries')

                cy.get('[data-testing="acceptCreditCTA"]').click()
              })

              it('shows Thank you page with the information about applied credit', () => {
                cy.url().should('include', 'confirmation')
                cy.contains('£26.95 credit added')
                cy.get('[data-testing="doneCTA"]').should('exist')
              })
            })

            describe('and I do not accept offered credit', () => {
              beforeEach(() => {
                cy.get('[data-testing="contactUsCTA"]').click()
              })

              it('shows Contact us page', () => {
                cy.url().should('include', 'contact')
                cy.contains('chat')
                cy.contains('email')
                cy.contains('phone')
              })
            })
          })
        })
      })
    })
  })

  describe('When the box delivery date is today', () => {
    beforeEach(() => {
      cy.fixture('getHelp/order/order26May20').as('currentOrder')
      cy.route('GET', /order\/16269494/, '@currentOrder')
      cy.fixture('getHelp/recipes/recipesWithIngredients').as('recipesWithIngredients')
      cy.route('GET', /recipes\/v2\/recipes/, '@recipesWithIngredients').as('recipesWithIngredientsRoute')
      cy.clock(dateBoxDeliveryToday.getTime(), ['Date'])
    })

    describe('When I visit My Gousto and click "Any issues with this box?" on upcoming delivery', () => {
      beforeEach(() => {
        clickMyGousto()

        cy.get('[data-testing="myGoustoNextBoxHelpCTA"]').click()
      })

      describe('and I select Delivery issue', () => {
        beforeEach(() => {
          cy.wait(['@userCurrentSubscriptionRequest', '@userCurrentOrdersRequest', '@recipesWithIngredientsRoute'])
          setFeatureFlag('isNewSSRDeliveriesEnabled')
          selectOrderIssue('delivery')
        })

        describe('When there is no tracking link available', () => {
          beforeEach(() => {
            cy.fixture('getHelp/deliveries/consignmentsWithoutTrackingUrl').as('consignmentsWithoutTrackingUrl')
            cy.route('GET', /deliveries\/v1.0\/consignments/, '@consignmentsWithoutTrackingUrl')
          })

          describe('and they select "I don\'t know when my box will arrive"', () => {
            beforeEach(() => {
              cy.get('[data-testing="deliveryDontKnowWhen"]').click()
            })

            it('shows the correct information', () => {
              cy.get('h2').contains('I don\'t know when my box will arrive')

              cy.get('[data-testing="onDeliveryDayWithoutTrackingContent"]')
                .contains('Your box\'s estimated arrival time is 8am - 7pm')

              cy.get('[data-testing="onDeliveryDayWithoutTrackingContent"]')
                .should('not.contain', 'tracking link is available below')

              cy.get('[data-testing="onDeliveryDayWithoutTrackingContent"] a')
                .should('have.attr', 'href', '/get-help/contact')

              cy.get('[data-testing="viewMyGoustoCTA"]').should('not.exist')
              cy.get('[data-testing="trackMyBoxCTA"]').should('not.exist')
            })
          })

          describe('and they select "My box didn\'t arrive', () => {
            beforeEach(() => {
              cy.get('[data-testing="deliveryDidntArrive"]').click()
            })

            it('shows the correct information', () => {
              cy.get('h2').contains('My box didn\'t arrive')

              cy.get('[data-testing="onDeliveryDayWithoutTrackingContent"]')
                .contains('Your box\'s estimated arrival time is 8am - 7pm')

              cy.get('[data-testing="onDeliveryDayWithoutTrackingContent"]')
                .should('not.contain', 'try the tracking link below')

              cy.get('[data-testing="onDeliveryDayWithoutTrackingContent"] a')
                .should('have.attr', 'href', '/get-help/contact')

              cy.get('[data-testing="getInTouchCTA"]').should('not.exist')
              cy.get('[data-testing="trackMyBoxCTA"]').should('not.exist')
            })
          })
        })

        describe('When there is a tracking link available', () => {
          beforeEach(() => {
            cy.fixture('getHelp/deliveries/consignmentsWithTrackingUrl').as('consignmentsWithTrackingUrl')
            cy.route('GET', /deliveries\/v1.0\/consignments/, '@consignmentsWithTrackingUrl')
          })

          describe('and they select "I don\'t know when my box will arrive"', () => {
            beforeEach(() => {
              cy.get('[data-testing="deliveryDontKnowWhen"]').click()
            })

            it('shows the correct information', () => {
              cy.get('h2').contains('I don\'t know when my box will arrive')

              cy.get('[data-testing="onDeliveryDayWithTrackingContent"]')
                .contains('Your box\'s estimated arrival time is 8am - 7pm')

              cy.get('[data-testing="onDeliveryDayWithTrackingContent"]')
                .contains('tracking link is available below')

              cy.get('[data-testing="onDeliveryDayWithTrackingContent"] a')
                .should('have.attr', 'href', '/get-help/contact')

              cy.get('[data-testing="viewMyGoustoCTA"]').should('exist')
              cy.get('[data-testing="trackMyBoxCTA"]').should('exist')
            })
          })

          describe('and they select "My box didn\'t arrive', () => {
            beforeEach(() => {
              cy.get('[data-testing="deliveryDidntArrive"]').click()
            })

            it('shows the correct information', () => {
              cy.get('h2').contains('Your box may still be on its way')

              cy.get('[data-testing="onDeliveryDayWithTrackingContent"]')
                .contains('Your box\'s estimated arrival time is 8am - 7pm')

              cy.get('[data-testing="onDeliveryDayWithTrackingContent"]')
                .contains('try the tracking link below')

              cy.get('[data-testing="getInTouchCTA"]').should('exist')
              cy.get('[data-testing="trackMyBoxCTA"]').should('exist')
            })
          })
        })

        describe('When they select "I had another issue"', () => {
          beforeEach(() => {
            cy.get('[data-testing="deliveryOtherIssue"]').click()
          })

          it('shows Contact Us page', () => {
            cy.url().should('include', 'contact')
            cy.contains('chat')
            cy.contains('email')
            cy.contains('phone')
          })
        })
      })
    })
  })
})
