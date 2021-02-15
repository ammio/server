'use strict'

class Websites {
  constructor (database) {
    this.collection = database.collection('websites')
    return this
  }

  async add (domain) {
    if (await this.exists(domain)) throw new Error('website domain already in use')
    const website = await this.collection.insertOne({ domain: domain })
    return website.ops[0]
  }

  async all () {
    return await this.collection.find({}).toArray()
  }

  async exists (domain) {
    if (await this.collection.countDocuments({ domain: domain }) > 0) return true
    else return false
  }
}

module.exports = Websites
