import { getEnvironment } from './isomorphicEnvironment'

type ClientConfigOptions<T> = {
  // eslint-disable-next-line no-unused-vars
  defaultKey?: keyof T
}

/**
 * Given a config object, returns a memoized getter function that
 * selects value based on current environment
 *
 * Can optionally provide a 'default' key to use if config doesn't
 * have a key for current environment
 *
 * For memo to function properly, values of config object cannot
 * be undefined
 *
 * @param configMap - config object, keyed by environment. i.e. `{ staging: 'my-value' }`
 * @param options.defaultKey - optional default config key
 */
export const createConfigMap = <T extends Record<string, unknown>>(
  configMap: T,
  options: ClientConfigOptions<T> = {}
) => {
  const { defaultKey } = options

  let memo: T[keyof T]
  let defaultVal: T[keyof T]

  if (defaultKey) {
    defaultVal = configMap[defaultKey]
  }

  return () => {
    if (typeof memo !== 'undefined') {
      return memo
    }

    const currentEnv = getEnvironment()
    const configVal = currentEnv in configMap ? configMap[currentEnv as keyof T] : defaultVal

    memo = configVal

    return configVal
  }
}
