# @library/http

This is a library for making HTTP requests. It's written to support the new feature modules, but can also be called
within the main webclient.

_This library is work-in-progress_

It's owned by frontend foundations

## What can I do with this?

- 📖 Declare how your backend APIs want to be called
- 🎵 Compose parsers to extract the exact data you want
- 📦 Package them together into fetcher functions
- 🚚 Pass these into caching frameworks like [SWR](https://swr.vercel.app/)

## Installing

Add the following peer dependency ([why?](../../../../docs/modules.md#production-dependencies)) then call `yarn`.

```
"peerDependencies": {
  "@library/http": "workspace:*"
}
```

## Documentation

- [User guide](docs/user-guide.md)
- [Request middlewares](docs/requests.md)
