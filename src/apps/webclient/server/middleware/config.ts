import * as Koa from 'koa'

// Think about type safety, defaults here
const MAX_VARIABLE = process.env.MAX_VARIABLE

const getReqUrl = (ctx: Koa.Context): string => ctx.request.path

const reqUrlEquals = (path: string, ctx: Koa.Context): boolean => path === getReqUrl(ctx)

export const configMiddleware = async (ctx: Koa.Context, next: Koa.Next) => {
  if (reqUrlEquals('/config', ctx)) {
    ctx.body = {
      MAX_VARIABLE,
    }

    ctx.status = 200

    return ctx
  }

  await next()
}
