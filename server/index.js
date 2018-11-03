import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'

import router from './services/api/routes'
import { PORT, NODE_ENV } from './config/env.config'
import database from './db'
import logger from './config/winston.config'
import handler from './utils/handler'

const app = new Koa()
app
  .use(bodyParser({ jsonLimit: '10mb' }))
  .use(cors())
  .use(handler)
  .use(router.routes())

export default app.listen(PORT, async () => {
  logger.debug(`HTTP Server listening on port: ${PORT}`)
  logger.debug(`Environment: ${NODE_ENV}`)
  await database
})  

