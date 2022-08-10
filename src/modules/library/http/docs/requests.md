# Request middleware API

These are middleware that you can compose as part of `composeRequest`. Remember that compositions can be re-composed
into higher level middleware.

Learn about using requests in the [user-guide](user-guide.md).

- [High level middleware](#high-level-middleware)
  - [auth](#auth)
- [Low level middleware](#low-level-middleware)
  - [addPath](#addpath)
  - [setHeader](#setheader)
  - [setHeaders](#setheaders)
  - [setHost](#sethost)
  - [setMethod](#setmethod)
  - [setQueryParam](#setqueryparam)
  - [setQueryParams](#setqueryparams)

## High level middleware

### auth

When the request is made, sets the `Authorization` HTTP header to `Bearer ${token}` using `@library/auth`.

### setServiceUrl

This is a stub for a middleware that will ultimately inject endpoint URLs, based on service name and version. For the
moment it is hardcoded to point to the staging user endpoint (Core).

## Low level middleware

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

### setHeader

Sets the named HTTP header.

The value is passed as a `provider` which may be a string, or a function of type
`(input: T) => string | Promise<string>`

### setHeaders

Sets multiple HTTP headers as an object (dictionary of strings). This object will be merged into existing values.

The value is passed as a `provider` which may be a dictionary or a function of type
`(input: T) => Dict | Promise<Dict>`

### setHost

Sets the base host.

The value is passed as a `provider` with may be a string, or a function of type
`(input: T) => string | Promise<string>`

### setMethod

Sets the HTTP method with a string.

### setQueryParam

Sets the named URL query parameter.

The value is passed as a `provider` which may be a string, or a function of type
`(input: T) => string | Promise<string>`

To set a null parameter, pass an empty string.

### setQueryParams

Sets multiple URL query parameters as an object (dictionary of strings). This object will be merged into existing
values.

The value is passed as a `provider` which may be a dictionary or a function of type
`(input: T) => Dict | Promise<Dict>`
