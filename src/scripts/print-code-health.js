/* eslint-disable */
const getCodeHealth = require('./code-health-utils/get-code-health')

const codeHealth = getCodeHealth()

console.log(JSON.stringify(codeHealth))
