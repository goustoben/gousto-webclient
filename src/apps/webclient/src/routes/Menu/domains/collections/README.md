# Menu `collections` domain

This is a hook-based API for interacting with collections on the menu.

If you're using this, don't import from any file other than `index.js`.

## Usage

**⚠️ usage info ⚠️:** if you are using this, don't import from any other route besides the one below. Do not import from `/internal/`!

```ts
import { useCollections } from 'routes/Menu/domains/collections'
```

### Getting current collection

This is primarily driven from the query string (if present), otherwise it falls back to recommendations or the default collection.

```ts
const { currentCollection, currentCollectionId } = useCollections()

return (
  <h2>
    {currentCollection.get('name')} ({currentCollectionId})
  </h2>
)
```

### Getting all collections

This gives a list of all **visible** collections to the user - taking into account any relevant filters

```ts
const { collections } = useCollections()

return collections.map((c) => <h2 key={c.get('id')}>{c.get('name')}</h2>)
```

### Changing collection

This can be used to change the currently selected collection

```ts
const { changeCollectionById } = useCollections()

const onClick = React.useCallback(() => {
  changeCollectionById(someTargetCollectionId)
}, [ changeCollectionById, someTargetCollectionId ])
```

## Future Improvements

- Create a React Context to store data rather than relying on Redux
- Move the `getCollections` part info `menu-service` (as the data lives there) and just treat this module as a 'current collection' state manager
