Cypress.Commands.overwrite("visit", (originalFn, url, options) => {
  return originalFn(url, {
    options,
    ...{
      headers: {
        "gousto-waf-access-token": Cypress.env("WAF_ACCESS_TOKEN"),
      },
    },
  });
});
