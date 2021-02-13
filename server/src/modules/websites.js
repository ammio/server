'use strict'

/* IMPORT MODULES */
const ObjectID = require('mongodb').ObjectID

class Websites {
  constructor (database) {
    if (!database || typeof database.collection !== 'function') throw new Error('database should be mongodb database object')
    this.collection = database.collection('websites')
    return this
  }

  async add (name, domain) {
    if (!name) throw new Error('website name required')
    if (typeof name !== 'string') throw new Error('website name should be of type string')
    if (!domain) throw new Error('website domain required')
    if (typeof domain !== 'string') throw new Error('website domain should be of type string')
    if (!/^(?!:\/\/)([a-zA-Z0-9-]+\.){0,5}[a-zA-Z0-9-][a-zA-Z0-9-]+\.[a-zA-Z]{2,64}?$/gi.test(domain)) throw new Error('website domain is not recognized as valid')
    if (await this.exists(domain)) throw new Error('website domain already in use')
    const website = await this.collection.insertOne({ name: name, domain: domain })
    return website.insertedId.toHexString()
  }

  async remove (id) {
    if (!id) throw new Error('website id required')
    if (typeof id !== 'string') throw new Error('website id must be of type string')
    await this.collection.deleteOne({ _id: ObjectID(id) })
  }

  async all () {
    return await this.collection.find({}).toArray()
  }

  async exists (domain) {
    if (!domain) throw new Error('website domain is required')
    if (typeof domain !== 'string') throw new Error('website domain must be of type string')
    if (await this.collection.countDocuments({ domain: domain }) > 0) return true
    else return false
  }
}

module.exports = Websites
