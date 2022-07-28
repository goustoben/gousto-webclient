# Request middleware API

These are middleware that you can compose as part of `composeRequest`. Remember that compositions can be re-composed
into higher level middleware.

Learn about using requests in the [user-guide](user-guide.md).

- [Low level middleware](#low-level-middleware)
  - [addPath](#addpath)
  - [setHeader](#setheader)
  - [setHeaders](#setheaders)
  - [setMethod](#setmethod)
  - [setQueryParam](#setqueryparam)
  - [setQueryParams](#setqueryparams)

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
`(input: T, ctx: HttpCtx) => string | Promise<string>`

### setHeaders

Sets multiple HTTP headers as an object (dictionary of strings). This object will be merged into existing values.

The value is passed as a `provider` which may be a dictionary or a function of type
`(input: T, ctx: HttpCtx) => Dict | Promise<Dict>`

### setMethod

Sets the HTTP method with a string.

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
