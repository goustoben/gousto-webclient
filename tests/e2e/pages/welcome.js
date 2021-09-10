module.exports = {
  sections: {
    welcomeContainer: {
      selector: '*[data-testing=welcomeContainer]',

      elements: {
        appPromo: {
          selector: '*[data-testing=appPromo]',
        },
        rafContainer: {
          selector: '*[data-testing=referAFriendSection]'
        },
        orderScheduleContainer: {
          selector: '*[data-testing=orderScheduleContainer]'
        }
      },

      commands: [{
        checkIfWelcomePageVisible: function () {
          this
            .waitForElementVisible('@appPromo', 60000)
        },
        checkIfRafSectionVisible: function () {
          this
            .waitForElementPresent('@rafContainer', 60000)
        },
        checkIfOrderScheduleContainerVisible: function () {
          this
            .waitForElementVisible('@orderScheduleContainer', 60000)
        }
      }],
    },
  }
}
