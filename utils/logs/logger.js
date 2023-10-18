const winston = require("winston");

winston.exceptions.handle(
  new winston.transports.File({ filename: "utils/logs/uncaughtExceptions.log" })
);

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.json(),
    winston.format.timestamp()
  ),
  defaultMeta: {
    service: "kudobuzz-nodejs-interview",
    env: process.env.NODE_ENV,
  },
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});

module.exports = logger;
