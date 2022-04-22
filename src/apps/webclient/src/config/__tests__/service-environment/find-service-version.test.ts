import { findServiceVersion } from 'config/service-environment/find-service-version'

const stubServiceManifest = {
  'box-prices': [
    {
      version: 'v1',
      majorVersion: 1,
      basePath: '/box-prices/v1',
    },
    {
      version: 'v2.0.0',
      majorVersion: 2,
      basePath: '/box-prices/v2.0.0',
    },
  ],
  orders: [
    {
      version: 'v1.0.0',
      majorVersion: 1,
      basePath: '/orders/v1.0.0',
    },
    {
      version: 'v2.0.0',
      majorVersion: 2,
      basePath: '/orders/v2.0.0',
    },
  ],
}

describe('serviceVersionLocator', () => {
  it('should return a service majorVersion, given a service name', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore ignoring the type error because we are testing the implementation
    expect(findServiceVersion('box-prices', 1, stubServiceManifest)).toEqual({
      version: 'v1',
      majorVersion: 1,
      basePath: '/box-prices/v1',
    })
  })

  it('should return a different service majorVersion, given alternative arguments', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore ignoring the type error because we are testing the implementation
    expect(findServiceVersion('orders', 2, stubServiceManifest)).toEqual({
      version: 'v2.0.0',
      majorVersion: 2,
      basePath: '/orders/v2.0.0',
    })
  })

  it('should throw when a service cannot be found', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore ignoring the type error because we are testing the implementation
    expect(() => findServiceVersion('foobar', 3, stubServiceManifest)).toThrow(
      "Service 'foobar' not found in manifest.",
    )
  })

  it('should throw when a majorVersion of a service cannot be found', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore ignoring the type error because we are testing the implementation
    expect(() => findServiceVersion('box-prices', 3, stubServiceManifest)).toThrow(
      "Service version 3 for service 'box-prices' not found in manifest",
    )
  })
})
