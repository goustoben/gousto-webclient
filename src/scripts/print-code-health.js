/* eslint-disable */
const getCodeHealth = require('./get-code-health')

const codeHealth = getCodeHealth()

console.log(JSON.stringify(codeHealth))
