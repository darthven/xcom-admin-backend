import Router from 'koa-router'
import AuthRoutes from './auth/routes'
import BannerRoutes from './banner/routes'

const router = new Router()

AuthRoutes.init(router)
BannerRoutes.init(router)


router.get('/api/', async (ctx) => {
  ctx.body = {
    status: 'available',
    message: 'api@xcom-2018',
  }
})

export default router
