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

  async online (website) {
    const threshold = new Date(new Date() - 2 * 60000)
    const result = await this.collection.countDocuments({ website: website, online: { $gte: threshold } })
    return result
  }

  async get (website, timeframe) {
    // page visits
    // unique visitors
    // bounce rate
    // avg duration
    // pages
    // referrers
    // browser
    // os
    // device
    // language

    timeframe.start = ObjectID.createFromTime(new Date(timeframe.start) / 1000)
    timeframe.end = ObjectID.createFromTime(new Date(timeframe.end) / 1000)
    const data = await this.collection.find({ _id: { $gte: timeframe.start, $lte: timeframe.end }, website: website }).toArray()

    const analytics = {
      visits: 0,
      visitors: 0,
      duration: 0
    }
    if (data.length === 0) return analytics

    analytics.visits = data.length
    analytics.visitors = [...new Set(data.map(visit => visit.fingerprint))].length
    analytics.duration = data.filter(visit => visit.duration !== undefined).reduce((total, next) => total + next.duration, 0) / data.length

    return analytics
  }
}

module.exports = Analytics
