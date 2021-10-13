export const FIXTURES_API_ROOT = '/api' //TODO: Move to config
export const API_ORIGIN = 'https://stagingdr-api.gousto.info' //TODO: Move to config
export const HTTP_METHODS = {
  DELETE: 'DELETE',
  GET: 'GET',
  OPTIONS: 'OPTIONS',
  POST: 'POST',
  PUT: 'PUT',
}

export const HTTP_STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
}

export const fixturePath = (path) => `${FIXTURES_API_ROOT}/${path}`
export const fixtureScenarioPath = (path, scenario) => `${fixturePath(path)}/${scenario}.json`
export const apiPath = (path) => `${API_ORIGIN}/${path}`

const createRouteHandler = (noFixture, path, scenario, statusCode, requestHandlerAdditions) => {
  const fixture = noFixture ? null : fixtureScenarioPath(path, scenario)
  const routeHandler = {
    statusCode, fixture, ...requestHandlerAdditions
  }
  return routeHandler
}

/**
 * fake an API endpoint and
 * automatically assign an alias in the form:
 * [METHOD][API_ORIGIN][path] - ie: https://api.gousto.info/users/v1/1928/addresses
 *
 * @param {*} path the API path - /user/v1/1928/addresses
 * @param {*} scenario the name of the scenario (and stub file suffix) - three-addresses (maps to three-addresses.json)
 * @param {*} [method=HTTP_METHODS.GET] the HTTP method to use
 * @param {*} [statusCode=HTTP_STATUS_CODES.OK] the status to respond with
 * @param {boolean} [noFixture=false] don't use a fixture file
 * @param {*} [requestHandlerAdditions={}] additional prop to add to the Cypress requestHandler
 * @param {*} [alternativeAlias=null] alternative name for the alias
 * @return {*} a Cypress.Chainable (from cy.intercept)
 */
 export const interceptApiEndpoint = (
  path,
  scenario,
  method = HTTP_METHODS.GET,
  statusCode = HTTP_STATUS_CODES.OK,
  noFixture = false,
  requestHandlerAdditions = {},
  alternativeAlias = null
) => {
  const routeHandler = createRouteHandler(noFixture, path, scenario, statusCode, requestHandlerAdditions)

  // @ts-ignore
  return cy.intercept(method, apiPath(path), routeHandler).as(alternativeAlias || `${method}:${path}`)
}

/**
 * fake an API endpoint along with a query string and
 * automatically assign an alias in the form:
 * [METHOD][API_ORIGIN][path] - ie: https://api.gousto.info/users/v1/1928/addresses
 *
 * @param {*} path the API path - /user/v1/1928/addresses
 * @param {*} query a match for the querystring
 * @param {*} scenario the name of the scenario (and stub file suffix) - three-addresses (maps to three-addresses.json)
 * @param {*} [method=HTTP_METHODS.GET] the HTTP method to use
 * @param {*} [statusCode=HTTP_STATUS_CODES.OK] the status to respond with
 * @param {boolean} [noFixture=false] don't use a fixture file
 * @param {*} [requestHandlerAdditions={}] additional prop to add to the Cypress requestHandler
 * @param {*} [alternativeAlias=null] alternative name for the alias, useful if you're matching two endpoints on the same path
 * @return {*} a Cypress.Chainable (from cy.intercept)
 */
export const interceptApiEndpointWithQuery = (path,
  query,
  scenario,
  method = HTTP_METHODS.GET,
  statusCode = HTTP_STATUS_CODES.OK,
  noFixture = false,
  requestHandlerAdditions = {},
  alternativeAlias = null
) => {
  const routeHandler = createRouteHandler(noFixture, path, scenario, statusCode, requestHandlerAdditions)
  // @ts-ignore
  return cy.intercept(method, `${apiPath(path)}?${query}`, routeHandler).as(alternativeAlias || `${method}:${path}?${query}`)
}

