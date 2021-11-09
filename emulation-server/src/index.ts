import Router from '@koa/router';
import Koa from 'koa';
import koaBody from 'koa-body';
import logger from 'koa-logger';
import {createState} from "./state";
import cors from "@koa/cors"
import proxy from 'koa-better-http-proxy'

const {getState, setState} = createState()

const app = new Koa();

const router = new Router()
    .use(koaBody())

router.get('/_config/state', ctx => {
    ctx.body = getState()
    ctx.status = 200
})

router.put('/_config/state', ctx => {
    if (!ctx.is('application/json')) {
        ctx.status = 415
        return
    }

    setState(ctx.request.body)
    ctx.status = 200
})

router.put('/_config/state/Gousto2-Core', ctx => {
    if (!ctx.is('application/json')) {
        ctx.status = 415
        return
    }

    setState(ctx.request.body)
    ctx.status = 200
})

router.put('/user/:authUserId/marketing/unsubscribe_emails', ctx => {
    ctx.body = {}

    const state = getState();

    if (state.users) {
        const user = state.users.find(user => user.authUserId === ctx.params.authUserId);

        if (user) {
            if (ctx.request.body.marketing_unsubscribe_token === user.marketingUnsubscribeToken) {
                ctx.headers["content-type"] = 'application/json'
                ctx.status = 200
                return
            }
        }
    }

    ctx.status = 404
})

app.use(logger())
    .use(cors())
    .use(router.routes())
    .use(router.allowedMethods())
    .use(proxy('staging-api.gousto.info', {https: true}))

app.listen(3000);
