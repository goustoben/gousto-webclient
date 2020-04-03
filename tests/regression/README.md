# Regression test suite

## Development

### Platform dependent tests

The framework allows for tests to be written purely for `web` or `mobile`, using the new `withPlatformTags` method.

```javascript
import { withPlatformTags, MOBILE, WEB } from '../utils/tags'

describe('example', () => {
    it('this will run everywhere', () => {})

    withPlatformTags(MOBILE).it('this will only run on mobile', () => {})

    withPlatformTags(WEB).it('this will only run on web', () => {})

    withPlatformTags(MOBILE, WEB).it('this will run on mobile and web', () => {})
})
```

This is powered by Cypress's env variable functionality within the `npm` commands. If there is need for multiple tags to be provided, they must be added as a comma seperated string, i.e. `'mobile,web'`.
