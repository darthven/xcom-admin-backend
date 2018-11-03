import auth from './controller'

export default {
  init: function (router) {
    router.post('/api/auth', auth.auth)
  }
}
