# Menu `brand` domain

This domain allows us to access information from the Brand API

## Usage

You can read detailed types in `types.ts`

### Brand Info

This is the `/theme` endpoint of brand API

```tsx
import { useBrandInfo } from 'routes/Menu/domains/brand'

useBrandInfo()
```

### Brand Headers

This is the `/menu-headers` endpoint of brand API

```tsx
import { useBrandHeadersInfo } from 'routes/Menu/domains/brand'

useBrandHeadersInfo()
```

## Future Improvements

- Add lookup patterns to this module (similar to `menu-service`) so that the consumers can call some function like `getThemeForCollection(collectionId)` and receive a nicely shaped response rather than having to work with the data API shape itself
