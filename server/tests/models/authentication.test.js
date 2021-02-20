/* eslint-env jest */

'use strict'

/* SET SECRET */
process.env.JWT_SECRET = 'test'
const JWT_SECRET = process.env.JWT_SECRET

/* IMPORT TEST */
const Authentication = require('../../src/modules/authentication')

/* IMPORT MODULES */
const MongoClient = require('mongodb').MongoClient
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer
const jwt = require('jsonwebtoken')

/* BEFORE EACH TEST */
beforeEach(async () => {
  jest.resetModules() // TODO check is this is needed
  this.mongodb = new MongoMemoryServer()
  const uri = await this.mongodb.getUri()
  this.client = await MongoClient.connect(uri, { useUnifiedTopology: true })
  this.db = this.client.db('ammio')
})

/* AFTER EACH TEST */
afterEach(async () => {
  // await this.client.close()
  await this.mongodb.stop()
})

/* CONSTRUCTOR TESTS */
describe('constructor', () => {
  test('should throw database not accessible error when database is undefined', async () => {
    expect(new Authentication()).rejects.toStrictEqual(new Error('database not accessible'))
  })

  test('should throw database not accessible error when database is is not typeof mongodb database object', async () => {
    expect(new Authentication('')).rejects.toStrictEqual(new Error('database not accessible'))
    expect(new Authentication(4)).rejects.toStrictEqual(new Error('database not accessible'))
    expect(new Authentication({})).rejects.toStrictEqual(new Error('database not accessible'))
  })
})

/* LOGIN TESTS */
describe('login', () => {
  test('should throw invalid credentials error when username is undefined', async () => {
    const authentication = await new Authentication(this.db)
    expect(authentication.login(undefined, 'ammio')).rejects.toStrictEqual(new Error('invalid credentials'))
  })

  test('should throw invalid credentials error when username is empty', async () => {
    const authentication = await new Authentication(this.db)
    expect(authentication.login('', 'ammio')).rejects.toStrictEqual(new Error('invalid credentials'))
  })

  test('should throw invalid credentials error when password is undefined', async () => {
    const authentication = await new Authentication(this.db)
    expect(authentication.login('admin', undefined)).rejects.toStrictEqual(new Error('invalid credentials'))
  })

  test('should throw invalid credentials error when password is empty', async () => {
    const authentication = await new Authentication(this.db)
    expect(authentication.login('admin', '')).rejects.toStrictEqual(new Error('invalid credentials'))
  })

  test('should throw invalid credentials error when username is register', async () => {
    const authentication = await new Authentication(this.db)
    expect(authentication.login('unregister', 'password')).rejects.toStrictEqual(new Error('invalid credentials'))
  })

  test('should throw invalid credentials error when password is invalid', async () => {
    const authentication = await new Authentication(this.db)
    expect(authentication.login('admin', 'password')).rejects.toStrictEqual(new Error('invalid credentials'))
  })
})

/* DEFAULT ADMIN CREDENTIALS TESTS */
describe('default admin credentials', () => {
  test('should return json web token for default admin login credentials', async () => {
    const authentication = await new Authentication(this.db)
    const token = await authentication.login('admin', 'ammio')
    const verified = jwt.verify(token, JWT_SECRET)
    expect(typeof verified).toEqual('object')
    expect(verified.username).toEqual('admin')
  })
})

/* VERIFY TESTS */
describe('verify', () => {
  test('should throw invalid token error when token is undefined', async () => {
    const authentication = await new Authentication(this.db)
    expect(authentication.verify()).rejects.toStrictEqual(new Error('invalid token'))
  })

  test('should throw invalid token error when token is not of type string', async () => {
    const authentication = await new Authentication(this.db)
    expect(authentication.verify({})).rejects.toStrictEqual(new Error('invalid token'))
  })

  test('should throw invalid token error when token is empty', async () => {
    const authentication = await new Authentication(this.db)
    expect(authentication.verify('')).rejects.toStrictEqual(new Error('invalid token'))
  })

  test('should throw invalid token error when token is invalid', async () => {
    const authentication = await new Authentication(this.db)
    expect(authentication.verify('invalid')).rejects.toStrictEqual(new Error('invalid token'))
  })

  test('should throw invalid token error when token is empty', async () => {
    const authentication = await new Authentication(this.db)
    const token = await authentication.login('admin', 'ammio')
    expect(authentication.verify(token)).resolves.toEqual(true)
  })
})
