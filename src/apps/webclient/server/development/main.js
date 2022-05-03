/* eslint-disable-next-line import/no-extraneous-dependencies */
import koaWebpack from 'koa-webpack'
import path from 'path'
import { validateProcessEnv } from 'utils/processEnv'
import { app } from '../main'
import logger from '../utils/logger'

function enableHmr(application) {
  koaWebpack({
    configPath: path.join(process.cwd(), './config/webpack.client.js'),
    devMiddleware: {
      compress: true,
      headers: {
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
        'Access-Control-Allow-Origin': '*',
      },
      historyApiFallback: true,
      hot: true,
      port: 8080,
      public: 'frontend.gousto.local',
      watchOptions: { aggregateTimeout: 300, poll: 1000 },
      writeToDisk: true,
    },
    hotClient: {
      host: 'frontend.gousto.local',
      server: application.server
    }
  }).then((middleware) => {
    application.use(middleware)
  })
}

enableHmr(app)
validateProcessEnv()

app.listen(8080, () => {
  logger.notice('==> ✅  Koa Server is listening on port 8080')
})
