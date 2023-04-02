const notesRouter = require('express').Router()
const Note = require('../models/note')


notesRouter.get('/', async (req, res) => {
  const notes = await Note.find({})
  res.send(notes)
})

notesRouter.post('/', async (req, res) => {
  const body = req.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  const savedNote = await note.save()
  res.status(201).send(savedNote)
})

notesRouter.get('/:id', async (req, res) => {
  const note = await Note.findById(req.params.id)
  if (note) {
    res.send(note)
  } else {
    res.status(404).end()
  }
})

notesRouter.delete('/:id', async (req, res) => {
  await Note.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

notesRouter.put('/:id', async (req, res) => {
  const { content, important } = req.body

  const note = await Note.findByIdAndUpdate(req.params.id, { content, important }, { new: true, runValidators: true, context: 'query' })
  res.send(note)
})

module.exports = notesRouter