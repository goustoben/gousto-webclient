export async function parseResponseToJSON (resp: Response): Promise<unknown> {
  if (!resp.ok) {
    throw new ResponseError(resp)
  }

  try {
    return await resp.json()
  } catch (parseErr) {
    throw new ParseJSONError(parseErr as Error)
  }
}

export class ResponseError extends Error {
  constructor(resp: Response) {
    super(`@library/http ResponseError: bad response, status="${resp.status}"`)
  }
}

export class ParseJSONError extends Error {
  // This is an inbuilt as of newer browsers and Node>=16.9, but the server app uses Node14
  public cause: Error

  constructor(cause: Error) {
    super(`@library/http ParseJSONError: bad JSON, cause.message="${cause.message}"`)
    this.cause = cause
  }
}
