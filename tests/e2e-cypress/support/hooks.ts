import { datadogRum } from '@datadog/browser-rum'

beforeEach(() => {
  // Hide cookie banner
  cy.setGoustoCookie("cookie_policy_v2", { isAccepted: true });

  // Hide tutorial overlays
  cy.setGoustoCookie("tutorial_viewed", {
    justforyou: 1,
    likedislikerecipes: 1,
  });
});
