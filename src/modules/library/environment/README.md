# @library/environment

This is a library to determine the current environment, I.E staging, local etc.

## Installing

### Feature module or library

Add the following peer dependency ([why?](../../../../docs/modules.md#production-dependencies)) then call `yarn`.

```
"peerDependencies": {
  "@library/environment": "workspace:*"
}
```

Ensure this is added as a `dependency` in `apps/webclient`.

## API

### isomorphicEnvironment

Functions for browser-or-server-safe environment values.

```typescript
import { isomorphicEnvironment } from '@library/environment'

type = {
  getDomain: () => string,
  getEnvironment: () => string,
  getProtocol: () => string
}
```

### browserEnvironment

Browser-specific functions. You should generally prefer to go through `isomorphicEnvironment`

```typescript
import { browserEnvironment } from '@library/environment'

type = {
  canUseWindow: () => boolean
}
```

## Updating

This environment module is owned by Front-End Foundations. Please raise any issues/change requests through our squads support channel: #frontend-support
