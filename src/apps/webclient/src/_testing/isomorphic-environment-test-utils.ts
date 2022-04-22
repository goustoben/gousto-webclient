import * as isoMorph from 'utils/isomorphicEnvironment'
import { Domain } from 'utils/types/windowLocation'
/*
 * Environment mocks
 * -----------------
 *
 * This module allows you to test code that behaves differently on different environments
 * (production, staging, etc.) or different runtimes (browser vs server).
 *
 * Although we try and reduce the scope of these differences as far as possible, some are
 * unavoidable (e.g. API endpoints, isomorphic logging)
 *
 * You use these utils by calling the mock* functions in a `beforeAll` or `beforeEach`
 * block, then calling `restoreEnvironmentMocks` in `afterAll` or `afterEach` to restore
 * environment state.
 *
 * Example:
 * ```
 * let environmentMocks
 *
 * beforeAll(() => {
 *   environmentMocks = mockEnvironmentAndDomain('production', 'gousto.co.uk')
 * })
 *
 * afterAll(() => {
 *   restoreEnvironmentMocks(environmentMocks)
 * })
 * ```
 */

export type TestGlobal = {
  environmentMocks: EnvironmentSpyCollection
}

export type EnvironmentSpyCollection = {
  [key: string]: jest.SpyInstance
}

export const mockDomain = (domain: Domain): jest.SpyInstance<string, []> =>
  jest.spyOn(isoMorph, 'getDomain').mockReturnValue(domain)

export const mockEnvironment = (environment: string): jest.SpyInstance<string, []> =>
  jest.spyOn(isoMorph, 'getEnvironment').mockReturnValue(environment)

export function mockEnvironmentAndDomain(
  environment: string,
  domain: Domain,
): EnvironmentSpyCollection {
  const getDomainSpy = mockDomain(domain)
  const getEnvironmentSpy = mockEnvironment(environment)

  return { getDomainSpy, getEnvironmentSpy }
}

export function withMockEnvironmentAndDomain(environment: string, domain: Domain) {
  let getDomainSpy: jest.SpyInstance<string, []>
  let getEnvironmentSpy: jest.SpyInstance<string, []>

  beforeAll(() => {
    getDomainSpy = mockDomain(domain)
    getEnvironmentSpy = mockEnvironment(environment)
  })

  afterAll(() => {
    getDomainSpy.mockRestore()
    getEnvironmentSpy.mockRestore()
  })
}

export const restoreEnvironmentMocks = ({
  getDomainSpy,
  getEnvironmentSpy,
}: EnvironmentSpyCollection) => {
  getDomainSpy.mockRestore()
  getEnvironmentSpy.mockRestore()
}
