import winston from "winston";

class Logger {
  constructor() {
    this.logger = winston.createLogger({
      level: "info",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "soccer.log" })
      ]
    });
  }

  log(type, message) {
    this.logger.log(type, message);
  }
}

export default new Logger();
