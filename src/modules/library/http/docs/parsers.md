# Parser middleware API

## High level parsers

### extractCoreData

Given a successful API response from Core, extracts the `data` as `<T>`

Type:

`function extractCoreData <T> (): ResponseMiddleware<Response, T>`

Usage:

```typescript
import { composeFetch } from '@library/http'
import { extractCoreData } from '@library/http/parsers'

type FetchUser = () => Promise<User>

const fetchUser: FetchUser = composeFetch(
  userRequest,
  extractCoreData<User>()
)
```

Exceptions include:
```
ResponseError      - bad HTTP response
ParseJSONError     - bad JSON string
ParseCoreDataError - could not decode CoreData
```
