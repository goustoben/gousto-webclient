# Gousto Fake API

## Motivation

To keep API response test fixtures organised, visible, easily accessible and up to date.

## Overview
The Gousto Fake API is a set of test doubles for the Gousto web service APIs. Designed for use within Gousto's Cypress tests (integration). Currently this equates to: 

- a set of fixture files organised into a strict folder structure
- a Javascript Object organised to map to the existing Gousto API
- some helpers to assist in accessing the fixture files

## The fixture files

The set of fixture files that relate to response from the real Gousto APIs. The root of the API fixtures can be found in [fixtures/api/](./)
Currently the folder structure is organised as follows:

```
The root of the fixtures: 
/api 

Then the fixtures path should map to the http path for the endpoints themselves:
Real Endpoint               |   Fixture path
-------------------------------------------------------------------
/boxPrices                  :   api/boxPrixes
/user/current/addresses     :   api/user/current/addresses
/delivery_day/1240/stock    :   api/delivery_day/$day/stock

```

# Dynamic paths
When a path in an endpoint is dynamic  the variable elements are replaced with named folders in the fixture structure, prefixed with a dollar sign as follows:

```
/delivery_day/1240/stock  =  api/delivery_day/$day/stock
/user/addresses/home = api/user/addresses/$name
/user/00000000-00000000/personal-details
/auth/0d87e7f50d87e7f50d87e7f50d87e7f5 = /api/auth/$token
etc
```

# Fixtures files
Within the folders should exist a set of fixtures each relating to a response from a request to the endpoint. Some examples for `/user/00000000-00000000/personal-details` might be: 

```
not-found.json - a personal details cannot be found response
default_okay.json - personal details found
active_okay.json - an active user, personal details found
incactive_okay.json - an inactive user, personal details found
POST_created.json - personal details created
POST_unauthorized.json - personal details not created, unauthorised access
```

## The API object

The Gousto Fake API object a simple structure describing the real API. It can be found [here](fixtures/api/gousto-api.js).

Some examples of paths and how they map:

```
Real endpoint               |   Fake API accessor     
-------------------------------------------------------------------
/boxPrices                  :   api.boxPrices
/user/current/addresses     :   api.user.current.addresses
/brand/v1/theme             :   api.brand.v1.theme
/delivery_day/1240/stock    :   api.delivery_day.$day.stock
```

The paths in through the object should result in a set of methods that relate to fixtures that represent scenarios, for example, using the example from above for `/user/00000000-00000000/personal-details`:

```
api.user.$id.personalDetails.fakeNotFound() - a personal details cannot be found response
api.user.$id.personalDetails.fakeOK() - personal details found
api.user.$id.personalDetails.fakeActiveOkay() - an active user, personal details found
api.user.$id.personalDetails.fakeInactiveOkay() - an inactive user, personal details found
api.user.$id.personalDetails.fakeCreated() - personal details created
api.user.$id.personalDetails.fakeUnauthorized() - personal details not created, unauthorised access
```

## API fixture helpers

The API Object has access to some API helpers that allow for quick connection to the underlying fixtures that using the conventions introduced above to aid in creating the methods to access the fixtures for the specified endpoints. 

### fakeApi
```Javascript
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
 export const fakeApi = (
  path,
  scenario,
  method = HTTP_METHODS.GET,
  statusCode = HTTP_STATUS_CODES.OK,
  noFixture = false,
  requestHandlerAdditions = {}, 
  alternativeAlias = null
)
```

### fakeApiWithQuery(...)
```Javascript
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
export const fakeApiWithQuery = (path,
  query,
  scenario,
  method = HTTP_METHODS.GET,
  statusCode = HTTP_STATUS_CODES.OK,
  noFixture = false,
  requestHandlerAdditions = {},
  alternativeAlias = null
)
```

The main benefits of organizing the fixtures in this way are; it enables a good visibility of the surface area of the API estate that has been mocked already and makes it simple to access through autocompletion in an IDE.
