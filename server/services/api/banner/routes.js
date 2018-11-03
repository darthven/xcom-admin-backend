import banner from './controller'

export default {
  init: function (router) {
    router.get('/api/banner/:id', banner.getBanner),
    router.get('/api/banner/public', banner.getPublicBanners),
    router.get('/api/banner', banner.getBanners),
    router.post('/api/banner', banner.createBanner),
    router.put('/api/banner/:id', banner.updateBanner),
    router.delete('/api/banner/:id', banner.deleteBanner)
  }
}
