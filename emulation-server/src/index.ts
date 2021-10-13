import Router from '@koa/router';
import Koa from 'koa';
import logger from 'koa-logger';

const app = new Koa();

const router = new Router();
router.delete('/user/the-user-id/marketing/the-marketing-type', (ctx) => ctx.body = { status: 'ok' });

app.use(logger())
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000);
