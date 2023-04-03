const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const notesRouter = require('./controllers/notes')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const database = require('./utils/database')

if (!database.isConnected()) {
  database.connect()
}

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
if (!process.env.NODE_ENV === 'test') {
  app.use(morgan('common'))
}
app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app