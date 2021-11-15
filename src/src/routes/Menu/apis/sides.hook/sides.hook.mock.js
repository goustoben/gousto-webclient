/* eslint-disable import/no-extraneous-dependencies */
import { rest } from 'msw'
import endpoint from 'config/endpoint'
import sideFixture from 'fixtures/menu/v1/sides/POST.json'
import emptySideFixture from 'fixtures/menu/v1/sides/POST_empty.json'
import errorSideFixture from 'fixtures/menu/v1/sides/POST_500.json'

export const user = {
  withError: 'user-with-error',
  withOutSides: 'user-without-sides',
  withSides: 'user-with-sides',
}

const getUserId = (req) => req.headers.get('x-gousto-user-id')

export const handlers = [
  rest.post(`${endpoint('menu', 1)}/sides`, (req, res, ctx) => {
    const userId = getUserId(req)

    if (userId === user.withError) {
      return res(
        ctx.status(500),
        ctx.json(errorSideFixture),
      )
    }

    if (userId === user.withOutSides) {
      return res(
        // With an empty body
        ctx.json(emptySideFixture),
      )
    }

    return res(
      // With a body with the sides
      ctx.json(sideFixture),
    )
  }),
]
