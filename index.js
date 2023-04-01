const config = require('./utils/config')
const app = require('./app')
const mongoose = require('mongoose')
const logger = require('./utils/logger')

const connectDB = async () => {
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
connectDB().then(() => {
  app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
  })
})