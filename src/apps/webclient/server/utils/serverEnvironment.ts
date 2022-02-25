import { envConfig } from '../config/env'

/**
 * Environment config getter for SERVER side environment
 *
 * Intended for use in `createIsomorphicEnvironment`
 *
 * @example
 * ```
 * const getEnvironment = createIsomorphicConfig({
 *   browserConfigFn: getClientEnvironment,
 *   serverConfigFn: getServerEnvironment,
 * })
 * ```
 */
export const getServerEnvironment = () => envConfig.ENVIRONMENT
