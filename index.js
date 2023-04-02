const config = require('./utils/config')
const app = require('./app')
const logger = require('./utils/logger')
const database = require('./utils/database')


database.connect().then(() => {
  app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
  })
})