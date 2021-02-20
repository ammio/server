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
      if (!database || typeof database !== 'object' || typeof database.collection !== 'function') throw new Error('database not accessible')
      this.collection = database.collection('admin')
      if (await this.collection.countDocuments() === 0) {
        const password = await bcrypt.hash(DEFAULT_ADMIN_PASSWORD, SALT_ROUNDS)
        await this.collection.insertOne({ username: 'admin', password: password })
      }
      return this
    })()
  }

  /**
    * Authenticate credentials
    * @param {String} username
    * @param {String} password
    * @returns {String} Signed JSON web token
  */
  async login (username, password) {
    if (!username || username.length === 0) throw new Error('invalid credentials')
    if (!password || password.length === 0) throw new Error('invalid credentials')
    const data = await this.collection.findOne({ username: username })
    if (!data) throw new Error('invalid credentials')
    if (!await bcrypt.compare(password, data.password)) throw new Error('invalid credentials')
    const token = jwt.sign({ _id: data._id, username: data.username }, JWT_SECRET, { expiresIn: 86400 })
    return token
  }

  /**
   * verify a JSON web token
   * @param {String} token JSON web token to verify
   * @returns {Boolean} a boolean representing the validity of the provided json web token
   */
  async verify (token) {
    if (!token || typeof token !== 'string' || token.length === 0) throw new Error('invalid token')
    try {
      jwt.verify(token, JWT_SECRET)
      return true
    } catch (error) {
      throw new Error('invalid token')
    }
  }
}

module.exports = Authentication
