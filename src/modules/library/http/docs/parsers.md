# Parser middleware API

## High level parsers

### extractCoreData

This parser extracts the `result.data` value from a successful Core PHP service response.

Usage:

```typescript
import { composeFetch } from '@library/http'
import { extractCoreData } from '@library/http/parsers'

// Return type of fetchUser = Promise<User>
const fetchUser = composeFetch(
  userRequest,
  extractCoreData<User>()
)
```

Possible exceptions:
```
ResponseError      - bad HTTP response
ParseJSONError     - bad JSON string
ParseCoreDataError - could not decode CoreData
```
