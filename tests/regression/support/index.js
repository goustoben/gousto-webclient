/// <reference types="cypress" />

import 'cypress-pipe'
import addContext from 'mochawesome/addContext'
import './commands'
import './overwrites'
import { checkoutAccountBot, loginFormBot, menuBot } from '../bots'

Cypress.on('window:before:load', function (window) {
  const original = window.EventTarget.prototype.addEventListener

  window.EventTarget.prototype.addEventListener = function () {
    if (arguments && arguments[0] === 'beforeunload') {
      return
    }
    return original.apply(this, arguments)
  }

  Object.defineProperty(window, 'onbeforeunload', {
    get: function () { },
    set: function () { }
  })
})

Cypress.on('test:after:run', (test, runnable) => {
  if (test.state === 'failed') {
    let item = runnable
    const nameParts = [runnable.title]

    while (item.parent) {
      nameParts.unshift(item.parent.title)
      item = item.parent
    }

    if(runnable.hookName) {
      nameParts.push(`${runnable.hookName} hook`)
    }

    const fullTestName = nameParts
      .filter(Boolean)
      .join(" -- ")

    const imageUrl = `screenshots/${
      Cypress.spec.name
    }/${fullTestName} (failed).png`

    addContext({ test }, imageUrl)
  }
})

cy.bots = {
  checkoutAccountBot,
  loginFormBot,
  menuBot,
}
