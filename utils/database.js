const config = require('./config')
const logger = require('./logger')
const mongoose = require('mongoose')

const connect = async () => {
  const url = config.MONGODB_URI
  logger.info('connecting to', url)
  mongoose.set('strictQuery', false)
  mongoose.connect(url)
    .then(() => {
      logger.info('connected to MongoDB')
    })
    .catch(error => {
      logger.error('error connecting to MongoDB:', error.message)
    })
}

const isConnected = () => {
  return mongoose.connection.readyState === 1
    ? true
    : false
}

module.exports = {
  connect,
  isConnected
}