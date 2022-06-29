# @library/auth

This is a library for authentication. Currently its purpose is to provide auth tokens for use in other libraries.

It's owned by frontend foundations.

## Installing

### Feature module or library

Add the following peer dependency ([why?](../../../../docs/modules.md#production-dependencies)) then call `yarn`.

```
"peerDependencies": {
  "@library/auth": "workspace:*"
}
```

## Usage

### Reading auth tokens

> ℹ️ You probably only need to know about this if you're working on a library module, like @library/http
> In feature modules, you can use the @library/http **auth middleware**.

```typescript
import { getToken, AuthToken } from '@library/auth'

function reader() {
  const token: AuthToken | null = getToken()
}
```

### Writing auth tokens

> ℹ️ You only need to know about this if you're working with the webclient-auth integration, which updates
> the auth token from Redux changes.

```typescript
import { setAuthToken } from '@library/auth'

function writer() {
  setAuthToken('string')
}
```
