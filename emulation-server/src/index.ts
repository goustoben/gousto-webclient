import Router from '@koa/router';
import Koa from 'koa';
import koaBody from 'koa-body';
import logger from 'koa-logger';
import {createState} from "./state";
import cors from "@koa/cors"
import proxy from 'koa-better-http-proxy'
import {Command} from "commander";
import {withSnakeCaseProperties} from "./utils/responseRendering";
import {isAuthorizedRequest} from "./utils/authorization";

function getServerConfiguration() {
    const command = new Command();
    command.option('--proxyHost <proxyHost>', "proxy unhandled routes to <proxyHost>")
    command.parse(process.argv)

    return command.opts();
}

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

router.get('/order/:orderId', ctx => {
    const state = getState();

    if (!isAuthorizedRequest(ctx, state)) {
        ctx.status = 401
        return
    }

    if (state.orders) {
        const order = state.orders.find(order => order.id === ctx.params.orderId);

        if (order) {
            ctx.status = 200
            ctx.body = withSnakeCaseProperties(order)
            return
        }
    }

    ctx.status = 404
    return
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

const serverConfiguration = getServerConfiguration();

if (serverConfiguration.proxyHost) {
    app.use(proxy(serverConfiguration.proxyHost, {https: true}))
}

app.listen(3000);
