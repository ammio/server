'use strict'

/* IMPORT MODULES */
const Router = require('@koa/router')
const Authentication = require('../modules/authentication')

/* SETUP ROUTER */
const router = new Router()
router.prefix('/authentication')

/* ROUTES */
router.post('/', async ctx => {
  const client = ctx.request.body
  const admin = await new Authentication(ctx.database)
  const login = await admin.login(client)
  ctx.body = login
})

module.exports = router
