const transit = require('transit-immutable-js')

module.exports = state => JSON.stringify(Buffer.from(encodeURIComponent(transit.toJSON(state))).toString('base64'))
