import auth from '../auth/controller'
import banner from './controller'

export default {
  init: function (router) {
    router.get('/api/banner/:id', auth.userGuard, banner.getBanner),
    router.get('/api/banner', auth.userGuard, banner.getBanners),
    router.post('/api/banner', auth.userGuard, banner.createBanner),
    router.put('/api/banner/:id', auth.userGuard, banner.updateBanner),
    router.delete('/api/banner/:id', auth.userGuard, banner.deleteBanner)
  }
}
