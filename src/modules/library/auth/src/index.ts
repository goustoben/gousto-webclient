let token: AuthToken | null = null

export type AuthToken = string & { __brand: 'AuthToken' }

export function setAuthToken(s: string | null) {
  token = s as AuthToken
}

export function getAuthToken() {
  return token
}
