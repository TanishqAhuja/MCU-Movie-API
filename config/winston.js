/* eslint-disable no-unused-vars */
const { createLogger, format, transports } = require('winston');

const options = {
  file: {
    filename: `${__dirname}/../logs/app.log`,
    // handleExceptions: true,
    maxsize: 5242880,
    maxFiles: 5,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

const logger = createLogger({
  transports: [
    new transports.File(options.file),
    new transports.Console(options.console),
  ],
  format: format.combine(
    format.simple(),
    format.timestamp(),
    format.printf((info) => `[${info.timestamp}] => ${info.message}`),
  ),
  exitOnError: false,
});

logger.stream = {
  write(message, encoding) {
    logger.info(message);
  },
};

module.exports = logger;
