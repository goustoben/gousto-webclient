# User guide

- [Composing requests](#composing-requests)
- [Request middleware API](#request-middleware-api)

## Composing requests

You define requests by importing middleware from `@library/http/requests` and combining them with `composeRequest`.

`composeRequest` takes any number of middleware and outputs another middleware. It's type-sensitive, so if you pass
a middleware that expects an input payload of shape `T`, it will preserve that expectation in the output middleware.

### Example: user experiments

Because `composeRequest` takes middlewares and outputs middlewares, you can use it to define re-usable blocks of
behaviour.

As an example, let's imagine we created a middleware to add Gousto experiment headers.

```typescript
import type { HttpCtx } from '@library/http'
import { composeRequest, setHeader } from '@library/http/requests'

const experimentHeaders = composeRequest(
  setHeader('x-gousto-device-id', (input: unknown, ctx: HttpCtx) => ctx.sessionId),
  setHeader('x-gousto-user-id', (input: unknown, ctx: HttpCtx) => ctx.authUserId)
)
```

The `setHeader` middleware takes a key and a value that's either a string or a function. If it's a function, it gets
both the payload of the request (input) and a context value injected at request time (ctx).

So now we have `experimentHeaders`, we can re-compose into new requests:

```typescript
import { composeRequest, addPath, setMethod } from '@library/http/requests'

const experimentsEndpoint = composeRequest(
  addPath('userbucketing/v1'), // Service
  addPath('user/experiments'), // Route
  experimentHeaders,           // X-Gousto headers
)

const getExperiments = composeRequest(
  experimentsEndpoint,
  setMethod('GET')
)
```

What if I want to `POST` some data? Then I need to use that `input` parameter

```typescript
const updateExperiments = composeRequest(
  experimentsEndpoint,
  addPath(
    (input: { experimentName: string } ) => input.experimentName
  )
)
```

Now `updateExperiments` represents an endpoint that

- calls `userbucketing/v1/user/experiments` with `POST`
- sets the relevant x-gousto headers using runtime parameters provided by the `http` library
- expects me to pass a payload with `{ experimentName: string }` when I make the request

## Request middleware API

### setHeader

Sets the named HTTP header.

The value is passed as a `provider` which may be a string, or a function of type
`(input: T, ctx: HttpCtx) => string | Promise<string>`

### setHeaders

Sets multiple HTTP headers as an object (dictionary of strings). This object will be merged into existing values.

The value is passed as a `provider` which may be a dictionary or a function of type
`(input: T, ctx: HttpCtx) => Dict | Promise<Dict>`

### setMethod

Sets the HTTP method with a string.

### addPath

**Appends** a URL path.

The value is passed as a `provider` which may be a string or a function of type
`(input: T, ctx: HttpCtx) => string | Promise<string>`.

Strings should not have trailing or leading slashes.

```typescript
// ❌
addPath('/bad')
addPath('bad/')

// ✅
addPath('good')
addPath('also/good')
```

### setQueryParam

Sets the named URL query parameter.

The value is passed as a `provider` which may be a string, or a function of type
`(input: T, ctx: HttpCtx) => string | Promise<string>`

To set a null parameter, pass an empty string.

### setQueryParams

Sets multiple URL query parameters as an object (dictionary of strings). This object will be merged into existing
values.

The value is passed as a `provider` which may be a dictionary or a function of type
`(input: T, ctx: HttpCtx) => Dict | Promise<Dict>`
