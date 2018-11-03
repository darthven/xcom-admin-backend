import appRoot from 'app-root-path'
import winston from 'winston'
import { DRYRUN } from './env.config'

const options = {
  error: {
    name: 'error-file',
    level: 'error',
    filename: `${appRoot}/logs/error.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: true
  },
  info: {
    name: 'info-file',
    level: 'info',
    filename: `${appRoot}/logs/info.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: true
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  }
}

// IF DRYRUN ENABLED LOG CONFIGURATION IS EMPTY
const logger = DRYRUN ? new winston.createLogger({}) : winston.createLogger({
  transports: [
    new winston.transports.File(options.error),
    new winston.transports.File(options.info),
    new winston.transports.Console(options.console)
  ],
  exitOnError: false
})

export default logger
