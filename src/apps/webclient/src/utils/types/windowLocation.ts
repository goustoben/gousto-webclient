export type Protocol = 'http:' | 'https:'

/**
 * Caters for the edge-case of directly accessing webclient/frontend via the ALB
 */
export type HostNames = 'webclient' | 'frontend'

export type SubDomain = 'www' | `${string}-www` | `${string}-${HostNames}` | 'frontend'

export type RootDomain = 'gousto' | `${string}.gousto`

export type TopLevelDomain = `.local:${number}` | `.local` | '.info' | '.co.uk'

export type Domain = `${RootDomain}${TopLevelDomain}`

export type WindowLocation = {
  host: `${SubDomain}.${RootDomain}${TopLevelDomain}`
  protocol: Protocol
}
