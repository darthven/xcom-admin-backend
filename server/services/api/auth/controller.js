import jwt from 'jsonwebtoken'
import passport from 'koa-passport'
import bcrypt from 'bcrypt'

import { JWT_SECRET } from '../../../config/env.config'
import User from '../../../db/models/user'

async function auth (ctx) {
  const { email, password } = ctx.request.body
  const user = await User.findOne({ email }) 
  if (user) {
    const passCheck = bcrypt.compareSync(password, user.password)
    if (passCheck) {
      console.log('Good')
      ctx.state.sign = true
      ctx.response.body = {
          token: jwt.sign({
            id: user.id,
            email: user.email
          }, JWT_SECRET)
      }
      ctx.status = 200
    } else {
      ctx.status = 400
      throw new Error('Error')
    }
  } else {
    ctx.status = 404
    throw new Error('Error')
  }
  
}

export default {
  auth
}
