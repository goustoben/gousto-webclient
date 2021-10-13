import Router from '@koa/router';
import Koa from 'koa';
import bodyParser from 'koa-body';
import logger from 'koa-logger';

const app = new Koa();

const router = new Router();
router.delete('/user/the-user-id/marketing/the-marketing-type', (ctx) => {
    console.log(ctx.request.body)
    ctx.body = { status: 'ok' }
});

app.use(logger())
    .use(bodyParser({
        parsedMethods: ['POST', 'PUT', 'PATCH', 'GET', 'HEAD', 'DELETE'],
    }))
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000);
