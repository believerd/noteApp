const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('there are two notes', async () => {
  const res = await api.get('/api/notes')
  expect(res.body).toHaveLength(2)
})

test('the first note is about HTTP', async () => {
  const res = await api.get('/api/notes')
  expect(res.body[0].content).toBe('HTML is hard!')
})

afterAll(async () => {
  await mongoose.connection.close()
})