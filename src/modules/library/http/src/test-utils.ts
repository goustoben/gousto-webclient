import { Response as ResponseShim } from 'node-fetch'

export type TypeAssert<A, B> = A extends B ? true : false

export type Rec<V = unknown> = Record<string, V>

export function makeResponse(json: string, status = 200) {
  const shimmed = new ResponseShim(json, { status }) as unknown
  return shimmed as Response
}
