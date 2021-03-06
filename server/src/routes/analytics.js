'use strict'

/* IMPORT MODULES */
const Router = require('@koa/router')
const Analytics = require('../modules/analytics')

/* SETUP ROUTER */
const router = new Router()
router.prefix('/analytics')

/* ROUTES */
router.post('/', async ctx => {
  const analytics = new Analytics(ctx.database)
  const client = ctx.request.body
  ctx.body = await analytics.log(client)
})

router.post('/online', async ctx => {
  const analytics = new Analytics(ctx.database)
  const client = JSON.parse(ctx.request.body)
  const online = await analytics.log(client)
  ctx.body = JSON.stringify(online)
})

router.get('/online', async ctx => {
  const analytics = new Analytics(ctx.database)
  const website = ctx.request.query.website
  ctx.body = await analytics.online(website)
})

router.get('/get', async ctx => {
  const analytics = new Analytics(ctx.database)
  const website = ctx.request.query.website
  const timeframe = { start: ctx.request.query.start, end: ctx.request.query.end }
  ctx.body = await analytics.get(website, timeframe)
})
module.exports = router
