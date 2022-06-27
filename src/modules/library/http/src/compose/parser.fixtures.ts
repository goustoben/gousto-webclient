import { Rec } from '../test-utils'

/**
 * Test parser flow
 * ============================================================================
 *
 * These helpers describe a contrived parsing flow where we validate the
 * response, extract the JSON API data, get the user's address, validate types,
 * and ultimately determine whether they are from Yorkshire
 */
export type JSONAPIResponse = {
  data: Rec
}

export type MockUserData = {
  address: string[]
}

export type Postcode = string & { __postcode: Symbol }

export function validateResponse(res: Response) {
  if (res.status >= 400) {
    throw new Error('Bad response')
  } else {
    return res
  }
}

export function responseToRecord(res: Response) {
  return res.json() as Promise<Rec>
}

export function validateJSONAPI(rec: Rec) {
  const { data } = rec
  if (typeof data !== 'object' || data === null) {
    throw new Error('Not JSON API')
  } else {
    return rec as JSONAPIResponse
  }
}

export function jsonAPIToData(japi: JSONAPIResponse) {
  return japi.data
}

export function validateUser(rec: Rec) {
  const { address } = rec
  if (!Array.isArray(address) || typeof address[0] !== 'string') {
    throw new Error('Not a valid user')
  } else {
    return rec as MockUserData
  }
}

export function userToAddress(user: MockUserData) {
  return user.address
}

export function addressToPostcode(address: string[]) {
  return address[1]
}

export function validatePostcode(postcode: string) {
  const length = postcode.length
  if (length < 5 || length > 8) {
    throw new Error('Not a valid postcode')
  } else {
    return postcode as Postcode
  }
}

export function postcodeIsInYorkshire(postcode: Postcode) {
  return [postcode, postcode.startsWith('YO')] as [Postcode, boolean]
}
