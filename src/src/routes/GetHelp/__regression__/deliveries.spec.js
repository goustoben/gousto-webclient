import { setFeatureFlag, clickMyGousto } from './pageUtils/home/home'
import { clickCTABack, selectOrderIssue } from './pageUtils/help/getHelp'

const deliveryDate = new Date(2020, 4, 26)

describe('Given the customer is logged in and the order delivery is today', () => {
  before(() => {
    cy.server()

    cy.fixture('user/userCurrent').as('userCurrent')
    cy.route('GET', /user\/current/, '@userCurrent').as('userCurrentRequest')
    cy.fixture('user/userCurrentActiveSubscription').as('userCurrentSubscription')
    cy.route('GET', /user\/current\/subscription/, '@userCurrentSubscription').as('userCurrentSubscriptionRequest')
    cy.fixture('getHelp/user/userCurrentOrders').as('userCurrentOrders')
    cy.route('GET', /user\/current\/orders/, '@userCurrentOrders').as('userCurrentOrdersRequest')
    cy.fixture('getHelp/recipes/recipesWithIngredients').as('recipesWithIngredients')
    cy.route('GET', /recipes\/v2\/recipes/, '@recipesWithIngredients')
    cy.fixture('getHelp/ssr/validate').as('validate')
    cy.route('POST', /ssr\/v1\/ssr\/validate/, '@validate')
    cy.fixture('getHelp/order/order26May20').as('currentOrder')
    cy.route('GET', /order\/16269494/, '@currentOrder')
    cy.fixture('getHelp/deliveries/consignmentsWithoutTrackingUrl').as('consignmentsWithoutTrackingUrl')
    cy.route('GET', /deliveries\/v1.0\/consignments/, '@consignmentsWithoutTrackingUrl')

    cy.login()

    cy.visit('/')

    cy.wait(['@identifyRequest', '@userCurrentRequest'])

    cy.clock(deliveryDate.getTime(), ['Date'])
  })

  describe('When I click on My Gousto and Get Help with the Next box, and select Delivery issue', () => {
    before(() => {
      clickMyGousto()

      cy.get('[data-testing="nextBoxDeliveryHelp"] a').click()

      setFeatureFlag('isNewSSRDeliveriesEnabled')

      cy.wait(['@userCurrentSubscriptionRequest', '@userCurrentOrdersRequest'])
      selectOrderIssue('delivery')
    })

    it('shows the delivery issue page with the correct options', () => {
      cy.get('ul [data-testing="deliveryDontKnowWhen"]').should('exist')
      cy.get('ul [data-testing="deliveryDidntArrive"]').should('exist')
      cy.get('ul [data-testing="deliveryOtherIssue"]').should('exist')
    })

    describe('When there is no tracking link available', () => {
      describe('and they select "I don\'t know when my box will arrive"', () => {
        before(() => {
          cy.clock(deliveryDate.getTime(), ['Date'])

          cy.get('[data-testing="deliveryDontKnowWhen"]').click()
        })

        it('shows the correct heading', () => {
          cy.get('h2').contains('I don\'t know when my box will arrive')
        })

        it('shows estimated arrival time without tracking link', () => {
          cy.get('[data-testing="onDeliveryDayWithoutTrackingContent"]')
            .contains('Your box\'s estimated arrival time is 8am - 7pm')

          cy.get('[data-testing="onDeliveryDayWithoutTrackingContent"]')
            .should('not.contain', 'tracking link is available below')
        })

        it('shows a link to Contact Us page', () => {
          cy.get('[data-testing="onDeliveryDayWithoutTrackingContent"] a')
            .should('have.attr', 'href', '/get-help/contact')
        })

        it('View My Gousto and Track my box CTAs are not rendered', () => {
          cy.get('[data-testing="viewMyGoustoCTA"]').should('not.exist')
          cy.get('[data-testing="trackMyBoxCTA"]').should('not.exist')
        })
      })

      describe('and they select "My box did not arrive"', () => {
        before(() => {
          cy.clock(deliveryDate.getTime(), ['Date'])

          clickCTABack()

          cy.get('[data-testing="deliveryDidntArrive"]').click()
        })

        it('shows the correct heading', () => {
          cy.get('h2').contains('My box didn\'t arrive')
        })

        it('shows estimated arrival time without tracking link', () => {
          cy.get('[data-testing="onDeliveryDayWithoutTrackingContent"]')
            .contains('Your box\'s estimated arrival time is 8am - 7pm')

          cy.get('[data-testing="onDeliveryDayWithoutTrackingContent"]')
            .should('not.contain', 'try the tracking link below')
        })

        it('shows a link to Contact Us page', () => {
          cy.get('[data-testing="onDeliveryDayWithoutTrackingContent"] a')
            .should('have.attr', 'href', '/get-help/contact')
        })

        it('Get in Touch and Track my box CTAs are not rendered', () => {
          cy.get('[data-testing="getInTouchCTA"]').should('not.exist')
          cy.get('[data-testing="trackMyBoxCTA"]').should('not.exist')
        })
      })
    })

    describe('When there is a tracking link available', () => {
      describe('and they select "I don\'t know when my box will arrive"', () => {
        before(() => {
          cy.server()

          cy.fixture('getHelp/deliveries/consignmentsWithTrackingUrl').as('consignmentsWithTrackingUrl')
          cy.route('GET', /deliveries\/v1.0\/consignments/, '@consignmentsWithTrackingUrl')

          cy.clock(deliveryDate.getTime(), ['Date'])

          clickCTABack()

          cy.get('[data-testing="deliveryDontKnowWhen"]').click()
        })

        it('shows the correct heading', () => {
          cy.get('h2').contains('I don\'t know when my box will arrive')
        })

        it('shows estimated arrival time with tracking information', () => {
          cy.get('[data-testing="onDeliveryDayWithTrackingContent"]')
            .contains('Your box\'s estimated arrival time is 8am - 7pm')

          cy.get('[data-testing="onDeliveryDayWithTrackingContent"]')
            .contains('tracking link is available below')
        })

        it('shows a link to Contact Us page', () => {
          cy.get('[data-testing="onDeliveryDayWithTrackingContent"] a')
            .should('have.attr', 'href', '/get-help/contact')
        })

        it('View My Gousto and Track my box CTAs are rendered', () => {
          cy.get('[data-testing="viewMyGoustoCTA"]').should('exist')
          cy.get('[data-testing="trackMyBoxCTA"]').should('exist')
        })
      })

      describe('and they select "My box didn\'t arrive', () => {
        before(() => {
          cy.clock(deliveryDate.getTime(), ['Date'])

          clickCTABack()

          cy.get('[data-testing="deliveryDidntArrive"]').click()
        })

        it('shows the correct heading', () => {
          cy.get('h2').contains('Your box may still be on its way')
        })

        it('shows estimated arrival time with tracking information', () => {
          cy.get('[data-testing="onDeliveryDayWithTrackingContent"]')
            .contains('Your box\'s estimated arrival time is 8am - 7pm')

          cy.get('[data-testing="onDeliveryDayWithTrackingContent"]')
            .contains('try the tracking link below')
        })

        it('Get in Touch and Track my box CTAs are rendered', () => {
          cy.get('[data-testing="getInTouchCTA"]').should('exist')
          cy.get('[data-testing="trackMyBoxCTA"]').should('exist')
        })
      })
    })

    describe('When they select "I had another issue"', () => {
      before(() => {
        clickCTABack()
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
