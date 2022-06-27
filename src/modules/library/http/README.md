# @library/http

This is a library for defining, composing and making HTTP requests. It's written to support the new feature modules but
can also be called within the main webclient.

[this library is wip]

- ✏️ Describe how your backend APIs want to be called
- 🎵 Compose a parser function to extract the exact data you want
- ➡️ Make your requests with either plain functions or React hooks
- 🔨 Integrate with caches like SWR

It's owned by frontend foundations

## Installing

Add the following peer dependency ([why?](../../../../docs/modules.md#production-dependencies)) then call `yarn`.

```
"peerDependencies": {
  "@library/http": "workspace:*"
}
```

## Documentation

- [User guide](user-guide.md)
- [Developer guide](dev-guide.md)
