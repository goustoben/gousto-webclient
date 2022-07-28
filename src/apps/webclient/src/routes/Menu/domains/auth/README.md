# Menu `auth` domain

This domain allows us to access the auth information from the Redux state in an encapsulated and type-safe manner.

This may no longer be necessary - see [@library/auth](/src/modules/library/auth/README.md) which may be able to replace this functionality.

## Usage

```tsx
import { useAuth } from 'routes/Menu/domains/auth'

function SomeComponent() {
  const { isAuthenticated } = useAuth()

  return (
    isAuthenticated
    ? <span>Logged In</span>
    : <span>Logged Out</span>
  )
}

function useSomeHook() {
  const { accessToken } = useAuth()
}
```

## Future Improvements

- Deprecate this in favour of `@library/auth`
