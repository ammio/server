'use strict'

/* KOA MODULES */
const Koa = require('koa')

/* MODULES */
const http = require('http')

/* GLOBALS */
const PORT = process.env.PORT || 3000

/* KOA SETUP */
const app = new Koa()
app.server = http.createServer(app.callback())

/* START SERVER */
app.server.listen(PORT, () => {
  console.log(`ammio started on port ${PORT}`)
})
