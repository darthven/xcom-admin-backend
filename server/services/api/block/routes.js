import block from './controller'
import auth from '../auth/controller'

export default {
  init: function (router) {
    router.get('/api/block', block.getBlocks),
    router.get('/api/block/:id', auth.userGuard, block.getBlock),
    router.post('/api/block', auth.userGuard, block.createBlock),
    router.put('/api/block/:id', auth.userGuard, block.updateBlock),
    router.delete('/api/block/:id', auth.userGuard, block.deleteBlock)
  }
}
