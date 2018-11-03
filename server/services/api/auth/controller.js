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

async function jwtSign (ctx) {
  const user = ctx.state.user
  if (!ctx.state.sign) {
    throw new Exception(401, 'Unauthorized')
  }
  const userToken = jwt.sign({
    id: user.id,
    email: user.email
  }, JWT_SECRET)
  ctx.status = 200
  ctx.body = {
    status: 'success',
    token: userToken,
    user: user
  }
}

async function userGuard (ctx, next) {
    await passport.authenticate('jwt', function (err, user) {
      if (!user) {
        ctx.status = 401
      }
      ctx.state.user = user
    })(ctx)
    if (ctx.status !== 401) {
      ctx.state.sign = true
      return next()
    } else {
      throw new Exception(401, 'Unauthorized')
    }
}

export default {
  auth,
  jwtSign,
  userGuard
}
