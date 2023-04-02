const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const Note = require('../models/note')
const app = require('../app')
const api = supertest(app)


beforeEach(async () => {
  await Note.deleteMany({})
  let noteObject = new Note(helper.initialNotes[0])
  await noteObject.save()
  noteObject = new Note(helper.initialNotes[1])
  await noteObject.save()
}, 10000)

test('the first note is about HTTP', async () => {
  const res = await api.get('/api/notes')
  expect(res.body[0].content).toBe('HTML is easy')
})

test('all notes are returned', async () => {
  const response = await api.get('/api/notes')

  expect(response.body).toHaveLength(helper.initialNotes.length)
})

test('a specific note is within the returned notes', async () => {
  const response = await api.get('/api/notes')

  const contents = response.body.map(r => r.content)
  expect(contents).toContainEqual(
    'Browser can execute only JavaScript'
  )
})

test('note without content is not added', async () => {
  const newNote = {
    important: true
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(400)

  const notesAtEnd = await helper.notesInDb()
  expect(notesAtEnd).toHaveLength(helper.initialNotes.length)
})

test('a valid note can be added', async () => {
  const newNote = {
    content: 'async/await simplifies making async calls',
    important: true,
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(201)
    .expect('Content-Type', /application\/json/)


  const noteAtEnd = await helper.notesInDb()

  expect(noteAtEnd).toHaveLength(helper.initialNotes.length + 1)
  const contents = noteAtEnd.map(note => note.content)
  expect(contents).toContain(
    'async/await simplifies making async calls'
  )
})

afterAll(async () => {
  await mongoose.connection.close()
})