module.exports = {
  sections: {
    welcomeContainer: {
      selector: '*[data-testing=welcomeContainer]',

      elements: {
        appPromo: {
          selector: '*[data-testing=appPromo]',
        }
      },

      commands: [{
        checkIfWelcomePageVisible: function () {
          this
            .waitForElementVisible('@appPromo', 60000)
        },
      }],
    },
  }
}
