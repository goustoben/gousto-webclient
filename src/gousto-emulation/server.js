const Koa = require('koa')
const logger = require('koa-logger')
const Router = require('@koa/router')

const app = new Koa()
const router = new Router()

router.delete('/user/the-user-id/marketing/the-marketing-type', (ctx, next) => {
  ctx.body = {message: 'foo'}
})

app
  .use(async (ctx, next) => {
    console.log(JSON.stringify(ctx.request))
    await next()
  })
  .use(logger())
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000)
