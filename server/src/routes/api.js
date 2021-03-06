'use strict'

/* IMPORT MODULES */
const Router = require('@koa/router')

/* IMPORT ROUTERS */
const authenticationRouter = require('./authentication')
const analyticsRouter = require('./analytics')
const websitesRouter = require('./websites')

/* SETUP ROUTER */
const router = new Router()
router.prefix('/api')
router.use(authenticationRouter.routes())
router.use(authenticationRouter.allowedMethods())
router.use(analyticsRouter.routes())
router.use(analyticsRouter.allowedMethods())
router.use(websitesRouter.routes())
router.use(websitesRouter.allowedMethods())

module.exports = router
