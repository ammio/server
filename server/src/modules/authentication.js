'use strict'

/* IMPORT MODULES */
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

/* MODULE VARIABLES */
const SALT_ROUNDS = 10
const DEFAULT_ADMIN_PASSWORD = process.env.DEFAULT_PASSWORD || 'ammio'
const JWT_SECRET = process.env.JWT_SECRET || 'secret'

class Authentication {
  constructor (database) {
    return (async () => {
      this.collection = database.collection('admin')
      if (await this.collection.countDocuments() === 0) {
        const password = await bcrypt.hash(DEFAULT_ADMIN_PASSWORD, SALT_ROUNDS)
        await this.collection.insertOne({ username: 'admin', password: password })
      }
      return this
    })()
  }

  async login (client) {
    if (!client.username || client.username.length === 0) return { authentication: false, token: null }
    if (!client.password || client.password.length === 0) return { authentication: false, token: null }
    const data = await this.collection.findOne({ username: client.username })
    if (data.length === 0) return { authentication: false, token: null }
    console.log(data)
    if (!await bcrypt.compare(client.password, data.password)) return { authentication: false, token: null }
    const token = jwt.sign({ _id: data._id, username: data.username }, JWT_SECRET, { expiresIn: 86400 })
    return { authentication: true, token: token }
  }
}

module.exports = Authentication
