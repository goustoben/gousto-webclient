beforeEach(() => {
  cy.clearLocalStorage();
  cy.clearCookies();

  cy.setCookie(
    "v1_cookie_policy_v2",
    encodeURIComponent(JSON.stringify({ isAccepted: true })) // Move this encode/decode into command
  );
});
