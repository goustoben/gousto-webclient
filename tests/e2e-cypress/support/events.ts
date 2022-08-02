/**
 * Prevents failing test on unhandled exceptions
 * @example "Valid token required" when in logged-out state
 */
Cypress.on("uncaught:exception", (err) => {
  Cypress.log({
    message: `Uncaught exception: ${JSON.stringify(err, null, 4)}`,
  });

  return false;
});
