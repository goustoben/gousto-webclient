beforeEach(() => {
  // TODO - add this to utility
  cy.setCookie(
    "v1_cookie_policy_v2",
    encodeURIComponent(JSON.stringify({ isAccepted: true }))
  );

  cy.setCookie(
    "v1_tutorial_viewed",
    encodeURIComponent(JSON.stringify({ justforyou: 1, likedislikerecipes: 1 }))
  );
});
