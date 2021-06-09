
declare namespace Cypress {
    interface Chainable {
      /**
       * Stub all third party Javascript libs
       * @example cy.stubAll3rdParties()
       */
      stubAll3rdParties(): Chainable<Element>
    }

    interface cy {
      bots: Bots | undefined;
    }
  }

  interface Bots {
    checkoutAccountBot: CheckoutAccountBot;
    menuBot: MenuBot;
    loginFormBot: LoginFormBot;
  }