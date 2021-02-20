'use strict'

/* IMPORT MODULES */
const Router = require('@koa/router')
const Authentication = require('../modules/authentication')

/* SETUP ROUTER */
const router = new Router()
router.prefix('/authentication')

/* ROUTES */
router.post('/', async ctx => {
  const user = ctx.request.body
  try {
    const authentication = await new Authentication(ctx.database)
    const token = await authentication.login(user.username, user.password)
    ctx.status = 200
    ctx.body = { token: token }
  } catch (error) {
    if (error.message === 'invalid credentials') {
      ctx.status = 401
      ctx.body = { message: 'Login credentials can not be verified, please check your username and password and try again' }
    } else {
      ctx.status = 500
      ctx.body = { message: 'Internal server error' }
    }
  }
})

module.exports = router
