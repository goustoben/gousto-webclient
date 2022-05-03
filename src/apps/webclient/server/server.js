import { validateProcessEnv } from 'utils/processEnv'
import logger from './utils/logger'
const { app } = require('./main')

validateProcessEnv()
app.listen(80, () => {
  logger.notice('==> ✅  Koa Server is listening on port 80')
})
