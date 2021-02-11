'use strict'

/* KOA MODULES */
const Koa = require('koa')
const sassy = require('koa-sassy')
const views = require('koa-views')

/* MODULES */
const http = require('http')
const path = require('path')

/* GLOBALS */
const PORT = process.env.PORT || 3000

/* KOA SETUP */
const app = new Koa()
app.server = http.createServer(app.callback())
app.use(sassy(path.join(__dirname, '/sass')))
app.use(views(path.join(__dirname, '/views'), { extension: 'pug' }))

/* START SERVER */
app.server.listen(PORT, () => {
  console.log(`ammio started on port ${PORT}`)
})
