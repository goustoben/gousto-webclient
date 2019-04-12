const { client } = require('nightwatch-cucumber');
const { defineSupportCode } = require('cucumber');

defineSupportCode(({ Given, When, Then }) => {

  Given(/^I am on the ([^"]*) page$/, function(name) {
    this.page = client.page[name]();
    return this.page
      .navigate()
      .waitForElementVisible('body', 1000);
  });

});
