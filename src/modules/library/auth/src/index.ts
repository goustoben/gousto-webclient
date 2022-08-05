let token: AuthToken | null = null

export type AuthToken = string & { __brand: 'AuthToken' }

export function setAuthToken(input: string | null) {
  token = input as AuthToken
}

export function getAuthToken() {
  return token || null
}
