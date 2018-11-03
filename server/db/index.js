import mongoose from 'mongoose'

import logger from './../config/winston.config'
import { MONGO_URL } from './../config/env.config'
import seedUsers from './seeds/users.seed'

export default mongoose.connect(MONGO_URL, { useNewUrlParser: true }).then((_) => {
    logger.debug('Connection to database was successful')
    seedUsers()
  }).catch((_) => {
    logger.err('Cannot connect to database')
})
  