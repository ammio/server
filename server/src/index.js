'use strict'

/* IMPORT MODULES */
const Koa = require('koa')
const cors = require('@koa/cors')
const MongoClient = require('mongodb').MongoClient

/* IMPORT ROUTERS */
const apiRouter = require('./routes/api')

/* GLOBALS */
const PORT = process.env.PORT || 3000
const MONGO_URL = process.env.MONGO_URL || 'localhost'
const MONGO_PORT = process.env.MONGO_PORT || 27017

/* KOA SETUP */
const app = new Koa()
app.use(cors())

/* SETUP ROUTERS */
app.use(apiRouter.routes())
app.use(apiRouter.allowedMethods())

/* START SERVER */
;(async () => {
  const mongo = await MongoClient.connect(`mongodb://${MONGO_URL}:${MONGO_PORT}/`, { useUnifiedTopology: true })
  app.context.database = mongo.db('ammio')
  app.listen(3000, async () => console.log(`ammio started on port ${PORT}`))
})()
