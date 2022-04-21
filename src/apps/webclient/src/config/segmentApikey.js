const { isProd } = require("utils/isomorphicEnvironment");

module.exports = {
  apikey: isProd() ? 'advtUF8qBdDv5FQmTRKGnOaU7v40EBUX' : '',
}
