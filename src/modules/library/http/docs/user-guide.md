# HTTP user guide

This is a guide for making requests using `@library/http`.

- [Key concepts](#key-concepts)
- [Basic requests / parsers](#basic-requests--parsers)
- [Requests](#requests)
  - [Requests with inputs](#requests-with-inputs)
  - [Composing request middleware](#composing-request-middleware)
  - [Request middleware reference](#request-middleware-reference)
- [Parsers](#parsers)
  - [Parser composition](#parser-composition)

## Key concepts

The HTTP library is built around the idea of `composition`. Rather than a single fetch function with many options, you
compose together request and parser functions to create a fetcher for your specific endpoint.

To aid with re-using code, multiple request and parser functions can themselves be composed into higher-level request
and parser functions, which can again be recomposed, and again...

Using this approach means that

- You can opt-in to the features you want
- You can declaratively specify how your particular endpoint function works, and what types it needs
- It's easier to opt out of features you don't want, when your API is special

## Basic requests / parsers

Here's a very basic example. We're going to start with quite **low level building blocks** to illustrate this; your
actual code is likely to be far higher level day-to-day.

Let's start by imagining a new JSON API endpoint at `/spices`. It expects requests to be sent with a `Content-Type`

```typescript
import { composeRequest, addPath, setHeader } from '@library/http/requests'

// Composes a request that: calls /spices, sets Content-Type
const spiceRequest = composeRequest(
  addPath('spices'),
  setHeader('Content-Type', 'application/json')
)
```

The `spiceRequest` describes what we are sending, but what about how we consume it? Enter `composeParse`:

```typescript
import { composeParser } from '@library/http/parser'

type Spice = {
  name: string,
  spiceLevel: number
}

// Composes a parser that: decodes JSON, then extracts json.data
const spiceParse = composeParser(
  (response: Response) => response.json(),
  (json: Record<string, unknown>) => json.data as Spice[]
)
```

We can now bring them together with `composeFetch`:

```typescript
import { composeFetch } from '@library/http'

// Composes a fetch function
const fetchSpices = composeFetch(spiceRequest, spiceParse)

fetchSpices() // => Calls /spices
```

Creating a function fetchSpice of type `() => Promise<Spice[]>`

## Requests

### Requests with inputs

Request middleware can take inputs. Lets say we want to get a `Spice` by its name.

We can do this by passing a function to `addPath` instead. This will use inputs passed to our fetcher.

```typescript
import { composeRequest, addPath, setHeader } from '@library/http/requests'

// Composes a request that: uses the input argument to call a REST path
const spiceRequest = composeRequest(
  addPath((name: string) => `spices/${name}`),
  setHeader('Content-Type', 'application/json')
)

const fetchSpice = composeFetch(spiceRequest, spiceParse)

fetchSpice('saffron') // => calls /spices/saffron
```

The type of fetchSpice is `(name: string) => Promise<Spice>` and it makes requests to `/spices/:name`.

When you use functions in request middleware, the types of the RequestMiddleware composed inherit from the types of the
inputs of your functions. This means you can rely on TypeScript to enforce the right input must be passed.

### Composing request middleware

Request middleware can be composed into new request middleware

```typescript
const spiceEndpoints = composeRequest(
  addPath('spices'),
  setHeader('Content-Type', 'application/json')
)

const spiceRequest = composeRequest(
  spiceEndpoints,
  addPath((name: string) => name)
)
```

`spiceEndpoints` is a "higher level" request middleware that can be composed into other request definitions.

### Request middleware reference

See [requests.md](requests.md)

## Parsers

Some requests don't need to return any data. For those, it's fine just to `composeRequest` and pass the request config
into `composeFetch`:

```typescript
const gingerRequest = composeRequest(
  addPath('spice/ginger'),
  setMethod('POST'),
  setBody(gingerData)
)

const fetcher = composeFetch(gingerRequest)
```

More often, though, we want to use the data returned to us in some way.

By default, a fetcher returns a naked fetch `Response`:

```typescript
const resp: Response = fetcher()
```

But we can instead extract data using parsers. These can be composed from a chain of functions, like so:

```typescript
type JSONAPIData = {
  data: Record<string, unknown>
}

function isJSONAPIData (u: unknown): u is JSONAPIData {
  return u && typeof u === 'object'
    && 'data' in u && u.data && typeof u.data === 'object'
}

const parseSpiceResponse = composeParser(
  (resp: Response) => resp.json(),
  (json: unknown) => {
    if (isJSONAPIData(json)) return json
    throw new Error('JSON was not JSONAPI data')
  },
  (json: JSONAPIData) => json.data as Spice
)

const fetcher = composeFetch(gingerRequest, parseSpiceResponse)
```

Here `parseSpiceResponse` is a function that takes a `Response` and outputs either `Spice` or throws an error (for failed
validation)

### Parser composition

The `composeParser` just returns functions, so these can be passed again to `composeParser` to form "higher level" parsers.

## Using in React

The result of `composeFetch` is a function that takes whatever input your middleware demand and returns a promise.

### SWR

If your fetcher requires no input you can pass it straight to SWR:

```tsx
function Component () {
  const { data, error } = useSWR('cacheKey', fetcher)
}
```

If your fetcher uses an input of `string` to create a path, you can pass it like so:

```tsx
const fetcher = composeFetch(
  composeRequest(
    addPath((path: string) => path)
  )
)

function Component () {
  const { data, error } = useSWR('/spices/saffron', fetcher)
}
```

If your fetcher requires other inputs, pass a function

```typescript
function Component () {
  const { data, error } = useSWR('/spices/saffron', () => fetcher(userID))
}
```

### in useEffect

You can also call the fetcher directly, e.g. in `useEffect`:

```tsx
function Component () {
  const [ state, setState ] = useState('loading')

  useEffect(() => {
    fetcher(input)
      .then(() => setState('loaded'))
      .catch(() => setState('error'))
  }, [])
}
```
