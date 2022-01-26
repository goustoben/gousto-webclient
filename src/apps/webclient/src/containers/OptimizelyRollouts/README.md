# [Optimizely](https://app.optimizely.com/)

This folder contains our abstractions using `optimizely`, these consist of 

* a React hook-based API
* a React component wrapper
* a Factory for using inside Redux Actions

If you're using this, don't import from any file other than `index.js`.

You can see the [optimizely documentation here](https://docs.developers.optimizely.com/full-stack/v4.0/docs/).

## Known Issues

We have some problems with our current implementation that are known such as;

* Our hook and component abstractions work differently to our factory abstraction. If you are running an experiment please only use one of the abstractions or refactor the abstractions so the logic of the abstractions are similar
* Currently we use `session_id` as the fallback ID for optimizely, however, we might assign multiple session IDs for a given prospect where snowplow would have a single `domain_userid` (computed by Snowplow). This can result in the the same user seeing seen both the Control and Variant variations.
    * There is talk about changing using the `session_id` as the fallback to using `domain_userid` as the fallback ID ([Slack conversation](https://gousto.slack.com/archives/C02TPM5CWSV/p1641903574018900))
* The Factory abstractions doesn't know of our override code and so doesn't adhear to our overrides

## Overwriting locally

We load `SetupOptimizelyOverride` in side [`AppContainer`](../AppContainer.js) so that we can override the features for users.

This is done by the adding a query parameter `opt_feature` by setting its value to an array of `key` `value` pairs.

The content of this query parameter is then stored if local storage if it is different from the value inside the store. This allows use to test features we want enabled across pages without worrying about the URL params being persisted.

### Enabling a feature

If we have an feature with the name `name_of_features_you_want_enabled` we can set the value of the query parameter to be `opt_features=name_of_features_you_want_enabled=true` to set this feature as enabled.

This functionality works in each environment, and the example below are using production URLs.

Example:

`https://www.gousto.co.uk/?opt_features=name_of_features_you_want_enabled=true`

### Disabling a feature

If we have an feature with the name `name_of_features_you_want_disabled` can set the value of the query parameter to be `opt_features=name_of_features_you_want_disabled=false` to set this feature as disabled.

Example:

`https://www.gousto.co.uk/?opt_features=name_of_features_you_want_disabled=false`

### Multiple feature

If we have multiple features, the first being `name_of_features_you_want_enabled` we want enabled and the second being `name_of_features_you_want_disabled` that we want disabled.

We can use a `,` (comma) between the features (`key`) and their state (`value`) that we want to see.

We can set the value of the query parameter to be `opt_features=name_of_features_you_want_enabled=true,name_of_features_you_want_disabled=false`.

Example:

`https://www.gousto.co.uk/?opt_features=name_of_features_you_want_enabled=true,name_of_features_you_want_disabled=false`

### Reset overrides

If we want to remove the current overrides we need to provide an empty list to the query parameter like `opt_features=`.

Example:

`https://www.gousto.co.uk/?opt_features=`

**NOTE:** 

* If you inform someone to override their experiment state please make sure you explain to them how to reset the override (`https://www.gousto.co.uk/?opt_features=`).
* Also if you have two pages open with `https://www.gousto.co.uk/?opt_features=` and `https://www.gousto.co.uk/?opt_features=name_of_features_you_want_enabled=true`, these pages will override each other and depending on browsers will set one of these values into the localStorage. Make sure you only have one page with `?opt_features` set when working with the overrides.

## Tracking

When using the hook or the component you need to add your feature to the `experimentsConfig` object in inside [trackExperimentInSnowplow](./trackExperimentInSnowplow.js)

```ts
{
    feature_name: {
        id: 'feature_name', // this can be the feature name
        name: 'feature that we are testing', // human readable name of feature
        variationName: 'Variation',
        defaultName: 'Control',
    }
},
```

## Usage

All our `optimizely` abstractions are build of our [`OptimizelySDK`](./optimizelySDK.js) abstractions so that we only have one instance of optimizely.

### Hooks

```ts
import { useIsOptimizelyFeatureEnabled } from 'containers/OptimizelyRollouts'
```

#### Feature for any users

```ts
import { useIsOptimizelyFeatureEnabled } from 'containers/OptimizelyRollouts'

const Component = () => {
  const isEnabled = useIsOptimizelyFeatureEnabled('feature_name')

  // if you want to wait for the feature to be loaded
  if (isEnabled === null) return null

  return isEnabled ? 'hi' : 'hello'
}
```

#### Feature for a subset of users 

We allow you to provide `null` as the feature name so that if you don't want to check the experiment for a users the hook will return a falsy value and not check optimizely.

```ts
import { useIsOptimizelyFeatureEnabled } from 'containers/OptimizelyRollouts'

const isSubscriptionUser = () => /* Check if user is subscribed */;

const Component = () => {
  const featureName = isSubscriptionUser() ? 'subscription_feature_name' : null
  const isEnabled = useIsOptimizelyFeatureEnabled(featureName)

  return isEnabled ? 'hi' : 'hello'
}
```

#### Feature for Authenticated users

We sometime need to bucket users based on if they are authenticated, this is an example of how to do that using our redux store.

```ts
import { useSelector } from 'react-redux'
import { useIsOptimizelyFeatureEnabled } from 'containers/OptimizelyRollouts'
import { getIsAuthenticated } from 'selectors/auth'

const Component = () => {
  const featureName = useSelector(getIsAuthenticated)
    ? 'existing_users_feature_name'
    : 'new_sign_up_user_feature_name'

  const isEnabled = useIsOptimizelyFeatureEnabled(featureName)

  return isEnabled ? 'hi' : 'hello'
}
```

#### Component

```ts
import { OptimizelyFeature } from 'containers/OptimizelyRollouts'
```

#### Feature for any users

```tsx
import { OptimizelyFeature } from 'containers/OptimizelyRollouts'

const Component = () => {
  return (
    <>
        <OptimizelyFeature name="feature_name" enabled={true}>hi</OptimizelyFeature>
        <OptimizelyFeature name="feature_name" enabled={false}>hello</OptimizelyFeature>
    </>
  )
}
```

####  Feature for a subset of users

We allow you to provide `null` as the feature name so that if you don't want to check the experiment for a users the hook will return a falsy value and not check optimizely.

```tsx
import { useIsOptimizelyFeatureEnabled } from 'containers/OptimizelyRollouts'

const isSubscriptionUser = () => /* Check if user is subscribed */;

const Component = () => {
  const featureName = isSubscriptionUser() ? 'subscription_feature_name' : null

  return (
    <>
        <OptimizelyFeature name={featureName} enabled={true}>hi</OptimizelyFeature>
        <OptimizelyFeature name={featureName} enabled={false}>hello</OptimizelyFeature>
    </>
  )
}
```

#### Feature for any users

```tsx
import { OptimizelyFeature } from 'containers/OptimizelyRollouts'

const Component = () => {
  const featureName = isSubscriptionUser() ? 'subscription_feature_name' : null

  return (
    <>
        <OptimizelyFeature name={featureName} enabled={true}>hi</OptimizelyFeature>
        <OptimizelyFeature name={featureName} enabled={false}>hello</OptimizelyFeature>
    </>
  )
}
```

#### Feature for Authenticated users

We sometime need to bucket users based on if they are authenticated, this is an example of how to do that using our redux store.

```tsx
import { OptimizelyFeature } from 'containers/OptimizelyRollouts'
import { useSelector } from 'react-redux'
import { getIsAuthenticated } from 'selectors/auth'

const Component = () => {
  const featureName = useSelector(getIsAuthenticated)
    ? 'existing_users_feature_name'
    : 'new_sign_up_user_feature_name'

  return (
    <>
        <OptimizelyFeature name={featureName} enabled={true}>hi</OptimizelyFeature>
        <OptimizelyFeature name={featureName} enabled={false}>hi</OptimizelyFeature>
    </>
  )
}
```

#### Factory

The factory abstraction takes in a feature name and then returns a functions that is to be use inside Redux actions where we can provide `dispatch` and `getState` as arguments.

```ts
const isFeatureEnabled = isOptimizelyFeatureEnabledFactory('feature_name')

const action = (dispatch, getState) => {
    const isEnabled = isFeatureEnabled(dispatch, getState)
}
```