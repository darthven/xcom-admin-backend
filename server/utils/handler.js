import logger from '../config/winston.config'

export default async (ctx, next) => {
    logger.info(`${ctx.method} ${ctx.url}`, {
      body: ctx.request.body,
      ip: ctx.ip
    })
    try {
      return await next()
    } catch (err) {
        logger.error(err.message)
        ctx.body = err.message
        ctx.status = err.statusCode
    }
}
