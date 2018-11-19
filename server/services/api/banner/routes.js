import banner from './controller'
import auth from '../auth/controller'

export default {
  init: function (router) {
    router.get('/api/banner/public', banner.getPublicBanners),
    router.get('/api/banner/:id', auth.userGuard, banner.getBanner),
    router.get('/api/banner', auth.userGuard, banner.getBanners),
    router.post('/api/banner', auth.userGuard, banner.createBanner),
    router.post('/api/banner/:id/image', auth.userGuard, banner.uploadImage),
    router.put('/api/banner/:id', auth.userGuard, banner.updateBanner),
    router.delete('/api/banner/:id', auth.userGuard, banner.deleteBanner)
  }
}