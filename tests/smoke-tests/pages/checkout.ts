import { random, datatype, internet, name, phone } from "faker";
import Page from "./page";

class Checkout extends Page {
  visit() {
    cy.visit("/check-out/account");
  }

  /**
   * Generates random email address, ending in -e2e
   * for easier debugging
   */
  createTaggedEmailAddress() {
    return `${random.alphaNumeric(20)}-e2e@${internet.domainName()}`;
  }

  createGoustoCompliantPassword() {
    return `${random.alphaNumeric(5)}${random
      .alpha({ count: 3 })
      .toUpperCase()}${datatype.number({ max: 999 })}`;
  }

  assertCheckoutConfirmation() {
    cy.findByText(/Congrats on ordering your first box/i, {
      timeout: 30 * 1000,
    }).should("exist");
  }

  clickContinueToDelivery() {
    cy.actAndWaitForInterceptors(
      () => cy.findByText(/Continue to Delivery/i).click(),
      [
        {
          method: "POST",
          url: "**/prospect",
        },
      ]
    );

    // Intercept second req if it happens
    // due to re-render/race condition
    cy.intercept(
      {
        method: "POST",
        url: "**/prospect",
      },
      {
        body: {
          status: "ok",
        },
      }
    );
  }

  clickContinueToPayment() {
    cy.findByText(/Continue to Payment/i).click();
  }

  clickStartYourSubscription(opts: { type: "card" | "paypal" }) {
    if (opts.type === "card") {
      cy.actAndWaitForInterceptors(() => {
        cy.findByText(/Start your subscription/i).click();
      }, [
        { method: "GET", url: "https://fpjscache.checkout.com/" },
        {
          method: "POST",
          url: "**/tokens",
        },
        {
          method: "POST",
          url: "**/payments/v1/payments/payment-auth*",
        },
      ]);
    } else {
      cy.findByText(/Start your subscription/i).click();
    }
  }

  clickPayWithPayPal() {
    cy.get('[data-funding-source="paypal"]').click();
  }

  selectPaymentMethod(method: "Card" | "PayPal") {
    cy.get('input[name="paymentMethod"]')
      .invoke("attr", "value")
      .should("equal", method)
      .check();
  }

  selectAddress() {
    cy.selectNthOption('select[data-testing="houseNo"]', 1, { force: true });
  }

  selectDeliveryDetailsInstruction() {
    cy.selectNthOption(
      'select[data-testing="checkoutDeliveryDetailsInstruction"]',
      1,
      { force: true }
    );
  }

  enterSignupEmail() {
    cy.get('input[type="email"]').type(this.createTaggedEmailAddress());
  }

  enterSignupPassword() {
    cy.get('input[type="password"]').type(this.createGoustoCompliantPassword());
  }

  enterFirstName() {
    cy.get('[data-testing="checkoutFirstNameInput"]').type(name.firstName());
  }

  enterLastName() {
    cy.get('[data-testing="checkoutLastNameInput"]').type(name.lastName());
  }

  enterPhoneNumber() {
    cy.get('[data-testing="checkoutPhoneNumberInput"]').type(
      phone.phoneNumber("07777######")
    );
  }

  enterCardNumber(cardNumber = this.defaultData.payment.card.cardNumber) {
    cy.getIframeBody("iframe#cardNumber")
      .find("input#checkout-frames-card-number")
      .type(cardNumber);
  }

  enterNameOnCard() {
    cy.get('[data-testing="checkoutCardNameInput"]').type(
      `${name.firstName()} ${name.lastName()}`
    );
  }

  enterCardExpiry(expiryYear = this.defaultData.payment.card.expiry.year) {
    cy.getIframeBody("iframe#expiryDate")
      .find("input#checkout-frames-expiry-date")
      .type(`01${expiryYear}`);
  }

  enterCVV(cvv = this.defaultData.payment.card.CVV) {
    cy.getIframeBody("iframe#cvv").find("input#checkout-frames-cvv").type(cvv);
  }

  enter3DSPassword(password = this.defaultData.payment.card["3DSPassword"]) {
    cy.get('iframe[title="3DS frame"]').wait(10 * 1000);

    const innerIframe = cy
      .getIframeBody('iframe[title="3DS frame"]')
      .children("iframe")
      .its("0.contentDocument.body", { log: false })
      .should("not.be.empty")
      .then(cy.wrap);

    const form = innerIframe.find("form#form").as("3DS form");

    form.find("input#password").type(password);
    cy.get("@3DS form").submit();
  }

  waitForOrderSummary() {
    cy.findAllByText(/Price per serving/i);
  }
}

export const checkout = new Checkout();
