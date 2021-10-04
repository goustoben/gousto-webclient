const transit = require('transit-immutable-js')

module.exports = state => JSON.stringify(transit.toJSON(state))
