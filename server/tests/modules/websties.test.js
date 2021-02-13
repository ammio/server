/* eslint-env jest */
'use strict'

/* IMPORT TEST */
const Websites = require('../../src/modules/websites')

/* IMPORT MODULES */
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer

beforeEach(async () => {
  jest.resetModules()
  this.mongoMemoryServer = new MongoMemoryServer()
  const uri = await this.mongoMemoryServer.getUri()
  this.client = await MongoClient.connect(uri, { useUnifiedTopology: true })
  this.database = this.client.db('ammio')
})

afterEach(async () => {
  await this.client.close()
  await this.mongoMemoryServer.stop()
})

describe('constructor', () => {
  test('should throw error when database is null', () => {
    expect(() => new Websites()).toThrow(new Error('database should be mongodb database object'))
  })

  test('should throw error when database object is not type of mongodb database', () => {
    expect(() => new Websites({})).toThrow(new Error('database should be mongodb database object'))
  })

  test('should not throw error when mongo database object is passed as an argument', () => {
    expect(() => new Websites(this.database)).not.toThrow()
  })

  test('should return type object', () => {
    const websites = new Websites(this.database)
    expect(typeof websites).toBe('object')
  })
})

describe('add()', () => {
  beforeEach(() => {
    this.websites = new Websites(this.database)
  })

  test('should throw error when website name is undefined', async () => {
    expect(this.websites.add(undefined, 'test.com')).rejects.toThrow(new Error('website name required'))
  })

  test('should throw error when website name is not of type string', async () => {
    expect(this.websites.add({}, 'test.com')).rejects.toThrow(new Error('website name should be of type string'))
  })

  test('should throw error when website domain is undefined', async () => {
    expect(this.websites.add('test', undefined)).rejects.toThrow(new Error('website domain required'))
  })

  test('should throw error when website domain is not of type string', async () => {
    expect(this.websites.add('test', {})).rejects.toThrow(new Error('website domain should be of type string'))
  })

  test('should throw error when website domain is not a valid', async () => {
    expect(this.websites.add('test', 'invalid#com')).rejects.toThrow(new Error('website domain is not recognized as valid'))
  })

  test('should insert new website into database and return website id', async () => {
    const websiteId = await this.websites.add('test', 'test.com')
    expect(typeof websiteId).toBe('string')
    expect(websiteId.length).toBe(24)
  })
})

describe('remove()', () => {
  beforeEach(() => {
    this.websites = new Websites(this.database)
  })

  test('should throw error when website id is undefined', async () => {
    expect(this.websites.remove()).rejects.toEqual(new Error('website id required'))
  })

  test('should throw error when website id is not of type string', async () => {
    expect(this.websites.remove({})).rejects.toEqual(new Error('website id must be of type string'))
  })

  test('should remove website', async () => {
    let websites = await this.websites.all()
    expect(websites).toEqual([])
    const website1Id = await this.websites.add('foo', 'foo.com')
    const website2Id = await this.websites.add('boo', 'boo.com')
    await this.websites.remove(website1Id)
    websites = await this.websites.all()
    expect(websites).toEqual([{ _id: ObjectID(website2Id), name: 'boo', domain: 'boo.com' }])
    await this.websites.remove(website2Id)
    websites = await this.websites.all()
    expect(websites).toEqual([])
  })
})

describe('all()', () => {
  beforeEach(() => {
    this.websites = new Websites(this.database)
  })

  test('should return empty array when no websites have been added', async () => {
    const websites = await this.websites.all()
    expect(websites).toEqual([])
  })

  test('should return array of websites', async () => {
    const testWebsiteId = await this.websites.add('test', 'test.com')
    const booWebsiteId = await this.websites.add('boo', 'boo.co.uk')
    const fooWebsiteId = await this.websites.add('foo', 'foo.org')
    const websites = await this.websites.all()
    expect(websites).toEqual([
      { _id: ObjectID(testWebsiteId), name: 'test', domain: 'test.com' },
      { _id: ObjectID(booWebsiteId), name: 'boo', domain: 'boo.co.uk' },
      { _id: ObjectID(fooWebsiteId), name: 'foo', domain: 'foo.org' }
    ])
  })

  describe('exists()', () => {
    beforeEach(async () => {
      this.websites = new Websites(this.database)
      await this.websites.add('test', 'test.com')
    })

    test('should throw error when website domain is undefined', async () => {
      expect(this.websites.exists()).rejects.toThrow(new Error('website domain is required'))
    })

    test('should throw error when website domain is not of type string', async () => {
      expect(this.websites.exists({})).rejects.toThrow(new Error('website domain must be of type string'))
    })
  })
})
