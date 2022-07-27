/// <reference types="cypress" />

import 'cypress-pipe'
import addContext from 'mochawesome/addContext'
import './commands'
import './overwrites'
import { checkoutAccountBot, loginFormBot, menuBot } from '../bots'

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

Cypress.on('window:before:load', win => {
  win.snowplow = (_callback, resolve) => {
    if (typeof resolve === 'function') {
      resolve(null)
    }
  }
})

cy.bots = {
  checkoutAccountBot,
  loginFormBot,
  menuBot,
}
