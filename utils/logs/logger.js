const winston = require("winston");

winston.exceptions.handle(
  new winston.transports.File({ filename: "utils/logs/uncaughtExceptions.log" })
);

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: {
    service: "kudobuzz-nodejs-interview",
    env: process.env.NODE_ENV,
  },
  transports: [
    new winston.transports.File({
      filename: "utils/logs/error.log",
      level: "error",
    }),
    new winston.transports.File({ filename: "utils/logs/out.log" }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

module.exports = logger;
