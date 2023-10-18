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
    new winston.transports.File({
      filename: "utils/logs/error.log",
      level: "error",
    }),
    new winston.transports.File({ filename: "utils/logs/out.log" }),
  ],
});

if (!["production", "test"].includes(process.env.NODE_ENV)) {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

module.exports = logger;
