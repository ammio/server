'use strict'

const ObjectID = require('mongodb').ObjectID

class Analytics {
  constructor (database) {
    this.collection = database.collection('analytics')
    return this
  }

  async log (client) {
    if (client._id) {
      const filter = { _id: ObjectID(client._id) }
      let update
      if (client.online === false) {
        update = { $set: { online: client.online, duration: client.duration } }
      } else {
        client.online = new Date()
        update = { $set: { online: client.online } }
      }
      const result = await this.collection.updateOne(filter, update)
      const log = result
      log.online = true
      return true
    }

    client.online = new Date()
    const result = await this.collection.insertOne(client)
    const log = result.ops[0]
    log.online = true
    return log
  }

  async online(website) {
    const threshold = new Date(new Date() - 2 * 60000)
    const result = await this.collection.countDocuments({ website: website, online: { $gte: threshold } })
    return result
  }

  async all () {
    return await this.collection.find().toArray()
  }
}

module.exports = Analytics
