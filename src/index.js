'use strict'

/* IMPORT MODULES */
const Koa = require('koa')
const MongoClient = require('mongodb').MongoClient
const http = require('http')

/* GLOBALS */
const PORT = process.env.PORT || 3000
const MONGO_URL = process.env.MONGO_URL || 'localhost'
const MONGO_PORT = process.env.MONGO_PORT || 27017

/* KOA SETUP */
const app = new Koa()
app.server = http.createServer(app.callback())

/* START SERVER */
;(async () => {
  const mongo = await MongoClient.connect(`mongodb://${MONGO_URL}:${MONGO_PORT}/`, { useUnifiedTopology: true })
  app.context.database = mongo.db('ammio')
  app.server.listen(3000,async () => console.log(`ammio started on port ${PORT}`))
})()
