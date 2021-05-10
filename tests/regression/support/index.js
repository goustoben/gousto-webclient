import 'cypress-pipe'
import addContext from 'mochawesome/addContext'

import './commands'
import './overwrites'

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
