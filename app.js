const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const notesRouter = require('./controllers/notes')
const middleware = require('./utils/middleware')
const database = require('./utils/database')

if (!database.isConnected()) {
  database.connect()
}

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan('common'))
app.use('/api/notes', notesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app