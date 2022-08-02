module.exports = {
  url: function () {
    return this.api.launchUrl + "/";
  },

  sections: {
    likeDislikeTutorial: {
      selector: '*[data-testing="likeDislikeTutorial"]',

      elements: {
        CTA: {
          selector: '*[data-testing="tutorialStepCta"]',
        },
      },

      commands: [
        {
          dismissLikeDislikeTutorialIfPresent: function () {
            this.optionallyClickToDismiss(
              '*[data-testing="tutorialStepCta"]'
            );
          },
        },
      ],
    },
  },
};
