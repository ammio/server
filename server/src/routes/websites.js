'use strict'

/* IMPORT MODULES */
const Router = require('@koa/router')
const Websites = require('../modules/websites')

/* SETUP ROUTER */
const router = new Router()
router.prefix('/websites')

/* ROUTES */
router.post('/', async ctx => {
  const request = ctx.request.body
  const admin = new Websites(ctx.database)
  const website = await admin.add(request.domain)
  ctx.body = website
})

router.get('/', async ctx => {
  const websites = new Websites(ctx.database)
  ctx.body = await websites.all()
})

module.exports = router
