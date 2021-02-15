'use strict'

class Websites {
  constructor (database) {
    this.collection = database.collection('websites')
    return this
  }

  async add (domain) {
    //if (!/^(?!:\/\/)([a-zA-Z0-9-]+\.){0,5}[a-zA-Z0-9-][a-zA-Z0-9-]+\.[a-zA-Z]{2,64}?$/gi.test(domain)) throw new Error('website domain is not recognized as valid')
    if (await this.exists(domain)) throw new Error('website domain already in use')
    const website = await this.collection.insertOne({ domain: domain })
    return website.insertedId
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
