import Router from '@koa/router';
import Koa from 'koa';
import koaBody from 'koa-body';
import logger from 'koa-logger';
import {createState, Order, Recipe, State} from "./state";
import cors from "@koa/cors"
import proxy from 'koa-better-http-proxy'
import {Command} from "commander";
import {withSnakeCaseProperties} from "./utils/responseRendering";
import {isAuthorizedRequest} from "./utils/authorization";
import _ from "lodash";

function getServerConfiguration() {
    const command = new Command();
    command.option('--proxyHost <proxyHost>', "proxy unhandled routes to <proxyHost>")
    command.parse(process.argv)

    return command.opts();
}

const serverConfiguration = getServerConfiguration();

const {getState, setState} = createState()

const app = new Koa();

const router = new Router()
    .use(koaBody())

let emulatedPathPatterns: string[] = [];

router.get('/_config/emulated-paths', ctx => {
    ctx.body = emulatedPathPatterns
    ctx.status = 200
})

router.put('/_config/emulated-paths', ctx => {
    if (!ctx.is('application/json')) {
        ctx.status = 415
        return
    }

    emulatedPathPatterns = ctx.request.body
    ctx.status = 200
})

router.delete('/_config/emulated-paths', ctx => {
    emulatedPathPatterns = []
    ctx.status = 200
})

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

    const state = ctx.request.body;

    const orders = state['orders'];

    if (orders) {
        orders.forEach((orderState: any) => {
            orderState.deliveryDate = new Date();
            orderState.deliverySlot = {deliveryStart: '08:00:00', deliveryEnd: '18:59:59'};
        });
    }

    setState(state)

    ctx.status = 200
})

function getOrder(orderId: string, ordersState: [Order]) {
    return ordersState.find(order => order.id === orderId);
}

function getRecipes(recipeIds: string[], recipesState: [Recipe]) {
    return recipeIds.map(recipeId => recipesState.find(recipe => recipe.id === recipeId)!);
}

function renderOrderWithRecipes(order: Order, recipes: Recipe[]) {
    const orderDto = withSnakeCaseProperties(order);
    delete orderDto.recipe_ids;
    orderDto.recipe_items = recipes.map(recipe => ({recipe_id: recipe.id, recipe_uuid: recipe.uuid}));
    orderDto.delivery_date = order.deliveryDate.toISOString().replace(/T/, ' ').replace(/\..+/, '');

    return orderDto;
}

router.get('/order/:orderId', ctx => {
    const state = getState();

    if (!isAuthorizedRequest(ctx, state)) {
        ctx.status = 401
        return
    }

    if (!state.orders) {
        ctx.status = 404
        return
    }

    const order = getOrder(ctx.params.orderId, state.orders!);

    if (!order) {
        ctx.status = 404
        return
    }

    const recipes = getRecipes(order.recipeIds, state.recipes!);

    ctx.status = 200

    ctx.body = {
        status: 'ok',
        result: {
            data: renderOrderWithRecipes(order, recipes)
        }
    }
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

if (serverConfiguration.proxyHost) {
    app.use(proxy(serverConfiguration.proxyHost, {
        https: true,
        filter(ctx) {
            const isEmulatedPath = ctx.request.path.startsWith('/_config/') || emulatedPathPatterns.some(pathPattern => ctx.request.path.match(pathPattern));
            return !isEmulatedPath
        }
    }))
}

app.use(router.routes())
    .use(router.allowedMethods())


app.listen(3000);
