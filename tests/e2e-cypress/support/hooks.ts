import { datadogRum } from "@datadog/browser-rum";

beforeEach(() => {
  // Hide cookie banner
  cy.setGoustoCookie("cookie_policy_v2", { isAccepted: true });

  // Hide tutorial overlays
  cy.setGoustoCookie("tutorial_viewed", {
    justforyou: 1,
    likedislikerecipes: 1,
  });
});

afterEach(() => {
  // TODO - need util to access DD RUM in a repeatable way
  cy.window()
    .its("DD_RUM")
    .then((DD_RUM: typeof datadogRum) => {
      if (DD_RUM.getInternalContext()?.session_id) return;

      DD_RUM.stopSessionReplayRecording();
    });
});
