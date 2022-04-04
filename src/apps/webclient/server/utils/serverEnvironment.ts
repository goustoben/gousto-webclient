import { getEnvConfig } from "utils/processEnv";
import {
  ENVIRONMENT_NAMES,
  PROTOCOL_PREFIX,
  SERVICE_DOMAINS
} from "config/service-environment/service-environment.types";

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
export const getServerEnvironment = () => {
  const { ENVIRONMENT } = getEnvConfig()

  return ENVIRONMENT
}

export const getServerDomain = (
) => {
  const environment = getServerEnvironment()

  switch (true) {
    case environment === ENVIRONMENT_NAMES.production:
      return SERVICE_DOMAINS.production

    case environment === ENVIRONMENT_NAMES.local:
      return SERVICE_DOMAINS.local

    default:
      return SERVICE_DOMAINS.default
  }
}

const isLocalEnvironment = () => getServerEnvironment() === ENVIRONMENT_NAMES.local

export const getServerProtocol = () => (isLocalEnvironment() ? PROTOCOL_PREFIX.HTTP : PROTOCOL_PREFIX.HTTPS)

